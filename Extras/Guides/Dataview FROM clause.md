---
created: 2024-09-02
updated: 2024-09-02
aliases: 
tags:
  - "#on/PKM-theory"
  - "#on/dataview/FROM"
summary: A note explaining the FROM clause in dataview
---

summary: This note is for everything related to the `FROM` clause in dataview.
---


The `FROM` clause in Data View queries for Obsidian is essential for specifying the source of your notes or tasks that you want to query. This cheat sheet simplifies the use of `FROM` by providing examples and tips to help you effectively retrieve information from your Obsidian vault.


## Basic Use of `FROM`

### Querying from a Specific Folder

```plaintext
FROM "FolderName"
```
- Queries all notes within a folder named "FolderName".

### Querying from Multiple Folders

```plaintext
FROM "FolderName1", "FolderName2"
```
- Combines notes from both "FolderName1" and "FolderName2".

## Using Tags in the `FROM` clause 

- Note that we normally do this type of filtering on the [[Dataview WHERE clause]].

### Querying Notes with a Specific Tag

```plaintext
FROM #TagName
```
- Targets notes tagged with `#TagName`.

### Querying Notes with Multiple Tags

```plaintext
FROM #Tag1 OR #Tag2
```
- Selects notes tagged with either `#Tag1` OR `#Tag2`.

```plaintext
FROM #Tag1 AND #Tag2
```
- Selects notes tagged with `#Tag1` AND `#Tag2`.

## Combining Folders and Tags

```plaintext
FROM "FolderName" AND #TagName
```
- Queries notes within "FolderName" that are also tagged with `#TagName`.

## Excluding Specific Folders or Tags

### Excluding a Folder

```plaintext
FROM !("FolderName")
```
- Excludes notes from "FolderName".

### Excluding a Tag

```plaintext
FROM !#TagName
```
- Ignores notes tagged with `#TagName`.

## Advanced Use of `FROM`

### Querying Subfolders

```plaintext
FROM "ParentFolder/Subfolder"
```
- Targets notes within a specific subfolder.


### Combining Conditions

```plaintext
FROM ("FolderName" OR "AnotherFolder") AND #TagName
```
- Queries notes within either "FolderName" or "AnotherFolder" that are tagged with `#TagName`.

## Tips for Using `FROM`

- **Exact Match**: Ensure the folder name or tag is exactly matched in your query.
- **Case Sensitivity**: Tags are case-sensitive in Data View queries.
- **Use Quotes**: Always enclose folder names and tags with multiple words in quotes.
- **Path Separators**: Use forward slashes `/` to denote subfolders in your paths.
- **Experiment**: Try different combinations of folders and tags to fine-tune your queries.

