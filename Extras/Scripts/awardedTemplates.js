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

      const topic = await tp.system.prompt(promptMessage);

      if (topic) return topic;

      console.log(
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
    // const title = tp.file.title;
    const file = tp.file.find_tfile(tp.file.path(true));

    const isFileAlreadyPrefixed = title.match(/^\d{4}-\d{2}-\d{2}/);
    const today = tp.date.now("YYYY-MM-DD");
    const newTitle = title.replace(/^\d{4}-\d{2}-\d{2} /, `${today} `);

    const finalTitle = isFileAlreadyPrefixed ? title : newTitle;

    const targetFilePath = `${directory}${finalTitle}`;

    const existingFile = await tp.file.find_tfile(targetFilePath);
    if (existingFile) {
      const message = `File already exists, named correctly and located at:\n ${targetFilePath}`;

      this.logMessage("renameFileAppendDate", message);

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
      this.logMessage(
        "deleteThisFile",
        `Existing file at ${filePath} has been deleted.`,
      );
      // TODO: figure out why this throws an error in the console
      // when calling this.app then the file is deleted but an error is thrown
      // when calling tp.app then the file is NOT deleted and no error is thrown
      await this.app.vault.delete(fileToDelete);
      // await tp.app.vault.delete(fileToDelete);
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
}
