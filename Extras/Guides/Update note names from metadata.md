---
created: 2024-10-24
updated: 2024-10-24
alias:
tags: 
summary: Update note names based off of metadata properties.
---

## YouTube Video
- Link: https://youtu.be/A3y25LB2450

<iframe width="560" height="315" src="https://www.youtube.com/embed/A3y25LB2450?si=PADmN7qbE9WxVsoj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## The Problem

Manually creating notes, naming them, and then adding metadata can be inefficient. The current process involves:

- Creating a new note.
- Naming the note manually.
- Adding metadata properties manually.

This leads to duplication of effort, wasted time, and an increased risk of manual errors.

## The Solution

The goal is to streamline this process by allowing the following workflow:

1. Create a new note.
2. Fill in the metadata properties.
3. Automatically generate the note name based on the metadata provided.

### Benefits

- **Eliminates Double Work**: No need to name the note manually after filling in the metadata.
- **Time-Saving**: The automation speeds up the process of note creation.
- **Reduces Manual Errors**: Avoids mistakes that may happen when manually naming notes.
- **Efficient Future Updates**: If metadata changes, updating the note name is quick and automatic.

### Use Cases

1. **People Notes**:
    
    - **Metadata Fields**:
        - First Name
        - Last Name
        - (Optional) Middle Name
    - **Action**: Use a templater script to generate the note name from these metadata fields, e.g., "Last Name, First Name."
2. **Meeting Notes**:
    
    - **Metadata Fields**:
        - Created Date
        - Participants
    - **Output**:
        - The note name is automatically formatted using the created date and participants.
        - Example final note name: `2024-10-24 Meeting with (Alice, Bob)`



## Templates used

- [[Meeting Note Renaming Script]]
- [[People Note Renaming Script]]
	- Assuming that your people note has the following metadata fields
		- `first-name`
		- `last-name`


