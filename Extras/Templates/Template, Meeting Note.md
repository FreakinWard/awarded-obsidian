---
type: <% "meeting" %>
date: <% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>
company: Conductiv
emotion:
---
<%* const title = customJS.AwardedTemplates.adjustNote(tp, "meeting") %>
# <% title %>
 <% tp.date.now("YYYY-MM-DD - dddd") %>
 
**Attendees**: :
- [[<% tp.file.cursor(0) %>]]

summary:: 

## Agenda/Questions
- 

## Notes
- 

## Mentions
```dataviewjs
	customJS.AwardedTables.noteMentions(dv);
```