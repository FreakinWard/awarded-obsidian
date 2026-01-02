---
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
up:
related:
aliases:
tags:
  - type/work-item
  - type/project
summary:
jira-work-item-id:
---
<%*  
let title = tp.file.title  
if (title.startsWith("Untitled")) {  
title = await tp.system.prompt("Title");  
}  
await tp.file.rename(title)  
-%>
## Overview

## Acceptance Criteria
```gherkin
Feature: Example - User Login   
  Scenario Outline: User can login using their credentials    
	Given A user logs in with <email>  
	
	When the <password> is entered    
	Then it is <expected>  
    
    Examples:
    | email                   | password          | expected  |      
    | first.last@domain.com   | my-password       | accepted  |      
    | first.last@domain.com   | my-bad-password   | rejected  | 
```

## Pre-check
- Packages install
- Build succeeds
- Tests Pass
- Dev runs

## Changes
Description of required changes, refactors, etc

## Post-check
- Packages install
- Build succeeds
- Tests Pass
- Dev runs

```dataviewjs
	customJS.AwardedTables.tasksAndQuestions(dv);
```