class AwardedTables {
  // Truncate long display text with ellipsis for uniform list width
  truncate(text, max = 30) {
    const s = String(text ?? "");
    return s.length > max ? s.slice(0, max - 1) + "…" : s;
  }

  summarizeName(name) {
    let s = String(name ?? "").trim();
    s = s.replace(/^\d{4}-\d{2}-\d{2}[ _-]+/, "");
    s = s.replace(/[ _-]+\d{4}-\d{2}-\d{2}$/u, "");
    return s.replace(/\s{2,}/g, " ").trim();
  }
  
  calculateDaysSince(date) {
    return Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
  }

  createCardRow(page) {
    const base = this.summarizeName(page.file.name);
    const display = this.truncate(base);
    const linkToNote = `[[${page.file.path}|${display}]]`;
    // return (
    //   linkToNote +
    //   "<span style='color: gray; font-size: 13px; margin-left: 2px; float: right;'>" +
    //   page.file.mtime.toRelative() +
    //   // ageInDays + "d" +
    //   "</span>"
    // );
    return [linkToNote, page.file.mtime.toRelative()];
  }

  createCardRowWithSummary(page) {
    const summary = page.summary ? page.summary : "`-`";

    return [page.file.link, summary, page.file.ctime.toRelative()];
  }
  
  hasTags(page, expectedTags) {
    const pageTags = Array.isArray(page.tags) ? page.tags : [];
   
    return expectedTags.some(tag => pageTags.includes(tag));
  }
  
  dashboardRecentlyChanged(dv) {
    dv.table(
      ["Recently Changed", "Age"], // column name
      dv
        // Query all notes inside the Notes/ folder, including subfolders
        .pages('"Notes"')
        // Sort BEFORE limiting so we truly get the most recently modified notes
        .sort((page) => page.file.mtime.toMillis(), "desc")
        .limit(10)
        .map((page) => this.createCardRow(page)),
    );
  }
  
  dashboardActiveProjects(dv) {
    const activeProjects = dv.pages('"Notes"')
      .where((page) => {
        const tags = Array.isArray(page.tags) ? page.tags : [];
        return tags.some(tag => tag.includes("type/project"));
      })
      .where((page) => {
        const tags = Array.isArray(page.tags) ? page.tags : [];
        return tags.some(tag => tag.includes("status/active"));
      })
      .sort((page) => page.file.name, "desc");

    const projectsWithAge = activeProjects.map((page) => {
      const ageInDays = this.calculateDaysSince(page.created ?? page.file.ctime)
      
      return { page, age: ageInDays };
    });

    dv.table(
      ["Active Project",  "Age", "Summary"],
      projectsWithAge.map(({ page, age: ageInDays }) => [
        page.file.link,
        ageInDays + "d",
        page.summary
      ])
    );
  }

  dashboardActiveTasks(dv) {
      const currentFilePath = dv.current().file.path;
      
      const parentTasks = dv.pages().file.tasks
          .filter(t => t.path !== currentFilePath)
          .filter(t => t.children = [])
          .filter(t => t.text.includes("#task"))
          .filter(t => !t.completed && !t.status.includes("-"));
  
      // Create array with calculated ages first
      const tasksWithAge = parentTasks.map(t => {
          const calculateDaysSince = (date) => Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
          const taskDate = dv.page(t.path).created;
          const ageInDays = taskDate 
              ? calculateDaysSince(taskDate)
              : calculateDaysSince(dv.page(t.path).file.ctime);
          // Robust due date to millis (supports Dataview DateTime or primitive date)
          const toMillis = (d) => d && typeof d.toMillis === 'function' ? d.toMillis() : (d ? new Date(d).getTime() : null);
          const dueMs = toMillis(t.due);
          return { task: t, age: ageInDays, dueMs };
      });
  
      // Sort: tasks with due dates first (earliest due first), then by age descending
      const sortedTasks = tasksWithAge.sort((a, b) => {
          const aHasDue = a.dueMs != null && !Number.isNaN(a.dueMs);
          const bHasDue = b.dueMs != null && !Number.isNaN(b.dueMs);
          if (aHasDue && !bHasDue) return -1;
          if (!aHasDue && bHasDue) return 1;
          if (aHasDue && bHasDue) return a.dueMs - b.dueMs; // earlier due first
          return b.age - a.age; // fallback: age desc
      });
  
      // dv.header(2, "Tasks");
      dv.table(
          ["Open Tasks", "Age", "Related", "Source"],
          sortedTasks.map(({task: t, age: ageInDays}) => {
            const taskDescription = t.text.split(" - ").pop().trim();

            const projectLink = t.outlinks
                  .map(l => `- [[${l.path}|${l.display}]]`)
                  .join("\n");
  
              const sourceLink = `[[${t.path}|source]]`;
              
              const taskDescriptionLink = `[[${t.path}#${t.section.subpath}|${taskDescription}]]`;

            // console.log('test', { t, projectLink, sourceLink, taskDescriptionLink });

            return [taskDescriptionLink, ageInDays + "d", projectLink, sourceLink];
          })
      );
  }

  noteMentions(dv) {
    const currentFilePath = dv.current().file.link.path;

    dv.header(2, "Note Mentions");
    dv.table(
      ["File", "Summary", ""],
      dv
      .pages(`[[${currentFilePath}]]`)
      .where((page) => page.type !== "person")
      .where((page) => {
        const linkArrayHasCurrent = (val) => dv.array(val).filter((x) => {
          if (x && typeof x === "object" && "path" in x) return x.path === currentFilePath;
          if (typeof x === "string") return x.includes(currentFilePath);
          return false;
        }).length;

        const mentionsInFrontMatter = linkArrayHasCurrent(page.up) + linkArrayHasCurrent(page.related) + linkArrayHasCurrent(page.participants);
        const totalMentions = dv.array(page.file?.outlinks).filter((l) => l && l.path === currentFilePath).length;
        
        // Keep only if there exists at least one body mention beyond frontMatter-only mentions
        return totalMentions > mentionsInFrontMatter;
      })
      .sort((page) => page.file.ctime.toMillis(), "desc")
      .map((page) => this.createCardRowWithSummary(page)),
    );
  }
  
  relatedNotes(dv) {
    const currentFileLink = dv.current().file.link;

    const linkArrayHasCurrent = (val) =>
      dv.array(val).some((x) => {
        if (x && typeof x === "object" && "path" in x) return x.path === currentFileLink.path;
        if (typeof x === "string") return x.includes(currentFileLink.path);
        return false;
      });

    const pages = dv
      .pages()
      .where((p) => p.type !== "person")
      .where((p) => linkArrayHasCurrent(p.related) || linkArrayHasCurrent(p.up))
      .sort((page) => page.file.ctime.toMillis(), "desc");

    dv.header(2, "Related Notes");
    dv.table(
      ["File", "Summary", ""],
      pages.map((page) => this.createCardRowWithSummary(page))
    );
  }
  
  noteLogs(dv) {
    const currentFileName = dv.current().file.name;

    const sprintLogs = dv.pages().file.tasks
      .filter(t => t.text.toLowerCase().includes(currentFileName.toLowerCase()))
      .filter(t => t.text.includes("#log/sprint"));

    const logsGroupedByFile = {};
    sprintLogs.forEach(task => {
      if (!logsGroupedByFile[task.path]) logsGroupedByFile[task.path] = [];
      logsGroupedByFile[task.path].push(task);
    });

    const sortedFiles = Object.entries(logsGroupedByFile)
      .sort((a, b) => {
        const pageA = dv.page(a[0]);
        const pageB = dv.page(b[0]);
        return pageB.file.ctime - pageA.file.ctime;
      });

    const modifiedTasks = sortedFiles.flatMap(([path, fileTasks]) => {
      const sourceFileName = dv.page(path).file.name;
      return fileTasks.map(task => {
        task.text = task.text.replace(currentFileName, sourceFileName);
        return task;
      });
    });

    dv.header(2, "Logs");
    dv.taskList(modifiedTasks, false);
  }

  personLastContact(dv) {
    const currentFileLink = dv.current().file.link;

    const contactNotes = dv.pages()
      .where((page) => {
        const tags = Array.isArray(page.tags) ? page.tags : [];
        return tags.some(tag => tag.includes("type/1-on-1") || tag.includes("type/pairing"));
      })
      .where((page) => page.file.outlinks && page.file.outlinks.some(link => link.path === currentFileLink.path))
      .array();

    if (contactNotes.length === 0) return;

    const contactWithDays = contactNotes.map((page) => {
      const contactDate = page.day || page.created;
      const daysSince = Math.floor((Date.now() - new Date(contactDate)) / (1000 * 60 * 60 * 24));
      return { page, daysSince, contactDate };
    });

    const mostRecent = contactWithDays.sort((a, b) => new Date(b.contactDate) - new Date(a.contactDate))[0];

    const formattedDate = new Date(mostRecent.contactDate).toISOString().split('T')[0];

    dv.header(2, "Last Contact");
    dv.table(
      ["Contact note", "Last contact"],
      [[
        mostRecent.page.file.link,
        `**${mostRecent.daysSince} days** | ${formattedDate}`
      ]]
    );
  }
  
  personTasksAndQuestions(dv) {
    const currentFileName = dv.current().file.name;

    const tasks = dv.pages().file.tasks
      .filter(t => t.text.toLowerCase().includes(currentFileName.toLowerCase()))
      .filter(t => t.text.includes("#task") || t.text.includes("#question"));

    const groupedByFile = {};
    tasks.forEach(task => {
      if (!groupedByFile[task.path]) {
        groupedByFile[task.path] = [];
      }
      groupedByFile[task.path].push(task);
    });

    const sortedFiles = Object.entries(groupedByFile)
      .sort((a, b) => {
        const pageA = dv.page(a[0]);
        const pageB = dv.page(b[0]);
        return pageB.file.ctime - pageA.file.ctime;
      });

    const modifiedTasks = sortedFiles.flatMap(([path, fileTasks]) => {
      const fileName = dv.page(path).file.name;
      return fileTasks.map(task => {
        task.text = task.text.replace(currentFileName, fileName);
        return task;
      });
    });

    dv.header(2, "Tasks and Questions");
    dv.taskList(modifiedTasks, false);
  }

  subAreas(dv) {
    const currentFileLink = dv.current().file.link;

    const subProjects = dv.pages()
      .where((page) => {
        const up = page.up;
        return up && (Array.isArray(up) ? up.some(u => u.path === currentFileLink.path) : up.path === currentFileLink.path);
      })
      .where((page) => {
        const tags = Array.isArray(page.tags) ? page.tags : [];
        return tags.some(tag => tag.includes("type/project") || tag.includes("type/area"));
      })
      .sort((page) => page.file.name, "desc");

    dv.header(2, "Sub Areas");
    dv.table(
      ["Sub Project", "Created", "Summary", "Tags"],
      subProjects.map((page) => [
        page.file.link,
        page.created,
        page.summary,
        page.tags ? page.tags.join("\n") : ""
      ])
    );
  }

  relatedMeetings(dv) {
    const currentFileLink = dv.current().file.link;

    const meetings = dv.pages()
      .where((page) => {
        const up = page.up;
        return up && (Array.isArray(up) ? up.some(u => u.path === currentFileLink.path) : up.path === currentFileLink.path);
      })
      .where((page) => {
        const tags = Array.isArray(page.tags) ? page.tags : [];
        return tags.some(tag => tag.includes("type/meeting"));
      })
      .sort((page) => page.file.name, "desc");

    dv.header(2, "Related Meetings");
    dv.table(
      ["Session", "Created", "Participants", "Summary"],
      meetings.map((page) => [
        page.file.link,
        page.created,
        page.participants,
        page.summary
      ])
    );
  }

  relatedTasksAndQuestions(dv, isCompleted = false) {
    const currentFileName = dv.current().file.name;

    const tasks = dv.pages().file.tasks
      .filter(t => t.text.toLowerCase().includes(currentFileName.toLowerCase()))
      .filter(t => (t.text.includes("#task") || t.text.includes("#question")) && t.completed === isCompleted);

    const groupedByFile = {};
    tasks.forEach(task => {
      if (!groupedByFile[task.path]) {
        groupedByFile[task.path] = [];
      }
      groupedByFile[task.path].push(task);
    });

    const sortedFiles = Object.entries(groupedByFile)
      .sort((a, b) => {
        const pageA = dv.page(a[0]);
        const pageB = dv.page(b[0]);
        return pageB.file.ctime - pageA.file.ctime;
      });

    if (isCompleted) dv.header(3, "Open") 
    else dv.header(3, "Closed");
      
    dv.taskList(
      sortedFiles.flatMap(([path, fileTasks]) => fileTasks),
      false
    );
  }
  
  tasksAndQuestions(dv) {
    dv.header(2, "Tasks and Questions");

    this.relatedTasksAndQuestions(dv);

    this.relatedTasksAndQuestions(dv, true);
  }
  
  subProjects(dv) {
    const currentFileLink = dv.current().file.link;

    const projects = dv
      .pages()
      .where((page) => {
        const up = page.up;
        return (
          up && (
            Array.isArray(up)
              ? up.some((u) => u && u.path === currentFileLink.path)
              : up.path === currentFileLink.path
          )
        );
      })
      .where((page) => {
        const tags = Array.isArray(page.tags) ? page.tags : [];
        return tags.some((t) => String(t).includes("type/project"));
      })
      .where((page) => {
        const p = (page.file && page.file.path) ? page.file.path : "";
        return !(p.startsWith("Extras/Templates/") || page.file?.folder === "Extras/Templates");
      })
      .sort((page) => page.file.name, "desc");

    dv.header(2, "Sub Projects");
    dv.table(
      ["Sub Project", "Created", "Summary", "Tags"],
      projects.map((page) => [
        page.file.link,
        page.created,
        page.summary,
        page.tags ? page.tags.join("\n") : ""
      ])
    );
  }
}
