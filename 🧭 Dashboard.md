---
type: moc
---


![Today](https://wakapi.dev/api/badge/freakinward/interval:today?label=today)

```dataviewjs
customJS.AwardedUtility.greeting(dv)
```

## Task from direct query


--- 

## Inbox
```dataviewjs
customJS.AwardedTables.todaysInbox(dv);
// dv.list(dv.pages('"Inbox"').file.name)
```

## Action Items - Task from query
```tasks
not done
filter by function task.file.frontmatter.type !== "moc" 

```

## Recent Notes
```dataviewjs
customJS.AwardedTables.recentNotes(dv);
```

## Recent Meetings
```dataviewjs
customJS.AwardedTables.recentMeetings(dv);
```

[[🗣️ Meetings MOC]]
