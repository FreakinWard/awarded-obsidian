---
type: template-person-note
aliases: 
date: <% tp.file.creation_date() %>
summary: 
---
<%*
	const directory = "/Timestamps/People/";
	const defaultTitle = "Untitled";
	
	let originalTitle = tp.file.title;
		console.log(`running script: ${originalTitle}`)

	// when the file name is undefined, prompt for the topic
	if (originalTitle.startsWith(defaultTitle)) {
		const topic = await tp.system.prompt("Person name:"); 

		// when the prompt is empty or skipped then delete the newly created file
		if(!topic) {
			await this.app.vault.delete(defaultTitle);
			return;
		}

		title = topic;
	}

	// reset the type from the template
	const file = tp.file.find_tfile(tp.file.path(true));
	console.log({file})
	await setTimeout(
		async ()=> {
			await app.fileManager.processFrontMatter(file, (frontmatter) => { 
				frontmatter["type"] = frontmatter["type"].replace(/^template-/, "")
			});
		}, 
		1000
	);

	const today = tp.date.now("YYYY-MM-DD");
	const newTitle = `${today} ${title}`;
	
	const targetFilePath = `${directory}${newTitle}`;
	const targetFile = await tp.file.find_tfile(targetFilePath);

	console.log({targetFile});

	// TODO: fix this - current opens the Untitled file
	// if(targetFile) {
		// when the file already exists then delete current file
	//	await this.app.vault.delete(defaultTitle);
	//}
	// 	console.log(`Note already exists, will open: ${targetFile}`);
	// 	await this.app.vault.delete(defaultTitle);
	// 	this.app.workspace.getLeaf("tab").openFile(targetFile);
	// 	//return;
	// } else {
	
	// when the file does not exist then move it to the expected location
	// console.log(`Note moved to: ${targetFilePath}`)
	// await tp.file.move(targetFilePath);	
	// }

	console.log(`Note cursor set`)
	await tp.file.cursor(0);
	
	let person = title // used for Person tag below
%>
Date: <% tp.date.now("YYYY-MM-DD - dddd") %>
Person:: [[<% person %>]]

# <% title %>


## Notes
- 

## Meetings
```dataview
TABLE file.cday as Created, summary AS "Summary"
FROM "Timestamps/Meetings" where contains(file.outlinks, [[]])
SORT file.cday DESC
```