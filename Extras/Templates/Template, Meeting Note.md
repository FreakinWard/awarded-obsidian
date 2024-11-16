---
type: <% "meeting" %>
aliases: 
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
company: Conductiv
emotion:
---
<%* const title = customJS.AwardedTemplates.adjustNote(tp, "meeting") %>
# <% title %>
Date: <% tp.date.now("YYYY-MM-DD - dddd") %>
 
**Attendees**: :
- [[<% tp.file.cursor(0) %>]]

summary:: 

## Agenda
- 

## Notes
- 

## Mentions
```dataviewjs
	customJS.AwardedTables.noteMentions(dv);
```
