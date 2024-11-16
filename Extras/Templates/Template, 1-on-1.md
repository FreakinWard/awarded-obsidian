---
type: <% "person-note" %>
aliases: 
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
summary:
emotion:
---
<%* const title = customJS.AwardedTemplates.adjustNote(tp, "person-note") %>

Person:: [[<% title %>]]
Date: <% tp.date.now("YYYY-MM-DD - dddd") %>

summary:: 

## Notes
- 

## Meetings
```dataviewjs
	customJS.AwardedTables.personMeetings(dv);
```