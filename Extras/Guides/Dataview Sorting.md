---
created: 2024-09-02
updated: 2024-09-02
aliases: 
tags:
  - "#on/PKM-theory"
  - "#on/dataview/sorting"
summary: This note goes through the sorting and grouping capabilities of Dataview.
---


### Dataview Sorting and Grouping Cheat Sheet

#### Sorting

- **Basic Sorting (Ascending)**
  ```plaintext
  SORT field-name
  ```
  Sorts the results by `field-name` in ascending order.

- **Sorting (Descending)**
  ```plaintext
  SORT field-name DESC
  ```
  Sorts the results by `field-name` in descending order.

- **Multiple Field Sorting**
  ```plaintext
  SORT field1 ASC, field2 DESC
  ```
  Sorts by `field1` in ascending order, then by `field2` in descending order within `field1`.

#### Grouping

- **Basic Grouping**
  ```dataview
  TABLE WITHOUT ID
  FROM "Folder"
  GROUP BY field-name
  ```
  Groups results by `field-name`.

- **Grouping and Counting**
  ```dataview
  TABLE count(rows) AS Total, field-name
  FROM "Folder"
  GROUP BY field-name
  ```
  Groups by `field-name` and counts the number of items in each group.

- **Grouping with Sorting**
  ```dataview
  TABLE WITHOUT ID
  FROM "Folder"
  GROUP BY field-name
  SORT field-name DESC
  ```
  Groups results by `field-name` and sorts the groups in descending order.

#### Notes

- Replace `field-name`, `field1`, `field2` with actual field names from your notes.
- The `FROM "Folder"` part is optional and can be used to specify a particular folder or omitted to search the entire vault.
- `TABLE WITHOUT ID` prevents the display of row IDs in the output, making the table cleaner.

