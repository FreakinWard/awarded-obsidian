---
type: <% "standup" %>
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
company: Conductiv
summary: 
emotion:
---
<%* const title = customJS.AwardedTemplates.adjustNote(tp, "standup") %>
# <% title %>
 <% tp.date.now("YYYY-MM-DD - dddd") %>
 
**Attendees**: :
- [[]]

summary:: 

## My Updates
- Yesterday
	- <% tp.file.cursor(0) %>
- Today
	- 
- Impediments
	- 

## Notes
- 

## Mentions
```dataviewjs
	customJS.AwardedTables.noteMentions(dv);
```