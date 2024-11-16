---
type: moc
---


tags:: #MOC

# Meetings MOC
Meetings are timestamped events with other people, where information is exchanged and collected. Meeting notes are intrinsically ephemeral. They're stored in a separate Space from other Umami notes (`Timestamps/Meetings`) and rarely reviewed. If the information in a meeting needs to be accessed later, it should be moved into a more evergreen note in the Umami folder. 

**Template:** [[Template, Meeting Note]]

```meta-bind-button
label: New Meeting
hidden: false
class: ""
tooltip: ""
id: ""
style: primary
actions:
  - type: templaterCreateNote
    templateFile: Extras/Templates/Template, Meeting Note.md
    folderPath: Timestamps/Meetings
    fileName: meeting-topic
    openNote: true

```

---

## Meeting Notes

```dataviewjs
customJS.AwardedTables.mocMeetings(dv);
```