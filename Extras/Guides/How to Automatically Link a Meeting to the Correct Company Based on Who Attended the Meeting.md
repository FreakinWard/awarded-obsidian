---
	created: 2024-10-22
updated: 2024-10-22
alias:
tags: 
summary: This is a walkthrough on how to use dataview to pull in meetings to a specific company based on who attended the meeting!
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/WXP0zAcSc6o?si=ZwLsTSs0AYUQ_3bS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## The Problem

![[How to Automatically Link a Meeting to the Correct Company Based on Who Attended the Meeting 2024-10-22 19.24.16.excalidraw]]

You’ve just had a meeting with Alice, who works for Company A. You want to create a meeting note in Obsidian, but you don’t want to manually add “Company A” to the meeting note every time.

Here’s what you want to happen instead:

1. In Alice’s personal note, you’ve already added a metadata property called "company," which says she works for Company A.
2. When you create a meeting note and add Alice as a participant, you want Obsidian to automatically link that meeting to Company A without you needing to add Company A manually in the meeting note.
3. In your "Company A" note, you want a list of all meetings where someone from Company A (like Alice) participated to show up automatically.

In short, you're using the fact that Alice is linked to Company A to make Obsidian automatically track meetings for that company. So, no need to duplicate information—just add Alice as a participant in the meeting note, and Obsidian will take care of linking it to Company A.


## The example pages we use

- The pages we use to explain
	- [[Company A]]
	- [[Alice]]
	- [[Bob]]
	- [[2024-10-22 Meeting with Alice and Alice is from Company A]]


## The dataview query that does the magic

The dataview query that works (only on the specific company page - see it in action at the top of [[Company A]])

### Updated to remove duplicates

```dataview
table
  max(rows.created) as "Created",
  join(unique(rows.participants), ", ") as "Participants",
  join(unique(rows.participantLinks.company), ", ") as "Companies"
FLATTEN participants as participantLinks
WHERE contains(tags, "#type/meeting")
AND contains(participants.company, this.file.link)
GROUP BY file.link
SORT max(rows.created) ASC
```

### Old but simpler dataview query
```dataview
table created, participants, participant.company
FLATTEN participants as participant
where contains(participant.company, this.file.link)
AND contains(tags, "#type/meeting")
```


## Important Limitations to Consider

While this setup is useful, there are a few important things to keep in mind:

1. **If a person changes companies, past meetings won't show up anymore**:
    
    - If Alice moves from Company A to Company B, any meetings linked to her will stop appearing on Company A’s page. This is because the Dataview query is based on Alice’s current "company" field in her personal note.
    - You’ll have to decide whether you:
        - **(a)** Keep the "company" associated with her page even after she leaves the company (which could get confusing), or
        - **(b)** Create a separate metadata field like "past associated companies" to track her previous employers and update your Dataview query to account for both current and past companies.
2. **Handling multiple companies**:
    
    - If Alice works for more than one company and is listed as a participant, the meeting will be linked to both companies’ pages. This could create confusion since the same meeting will appear under different companies.
    - You’ll need to think about whether this is acceptable or if you want to refine your solution to handle this situation more carefully.
3. **If a person is associated with only one company**:
    
    - If each person will always only have one company, this setup works perfectly as it stands. You won’t run into the issues of multiple companies or tracking historical associations.
4. **It shows multiple meetings when two people are there from the same company**:

	- If Alice and Bob both work for the same company, and they are in the same meeting, there will be two instances of the meeting in the Company MOC.