class AwardedTables {
  helloWorld(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    dv.span(
      "You read the page: " + dv.fileLink(dv.current().file.path, false, "Guide for Obsidian"),
    ) + ".";
  }

  createCardRow(page) {
    return (
      page.file.link +
      "<span style='color: gray; font-size: 13px; margin-left: 2px; float: right'>" +
      page.file.mtime.toRelative() +
      "</span>"
    );
  }

  createCardRowWithSummary(page) {
    const summary = page.summary ? page.summary : "`-`";

    return [page.file.link, summary, page.file.mtime.toRelative()];
  }

  recentNotes(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const excludedTypes = ["moc", "meeting", "person"];

    dv.table(
      [], // column name
      dv
        .pages()
        .where((page) => !page.file.path.startsWith("Extras/Templates"))
        .where((page) => !excludedTypes.includes(page.type))
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .limit(10)
        .map((page) => [this.createCardRow(page)]),
    );
  }

  recentMeetings(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0); // Set to the start of yesterday

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today

    dv.table(
      [], // column name
      dv
        .pages()
        .where((page) => page.type === "meeting")
        .where((page) => page.file.mtime >= yesterday && page.file.mtime < today)
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .limit(10)
        .map((page) => [this.createCardRow(page)]),
    );
  }

  todaysInbox(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    dv.table(
      [], // column name
      dv
        .pages()
        .where((p) => p.file.folder === "Inbox")
        .limit(10)
        .map((page) => [this.createCardRow(page)]),
    );
  }

  noteMentions(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const currentFilePath = dv.current().file.link.path;

    dv.table(
      ["File", "Summary", ""],
      dv
        .pages(`[[${currentFilePath}]]`)
        .where((page) => page.type !== "person")
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .map((page) => this.createCardRowWithSummary(page)),
    );
  }

  person1on1(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const currentFilePath = dv.current().file.link.path;

    dv.table(
      ["File", "Summary", ""],
      dv
        .pages(`[[${currentFilePath}]]`)
        .where((page) => page.type === "person-note")
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .limit(10)
        .map((page) => this.createCardRowWithSummary(page)),
    );
  }

  personMeetings(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const currentFilePath = dv.current().file.link.path;

    dv.table(
      ["File", "Summary", ""],
      dv
        .pages(`[[${currentFilePath}]]`)
        .where((page) => page.type === "meeting")
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .limit(10)
        .map((page) => this.createCardRowWithSummary(page)),
    );
  }

  personNetwork(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const currentFilePath = dv.current().file.link.path;

    dv.table(
      ["File"],
      dv
        .pages(`[[${currentFilePath}]]`)
        .where((page) => page.type === "person")
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .map((page) => [page.file.link]),
    );
  }

  mocMeetings(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    dv.table(
      ["File", "Summary", ""],
      dv
        .pages('"Timestamps/Meetings"')
        .where((page) => page.type !== "moc")
        .sort((page) => page.file.cday, "desc")
        .map((page) => this.createCardRowWithSummary(page)),
    );
  }

  actionItems(dv) {
    dv.taskList(
      dv
        .pages()
        .where((page) => page.type !== "moc" && page.file.frontmatter["kanban-plugin"] !== "board")
        .file.tasks.where((task) => !task.completed),
    );
  }
}
