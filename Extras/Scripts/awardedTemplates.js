class AwardedTemplates {
  obsidianState() {
    const { obsidian, app } = self.customJS || {};

    return self.customJS;
  }

  helloWorld(tp) {
    const { obsidian, app } = this.obsidianState();

    let title = tp.file.title;

    console.log("helloWorld", `awardedTemplates: ${title}`);
  }

  async adjustNote(tp, noteType) {
    const { obsidian, app } = this.obsidianState();

    // for new files, create a title
    // for existing files, use existing title
    const title = await this.createNoteTitle(tp, noteType);

    this.logMessage("adjustNote", { title });

    const directory = this.getNoteTypeDirectory(noteType);

    await this.renameFileAppendDate(tp, title, directory);

    await tp.file.cursor(0);

    return title;
  }

  async createNoteTitle(tp, noteType) {
    // When Standup -> {YYYY-MM-DD} standup
    // When Person -> {topic}
    // When TimeStamped -> {YYYY-MM-DD} {topic}
    const today = tp.date.now("YYYY-MM-DD");

    if (noteType === "standup") return `${today} ${noteType}`;

    const topic = await this.promptForTopic(tp, noteType);

    if (noteType === "person") return topic;

    return `${today} ${topic}`;
  }

  async promptForTopic(tp, noteType) {
    const { obsidian, app } = this.obsidianState();

    const newNoteTitle = "Untitled";

    const title = tp.file.title;

    this.logMessage("promptForTopic", { title });

    if (title.startsWith(newNoteTitle)) {
      const promptMessage = this.getNoteTypePrompt(noteType);

      // const topic = await tp.system.prompt(promptMessage);
      // const topic = tp.system.suggester(
      //   ["Happy", "Sad", "Confused"],
      //   ["Happy", "Sad", "Confused"],
      // );
      const personFiles = await app.vault.getMarkdownFiles().filter((file) => {
        const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
        return frontmatter && frontmatter.type === "person";
      });

      const personNames = personFiles.map((file) => file.basename);
      this.logMessage("promptForTopic", { personNames });
      // const topic = await tp.system.suggester(personNames, personNames);

      const throwOnCancel = false;
      const limit = 10;
      const topic = await tp.system.suggester(
        personNames,
        personNames,
        throwOnCancel,
        promptMessage,
        limit,
      );

      this.logMessage("promptForTopic", { topic });

      if (topic) return topic;

      this.logMessage(
        "promptForTopic",
        `Topic skipped, will delete ${tp.file.path(true)}`,
      );
      // await this.deleteThisFile(tp);

      return null;
    }

    return title;
  }

  getNoteTypeDirectory(noteType) {
    switch (noteType) {
      case "meeting":
        return "/Timestamps/Meetings/";
      case "person":
        return "/Extras/People/";
      case "person-note":
        return "/Timestamps/People/";
      case "standup":
        return "/Timestamps/Meetings/";
      default:
        return "/Inbox/";
    }
  }

  async renameFileAppendDate(tp, title, directory) {
    const { obsidian, app } = this.obsidianState();

    // const title = tp.file.title;
    // const file = tp.file.find_tfile(tp.file.path(true));

    const isFileAlreadyPrefixed = title.match(/^\d{4}-\d{2}-\d{2}/);
    const today = tp.date.now("YYYY-MM-DD");
    const newTitle = title.replace(/^\d{4}-\d{2}-\d{2} /, `${today} `);

    const finalTitle = isFileAlreadyPrefixed ? title : newTitle;

    const targetFilePath = `${directory}${finalTitle}`;

    const existingFile = await tp.file.find_tfile(targetFilePath);
    // const fileExists = await tp.file.exists(fullPath);
    if (existingFile) {
      // await this.deleteThisFile(tp);

      // const pathTFile = app.vault.getAbstractFileByPath(targetFilePath);
      // app.workspace.getLeaf("tab").openFile(pathTFile);

      this.logMessage(
        "renameFileAppendDate",
        `Note already exists:\n ${targetFilePath}`,
      );

      // throw new Error();
      return; // Skip the move
    }

    this.logMessage(
      "renameFileAppendDate",
      `Note moved to:\n ${targetFilePath}`,
    );
    await tp.file.move(targetFilePath);
    // await tp.file.rename(targetFilePath);
  }

  async deleteThisFile(tp) {
    const filePath = tp.file.path(true);

    const fileToDelete = tp.app.vault.getAbstractFileByPath(filePath);

    if (fileToDelete) {
      // TODO: figure out why this throws an error in the console
      // when calling this.app then the file is deleted but an error is thrown
      // when calling tp.app then the file is NOT deleted and no error is thrown
      // await this.app.vault.delete(fileToDelete);
      // await tp.app.vault.delete(fileToDelete);

      try {
        await app.vault.trash(fileToDelete, true);
        this.logMessage(
          "deleteThisFile",
          `Deleted existing file at:\n ${filePath}`,
        );
      } catch (e) {
        this.errorMessage(
          "deleteThisFile",
          `Failed to delete existing file at:\n ${filePath}`,
        );
      }
    } else {
      console.error(`File to delete not found: ${filePath}`);
    }
  }

  getNoteTypePrompt(noteType) {
    switch (noteType) {
      case "meeting":
        return "Meeting Topic:";
      case "person":
      case "person-note":
        return "Persons Name:";
      default:
        return "Generic Topic:";
    }
  }

  logMessage(topic, message, ...rest) {
    const { obsidian, app } = this.obsidianState();

    // TODO: toggle on/off for debugging purposes
    console.log(topic, message, ...rest);
  }

  errorMessage(topic, message, ...rest) {
    const { obsidian, app } = this.obsidianState();

    // TODO: toggle on/off for debugging purposes
    console.log(topic, message, ...rest);
  }
}
