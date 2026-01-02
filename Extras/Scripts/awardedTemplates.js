class AwardedTemplates {
  obsidianState() {
    const { obsidian, app, AwardedTables } = self.customJS || {};
    if (obsidian == null || app == null) throw new Error("customJS is null.");

    return self.customJS;
  }

  area(dv) {
    const { AwardedTables } = this.obsidianState();

    AwardedTables.noteLogs(dv);
    AwardedTables.subAreas(dv);
    AwardedTables.relatedMeetings(dv);
    AwardedTables.relatedNotes(dv);
    AwardedTables.tasksAndQuestions(dv);
  }
  
  person(dv) {
    const { AwardedTables } = this.obsidianState();

    AwardedTables.personLastContact(dv);
    AwardedTables.noteLogs(dv);
    AwardedTables.personTasksAndQuestions(dv);
    AwardedTables.noteMentions(dv);
  }

  project(dv) {
    const { AwardedTables } = this.obsidianState();

    AwardedTables.noteLogs(dv);
    AwardedTables.subProjects(dv);
    AwardedTables.relatedMeetings(dv);
    AwardedTables.relatedNotes(dv);
    AwardedTables.tasksAndQuestions(dv);
  }
  
  focusDashboard(dv) {
    const { AwardedTables } = this.obsidianState();

    dv.el("hr", "");
    AwardedTables.dashboardActiveProjects(dv);

    dv.el("br", "");
    dv.el("hr", "");
    
    AwardedTables.dashboardActiveTasks(dv);

    dv.el("br", "");
    dv.el("hr", "");
    
    AwardedTables.dashboardRecentlyChanged(dv);
  }
}
