---
type: template-meeting
date: <% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>
company: Conductiv
summary: 
emotion:
---
<%*
	const directory = "/Timestamps/Meetings/";
	const defaultTitle = "Untitled";
	
	let title = tp.file.title;

	// when the file name is undefined, prompt for the topic
	if (title.startsWith(defaultTitle)) {
		const topic = await tp.system.prompt("Meeting Topic:"); 

		// when the prompt is empty or skipped then delete the newly created file
		if(!topic) {
			await this.app.vault.delete(defaultTitle);
			return;
		}

		title = topic;
	}

	// reset the type from the template
	const file = tp.file.find_tfile(tp.file.path(true));

	const today = tp.date.now("YYYY-MM-DD");
	const newTitle = `${today} ${title}`;
	
	const targetFilePath = `${directory}${newTitle}`;

		// move the file to the expected location
	console.log(`Note moved to: ${targetFilePath}`)
	await tp.file.move(targetFilePath);

	await tp.file.cursor(0);
%>
tags:: [[Conductiv]]
Date: <% tp.date.now("YYYY-MM-DD - dddd") %>

# <% title %>

**Attendees**: :
- [[<% tp.file.cursor(0) %>]]


## Agenda/Questions
- 

## Notes
- 

## Mentions
```dataview
TABLE dateformat(date, "yyyy-MM-dd - cccc") AS "Date"
FROM -#MOC
WHERE contains(file.outlinks, this.file.link)
SORT file.name asc
```
