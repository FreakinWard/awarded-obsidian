---
type: moc
---


![Today](https://wakapi.dev/api/badge/freakinward/interval:today?label=today)


```dataview
TASK
FROM ""
WHERE type = "meeting"
	AND!completed
GROUP BY link as origin
SORT origin.file.mtime DESC, text ASC
```

```dataviewjs
const currentHour = moment().format('HH');

let greeting;

if (currentHour >= 18 || currentHour < 5) greeting = '🌙 Good Evening'
else if (currentHour >= 5 && currentHour < 12) greeting = '🌞 Good Morning'
else greeting = '🌞 Good Afternoon'

dv.header(2, greeting)
```

## Yesterdays notes
## This week's notes

## Last weeks notes

## Action Items 

[[🗣️ Meetings MOC]]

---
Recently Changed
```dataviewjs
customJS.AwardedTables.recentNotes(dv);
```

```dataviewjs
//customJS.MacroGuide.helloWorld(dv);
customJS.AwardedTables.recentNotes(dv);
```