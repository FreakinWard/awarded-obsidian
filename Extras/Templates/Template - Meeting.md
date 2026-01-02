---
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
up:
related:
participants:
tags:
  - "#type/meeting"
summary:
---
## Agenda
<% tp.file.cursor(0) %>

## Notes

- [.] #log/sprint [[Project -]] - topic/idea/mention
		- details

```dataviewjs
	customJS.AwardedTables.noteMentions(dv);
```