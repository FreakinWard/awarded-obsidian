---
created: 2024-08-21
updated: 2024-08-21
alias:
tags: 
summary: How to get a heatmap calendar!
---

All of this is better explained in [[Prakash Joshi Pax]]'s YouTube video [Contribution Graph: The Easiest Way to Track Habits in Obsidian](https://youtu.be/qZg-sunWu5E?si=Gigeyn3UnUTt1xJC).

## Steps

- 1. Download the [[Contribution Map Community Plugin]]
- 2. Go to note where you want to add graph > CMD + P (to open command palette) > type "contribution map"
- 3. Go through the steps!

## Graph 1

```contributionGraph
title: Sleep Hours
graphType: default
dateRangeValue: 1
dateRangeType: LATEST_YEAR
startOfWeek: 0
showCellRuleIndicators: true
titleStyle:
  textAlign: left
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: '"Journal/01 Daily"'
  dateField:
    type: FILE_NAME
  countField:
    type: PAGE_PROPERTY
    value: log-sleep-hours
fillTheScreen: false
enableMainContainerShadow: false
cellStyleRules:
  - id: default_b
    color: "#ff0000ff"
    min: "0.01"
    max: "4"
  - id: default_c
    color: "#ff9b39ff"
    min: "4"
    max: 5
  - id: default_d
    color: "#60e985ff"
    min: "6"
    max: "7"
  - id: default_e
    color: "#216e39"
    min: "7"
    max: "24"
cellStyle:
  borderRadius: ""

```


## Graph 2

```contributionGraph
title: Sleep Hours Tracker
graphType: month-track
dateRangeValue: 12
dateRangeType: LATEST_MONTH
startOfWeek: 0
showCellRuleIndicators: true
titleStyle:
  textAlign: left
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField:
    type: FILE_NAME
  countField:
    type: PAGE_PROPERTY
    value: log-sleep-hours
fillTheScreen: false
enableMainContainerShadow: false
cellStyleRules:
  - id: default_b
    color: "#ff0000ff"
    min: "0.01"
    max: "4"
  - id: default_c
    color: "#ffaa3cff"
    min: "4"
    max: "6"
  - id: default_d
    color: "#93ff6cff"
    min: "6"
    max: "7"
  - id: default_e
    color: "#216e39"
    min: "7"
    max: "24"

```


## Graph 3

```contributionGraph
title: Log Day Rating
graphType: default
dateRangeValue: 180
dateRangeType: LATEST_DAYS
startOfWeek: 0
showCellRuleIndicators: true
titleStyle:
  textAlign: left
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField:
    type: FILE_NAME
  countField:
    type: PAGE_PROPERTY
    value: log-day-rating
fillTheScreen: false
enableMainContainerShadow: false
cellStyleRules:
  - id: default_b
    color: "#ff0000ff"
    min: "-2"
    max: "-1"
  - id: default_c
    color: "#ffa412ff"
    min: "-1"
    max: "-0.01"
  - id: 1724334262238
    min: ""
    max: ""
    color: "#63aa8200"
    text: ""
  - id: default_d
    color: "#71ff9aff"
    min: "0.01"
    max: "1.01"
  - id: default_e
    color: "#216e39"
    min: "1.01"
    max: "2.01"

```
