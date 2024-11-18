---
type: moc
---


```meta-bind-button
label: New Person
hidden: false
class: ""
tooltip: "Capture a new person"
id: ""
style: primary
actions:
  - type: templaterCreateNote
    templateFile: Extras/Templates/Template, Person.md
    folderPath: Extras/People
    fileName: Enter Name Here
    openNote: true

```
 
```meta-bind-button
label: New Person Note
hidden: false
class: ""
tooltip: Capture a note about a person or a meeting you've had with them
id: ""
style: primary
actions:
  - type: templaterCreateNote
    templateFile: Extras/Templates/Template, People.md
    folderPath: /
    fileName: Enter Name Here
    openNote: true
    openIfAlreadyExists: true

```

# People MOC
A personal CRM. People Notes are about jotting down notable information about people and linking people back to [[🗣 Meetings MOC]].

These are the different categories of People Notes:
- Work
- Personal
- Creative
- Fictional
- Notable

---
### Templates
- [[Template, Person]]
- [[Template, 1-on-1]]

# People
```dataview
TABLE relationship, role as "Role"
FROM "Extras/People" and -#MOC
SORT file.name asc
```