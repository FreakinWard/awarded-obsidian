---
type: <% "journal-daily" %>
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
aliases: 
company: Conductiv
summary: 
emotion:
---
```calendar-nav
```
# {{date:dddd, MMMM Do, YYYY}}

<% tp.web.daily_quote() %>

## Morning Pages
> [! journal]- On This Day...
> ```dataviewjs
>	customJS.AwardedTablesDailyNote.onThisDay(dv);
>```

> [! calendar]- Notes Created This Day
> ```dataviewjs
>	customJS.AwardedTablesDailyNote.notesCreatedOnThisDay(dv);
>```

> [! task]+ Tasks
> ```dataviewjs
>	customJS.AwardedTablesDailyNote.tasksForToday(dv);
>```

---

## Brain-dump | Word-vomit
- [[<% tp.file.title %> standup|Todays Standup]]

---

## Mentions
```dataviewjs
	customJS.AwardedTables.noteMentions(dv);
```