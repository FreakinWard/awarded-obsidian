class AwardedTablesDailyNote {
  createCardRowWithSummary(page) {
    const summary = page.summary ? page.summary : "`-`";

    return [page.file.link, summary, page.file.mtime.toRelative()];
  }

  createCardRowWithSummaryMemories(page) {
    const emptySummary = "`-`";

    const pageSummary = page.type === "person" ? page.relationship[0] : page.summary;
    const summaryText = pageSummary ? pageSummary : emptySummary;

    const noteDate = new Date(page.date);
    const yearsAgo = new Date().getFullYear() - noteDate.getFullYear();

    const timeText = yearsAgo === 1 ? "Last year" : `${yearsAgo} years ago`;
    return [page.file.link, summaryText, timeText];
  }

  isToday(taskCompletion, targetDate) {
    if (!taskCompletion) return false;

    if (!targetDate) throw new Error("targetDate is required.");

    const targetDateAsDateTime = new Date(`${targetDate}T12:00:00.000Z`);
    const today = targetDate instanceof Date ? targetDate : targetDateAsDateTime;

    const dateTime = new Date(taskCompletion);
    return (
      dateTime.getDate() === today.getDate() &&
      dateTime.getMonth() === today.getMonth() &&
      dateTime.getFullYear() === today.getFullYear()
    );
  }

  isMemories(sourceDate, targetDate, fileName) {
    if (!sourceDate) throw new Error(`sourceDate is required: ${fileName}`);
    if (!targetDate) throw new Error("targetDate is required.");

    const targetDateAsDateTime = new Date(`${targetDate}T12:00:00.000Z`);
    const today = targetDate instanceof Date ? targetDate : targetDateAsDateTime;

    const noteDate = new Date(sourceDate);
    const isSameDay = noteDate.getDate() === today.getDate();
    const isSameMonth = noteDate.getMonth() === today.getMonth();
    const isSameYear = noteDate.getFullYear() === today.getFullYear();

    const isMemory = isSameDay && isSameMonth && !isSameYear;

    console.log("\n", { fileName });
    console.log(
      `isMemory: ${isMemory}\n\n`,
      `${noteDate}\n`,
      `${targetDate}\n\n`,
      `isSameDay: ${isSameDay}, isSameMonth: ${isSameMonth}, isSameYear: ${isSameYear}`,
    );

    return isMemory;
  }

  onThisDay(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const currentNote = dv.current();
    const journalDate = new Date(currentNote["journal-start-date"]);

    dv.table(
      ["File", "Summary", ""],
      dv
        .pages()
        .where((page) => page.type !== "moc")
        .where(
          (page) =>
            page.file.path.startsWith("Timestamps/Journal") ||
            page.file.path.startsWith("Extras/People"),
        )
        // .where((page) => {
        //   const fileName = page.file.name;
        //   console.log("test", { fileName });
        //
        //   return true;
        // })
        .where((page) => this.isMemories(page.date, journalDate, page.file.name))
        .sort((page) => page.date, "desc")
        .map((page) => this.createCardRowWithSummaryMemories(page)),
    );
  }

  notesCreatedOnThisDay(dv) {
    const { obsidian, app } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    const excludedTypes = ["moc"];

    const currentFile = dv.current();
    const journalDate = new Date(currentFile["journal-start-date"]);

    dv.table(
      ["File", "Summary", ""],
      dv
        .pages()
        .where((page) => this.isToday(page.date, journalDate))
        .where((page) => !page.file.path.startsWith("Extras/Templates"))
        .where((page) => !page.file.path.startsWith("Extras/Files"))
        .where((page) => !page.file.path.startsWith("Extras/Scripts"))
        .where((page) => !page.file.path.startsWith("Timestamps/Journal"))
        .where((page) => !excludedTypes.includes(page.type))
        .sort((page) => page.file.cday, "desc")
        .map((page) => this.createCardRowWithSummary(page)),
    );
  }

  tasksForToday(dv) {
    const currentFile = dv.current();
    const journalDate = new Date(currentFile["journal-start-date"]);

    
    dv.taskList(
      dv
        .pages()
        .where((page) => page.type !== "moc") // && page.file.frontmatter["kanban-plugin"] !== "board")
        // .where((page) => page.type !== "moc" && page.file.frontmatter["kanban-plugin"] !== "board")
        .file.tasks.where((task) => {
          const isComplete = task.completed;
          const isDueToday = this.isToday(task.due, journalDate);
          const isCompletedToday = this.isToday(task.completion, journalDate);
          const isPastDue = !isComplete && task.due <= journalDate;
          const hasEmptyDueDate = !task.due === null;

          const text = task.text;
          if (text.contains('todays completed')){
            console.log(
              "test",
              { task },
              { text },
              "\n",
              `isDueToday: ${isDueToday}\n`,
              `isCompletedToday: ${isCompletedToday}\n`,
              `isPastDue: ${isPastDue}\n`,
              `hasEmptyDueDate: ${hasEmptyDueDate}\n`,
            );
          }
          
          return isDueToday || isPastDue || hasEmptyDueDate || isCompletedToday;
        }),
    );
  }
}
