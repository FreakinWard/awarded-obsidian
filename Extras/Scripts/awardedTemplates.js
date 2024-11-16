class AwardedTemplates {
  obsidianState() {
    const { obsidian, app } = self.customJS || {};

    return self.customJS;
  }

  helloWorld(tp) {
    const { obsidian, app } = this.obsidianState();

    let title = tp.file.title;

    console.log(`awardedTemplates: ${title}`);
  }

  async renameFileAppendDate(tp, title, directory) {
    // const title = tp.file.title;
    const file = tp.file.find_tfile(tp.file.path(true));

    const isFileAlreadyPrefixed = title.match(/^\d{4}-\d{2}-\d{2}/);
    const today = tp.date.now("YYYY-MM-DD");
    const newTitle = `${today} ${title}`;

    const finalTitle = isFileAlreadyPrefixed ? title : newTitle;

    const targetFilePath = `${directory}${finalTitle}`;

    const existingFile = await tp.file.find_tfile(targetFilePath);
    if (existingFile) {
      const message = `File already exists, named correctly and located at:\n ${targetFilePath}`;

      console.log(message);

      return; // Skip the move
    }

    console.log(`Note moved to:\n ${targetFilePath}`);
    await tp.file.move(targetFilePath);
    // await tp.file.rename(targetFilePath);
  }

  async deleteThisFile(tp) {
    const filePath = tp.file.path(true);

    const fileToDelete = tp.app.vault.getAbstractFileByPath(filePath);

    if (fileToDelete) {
      console.log(`Existing file at ${targetFilePath} has been deleted.`);
      // TODO: figure out why this throws an error in the console
      // when calling this.app then the file is deleted but an error is thrown
      // when calling tp.app then the file is NOT deleted and no error is thrown
      await this.app.vault.delete(fileToDelete);
      // await tp.app.vault.delete(fileToDelete);
    } else {
      console.error(`File to delete not found: ${filePath}`);
    }
  }

  async promptForTopic(tp, noteType) {
    const { obsidian, app } = this.obsidianState();

    const defaultTitle = "Untitled";

    const title = tp.file.title;
    const file = tp.file.find_tfile(tp.file.path(true));

    if (title.startsWith(defaultTitle)) {
      const promptMessage = this.getNoteTypePrompt(noteType);

      const topic = await tp.system.prompt(promptMessage);

      if (topic) return topic;

      console.log(`Topic skipped, will delete ${tp.file.path(true)}`, {});
      // await this.deleteThisFile(tp);

      return null;
    }

    return title;
  }

  async simplePromptForTopic(tp, noteType) {
    // const directory = "/Timestamps/Meetings/";
    const directory = this.getNoteTypeDirectory(noteType);
    const defaultTitle = "Untitled";

    let title = tp.file.title;

    // when the file name is undefined, prompt for the topic
    if (title.startsWith(defaultTitle)) {
      const topic = await tp.system.prompt("Meeting Topic:");

      // when the prompt is empty or skipped then delete the newly created file
      if(!topic) {
        await this.app.vault.delete(defaultTitle);
        return;
      }

      title = topic;
    }

    return title;
  }

  getNoteTypeDirectory(noteType) {
    switch (noteType) {
      case "meeting":
        return "/Timestamps/Meetings/";
      case "person":
        return "/Extras/People/";
      case "1-on-1":
        return "/Timestamps/People/";
      case "standup":
        return "/Timestamps/Meetings/";
      default:
        return "/Inbox/";
    }
  }

  getNoteTypePrompt(noteType) {
    switch (noteType) {
      case "meeting":
        return "Meeting Topic:";
      case "person":
        return "Persons Name:";
      case "1-on-1":
        return "Persons Name:";
      default:
        return null;
    }
  }

  async adjustNote(tp, noteType) {
    const { obsidian, app } = this.obsidianState();

    const skipPromptsForTypes = ["standup"];
    const skipPrompt = skipPromptsForTypes.includes(noteType);

    const title = await this.simplePromptForTopic(tp, noteType);

    const directory = this.getNoteTypeDirectory(noteType);

    await this.renameFileAppendDate(tp, title, directory);

    await tp.file.cursor(0);

    return title;
  }
}
