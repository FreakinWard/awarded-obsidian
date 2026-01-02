---
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
up:
related:
aliases:
tags:
  - type/note
summary:
---
<%*  
let title = tp.file.title  
if (title.startsWith("Untitled")) {  
title = await tp.system.prompt("Title");  
}  
await tp.file.rename(title)  
-%>
