---
type: <% "person-note" %>
aliases: 
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
emotion:
---
<%*
    const title = await customJS.AwardedTemplates.adjustNote(tp, "person-note")
    const person = title.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s/, '')
%>

Person:: [[<% person %>]]
Date: <% tp.date.now("YYYY-MM-DD - dddd") %>

summary:: 

## Notes
- 

## Meetings
```dataviewjs
	customJS.AwardedTables.personMeetings(dv);
```
