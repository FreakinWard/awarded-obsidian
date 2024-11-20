---
type: <% "person" %>
aliases: 
date: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
relationship:
  - co-worker
location: NJ
timeZone: 
tenuredDate: 
company: Conductiv
role: 
team: 
birthday:
personality:
pets:
family:
---
<%* const title = customJS.AwardedTemplates.adjustNote(tp, "person") %>
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
