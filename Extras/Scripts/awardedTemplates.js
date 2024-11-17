class AwardedTemplates {
  obsidianState() {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

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
    const newNoteTitle = await this.createNoteTitle(tp, noteType);

    const directory = this.getNoteTypeDirectory(noteType);

    await this.renameFileAppendDate(tp, newNoteTitle, directory);

    this.logMessage("adjustNote", "Done!");
    await tp.file.cursor(0);

    return newNoteTitle;
  }

  async createNoteTitle(tp, noteType) {
    // When Standup -> {YYYY-MM-DD} standup
    // When Person -> {topic}
    // When TimeStamped -> {YYYY-MM-DD} {topic}
    const today = tp.date.now("YYYY-MM-DD");

    if (noteType === "standup") return `${today} ${noteType}`;

    const topic = await this.promptForTopic(tp, noteType);

    // cancel note creation when topic is not provided
    if (!topic) throw new Error("Topic not provided.");

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

      return topic;
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

  async renameFileAppendDate(tp, newNoteTitle, directory) {
    const { obsidian, app } = this.obsidianState();

    const today = tp.date.now("YYYY-MM-DD");
    const newTitle = newNoteTitle.replace(/^\d{4}-\d{2}-\d{2} /, `${today} `);

    const isFileAlreadyPrefixed = newNoteTitle.match(/^\d{4}-\d{2}-\d{2}/);
    const finalTitle = isFileAlreadyPrefixed ? newNoteTitle : newTitle;

    const targetFilePath = `${directory}${finalTitle}.md`;

    const existingFile = await tp.file.find_tfile(targetFilePath);
    if (existingFile) {
      await app.workspace.getLeaf("tab").openFile(existingFile);

      this.logMessage(`Note already exists:\n ${targetFilePath}`);

      throw new Error("Note already exists");
    }

    await tp.file.move(targetFilePath);
    this.logMessage(`Note moved to:\n ${targetFilePath}`);
  }

  async deleteThisFile(tp) {
    const { obsidian, app } = this.obsidianState();

    const filePath = tp.file.path(true);

    const fileToDelete = tp.app.vault.getAbstractFileByPath(filePath);

    if (!fileToDelete) {
      console.error(`File to delete not found: ${filePath}`);
      return;
    }

    // TODO: figure out why this throws an error in the console
    // TODO: Also, delete has now stopped working 🤦
    // when calling this.app then the file is deleted but an error is thrown
    // when calling tp.app then the file is NOT deleted and no error is thrown
    // await this.app.vault.delete(fileToDelete);
    // await tp.app.vault.delete(fileToDelete);
    await app.vault.delete(fileToDelete, true);
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

  logMessage(...rest) {
    const { obsidian, app } = this.obsidianState();

    // TODO: toggle on/off for debugging purposes
    console.log(...rest);
  }
}
