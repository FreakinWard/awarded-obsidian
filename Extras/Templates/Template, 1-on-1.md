---
type: <% "person-note" %>
aliases: 
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
summary:
emotion:
---
<%* const {title, topic } = customJS.AwardedTemplates.adjustNote(tp, "person-note") %>
Person:: [[<% topic ? topic : "Undefined Topic" %>]]
Person:: [[<% title %>]]
Date: <% tp.date.now("YYYY-MM-DD - dddd") %>

summary:: 

## Notes
- 

## Meetings
```dataviewjs
	customJS.AwardedTables.personMeetings(dv);
```