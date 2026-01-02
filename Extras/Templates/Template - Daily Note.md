---
date: <% moment(tp.file.title,'YYYY-MM-DD').format("YYYY-MM-DD") %>
aliases:
tags:
  - "#type/daily-note"
log-worked-hours:
log-day-rating:
---
---
```calendar-nav
```
---
## Morning Pages

> [! journal]- On This Day...
>```dataview
LIST 
FROM "Journal/01 Daily"
WHERE dateformat(file.day, "MM-dd") = dateformat(this.file.day, "MM-dd")

> [! calendar]- Notes Created This Day
>```dataview
TABLE created, updated as modified, tags, summary
FROM "" AND !"Journal" AND !"Templates"
WHERE icontains(dateformat(file.ctime, "YYYY-MM-DD"), dateformat(this.file.day, "YYYY-MM-DD"))

> [! task]- Tasks
> ```dataview
>TASK
>WHERE !completed
>AND icontains(text, "[[<% moment(tp.file.title,'YYYY-MM-DD').format("YYYY-MM") %>-")
>AND icontains(text, "#task")
>GROUP BY file.name as filename
>SORT rows.file.ctime DESC
>```

- `**` Morning brain-dump/word-vomit here `**`



---
## Log Pages

- 08:00
	- [.] First log here... (see this as a side adventure or side quest from your main storyline for the day)



---
## End of Day Review

- [ ] #log/daily-review
<%* 
const dayOfWeek = moment(tp.file.title, 'YYYY-MM-DD').day();
if (dayOfWeek === 5) {
  tR += `- [ ] #log/weekly-hours
  - [Apex](http://myapex.apexsystems.com)
  - [Centene Beeline](https://prod.beeline.com/centene/)
  - [Centene Service Desk Time Sheet Portal](https://servicenow.centene.com/tcp?sysparm_domain_restore=false&sysparm_stack=no)`;
}
%>



