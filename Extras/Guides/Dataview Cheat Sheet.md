---
created: 2024-09-02
updated: 2024-09-02
aliases: 
tags:
  - "#on/PKM-theory"
  - "#on/dataview"
summary: A note with some basic dataview queries we tend to use a lot
---

## What is Dataview used for?

**Dataview** is an Obsidian plugin that lets you easily organize and view your notes. You can sort and display your notes in different formats, such as lists and tables, by using the metadata (like tags and dates) in your notes. It makes managing your information simpler and transforms your notes into a navigable database.

## Basic Syntax 

Dataview is activated with the following format:
> ![[Pasted image 20240227140443.png]]

You have three output formats
> ![[Pasted image 20240227165127.png]]

A simple dataview query retrieving a TABLE might look like this:
> ![[Pasted image 20240303161339.png]]

In this query:
- `FROM "Folder/Path"` specifies the folder from which you want to query the notes. Replace `"Folder/Path"` with the actual path to your folder.
- `WHERE condition` and `SORT attribute` work the same as before, filtering and sorting your notes based on specified criteria.
- `SORT attribute DESC` sorts the results by the specified attribute in descending order.
## FROM
![[Dataview FROM clause]]

## WHERE
![[Dataview WHERE clause]]

## Sorting
![[Dataview Sorting]]


## Useful YouTube videos on DataView

- [Automate Your Vault With Dataview - How To Use Dataview in Obsidian](https://youtu.be/8yjNuiSBSAM?si=2bioEw6u_p1gB0IH)
- [Obsidian Dataview Plugin Tutorial 101](https://youtu.be/buOxN65U0qE?si=S3vpD7hPJJw89V2X)