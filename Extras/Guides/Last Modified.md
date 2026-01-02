```dataview 
TABLE dateformat(file.mtime, "yyyy-MM-dd") AS "Last modified", dateformat(file.mtime, " HH:mm") AS "time" FROM "" SORT file.mtime DESC LIMIT 100 
```