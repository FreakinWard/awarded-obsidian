---
type: template-person
aliases: 
date: <% tp.file.creation_date() %>
birthday: 
personality: 
relationship:
  - co-worker
location: 
company: Conductiv
role: 
pets: 
family:
---
<%*
	const directory = "/Extras/People/";
	const defaultTitle = "Untitled";
	
	let title = tp.file.title;
		console.log(`running script: ${title}`)

	
%>

<% customJS.AwardedTemplates.createNoteFromTemplate(tp) %>

# <% title %>

## Overview


## Communication


## Favorites


## Hobbies


## Notes
- 

---
## Meetings
```dataviewjs
	customJS.AwardedTables.personMeetings(dv);
```

---
## 1-on-1
```dataviewjs
	customJS.AwardedTables.person1on1(dv);
```

---
## Mentions
```dataviewjs
	customJS.AwardedTables.noteMentions(dv);
```

---
## Network
```dataviewjs
	customJS.AwardedTables.personNetwork(dv);
```