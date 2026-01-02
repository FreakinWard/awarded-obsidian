---
created: 2024-09-02
updated: 2024-09-02
aliases: 
tags:
  - "#on/PKM-theory"
  - "#on/dataview/WHERE"
summary: WHERE clause in Obsidian Dataview
---


The `WHERE` clause is utilized to filter the results based on certain conditions, allowing you to refine what notes or metadata are included in your query results. It essentially acts as a filter to narrow down the data returned by the query based on specified criteria, such as tags, dates, or custom fields within your notes.

## Some Limitations 

- We use a lot of links in our vault that looks like this 
	- in the edit mode:
		- ![[Pasted image 20240228174539.png]]
	- And in reading mode:
		- ![[Pasted image 20240228174610.png]]
- This syntax, however, cannot be used in Dataview (yet)
	- So you need to decide what do you prefer.
		- A note that has metadata with links you can click OR
		- A note that does not have linked metadata, but you can query them.

## Purpose of the `WHERE` Clause

- **Filtering**: The `WHERE` clause filters notes or tasks by specified criteria, allowing you to include only those items that meet certain conditions.
- **Conditional Logic**: It supports logical operators (AND, OR, NOT) to combine multiple conditions for more complex queries.

## Basic Syntax

```plaintext
WHERE condition
```

## Common Conditions

- **Equality**: `field = "value"` (e.g., `status = "Complete"`)
- **Inequality**: `field != "value"` (e.g., `priority != "Low"`)
- **Greater Than/Less Than**: `field > value`, `field < value` (e.g., `due > date(today)`)
- **Contains**: `contains(field, "substring")` (e.g., `contains(tags, "#important")`)
- **Starts/Ends With**: `startswith(field, "prefix")`, `endswith(field, "suffix")`

## Using Logical Operators

- **AND**: Combines multiple conditions that must all be true (e.g., `status = "Complete" AND priority = "High"`)
- **OR**: At least one of the conditions must be true (e.g., `status = "Complete" OR status = "In Progress"`)
- **NOT**: Excludes notes that match the condition (e.g., `NOT contains(tags, "#archived")`)

## Advanced Filtering

- **Nested Conditions**: Use parentheses to group conditions (e.g., `(status = "Complete" OR status = "In Progress") AND priority = "High"`)
- **Date Comparisons**: Compare dates (e.g., `due <= date(today)` or `created >= date(2023-01-01)`)
- **Regex Matching**: For advanced pattern matching (e.g., `matches(title, "Project.*2024")`)

## Some Examples

### 1. Filtering by Tags
To select notes tagged with "type/recipe":

```dataview
TABLE title, tags
WHERE icontains(tags, "type/recipe")
```

### 2. Combining Conditions with AND
To find notes that are both tagged with "type/recipe" and have "chocolate" in the ingredients:

```dataview
TABLE title, ingredients
WHERE icontains(tags, "type/recipe") AND icontains(ingredients, "chocolate")
```

### 3. Using OR for Broader Selections
To display notes tagged either "cuisine/french" or "cuisine/italian":

```dataview
TABLE title, tags
WHERE icontains(tags, "cuisine/french") OR icontains(tags, "cuisine/italian")
```

### 4. Excluding Specific Tags with !=
To list notes that are recipes but not tagged as "cuisine/chinese":

```dataview
TABLE title, tags
WHERE icontains(tags, "type/recipe") AND !icontains(tags, "cuisine/chinese")
```

### 5. Filtering by Creation Date
#### 5.1 To find notes created after January 1, 2024 (based off of file.cday):
```dataview
TABLE file.cday
WHERE file.cday > date(2024-01-01)
```

#### 5.2 To find notes created after January 1, 2024 (based off of our "created-date" metadata field):

```dataview
TABLE created-date
WHERE date(substring(created-date, 0, 10)) >= date("2024-01-01")
```

### 6. Using Parentheses to Group Conditions
To select notes that are either recipes or have a cooking time of 30 minutes, but are not tagged as desserts:
```dataview
TABLE title, tags
WHERE (icontains(tags, "type/recipe") OR icontains(cooking-time, "30-minutes")) AND !icontains(tags, "type/dessert")
```

### 7. Checking for Presence of a Field
To display notes that have a summary field:
```dataview
TABLE title, summary
WHERE summary != null
```


