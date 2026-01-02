---
date: <% moment(tp.file.title,'YYYY-[W]ww').startOf('week').add(0, 'days').format("YYYY-MM-DD") %>
tags:
  - "#type/weekly-note"
---
---
```calendar-nav
```
---

## Weekly Prep

## Week
<%*
let start_of_week = moment(tp.file.title, 'YYYY-[W]WW').startOf('week');
let days_in_week = 7;
tR += `> [! picture]- Pictures\n`;
tR += Array(days_in_week).fill(null).map((x, i) => `> ![[${moment(start_of_week).add(i, 'd').format('YYYY-MM-DD[]#YYYY-MM-DD')}]]`).join("\n") + '\n';
%>

> [! highlight]- Highlights!
>```dataview
TASK 
FROM ""
WHERE icontains(text, "#log/highlight") 
AND (date <= (date(this.date) + dur(6 days))) and (date >= (date(this.date)))
GROUP BY file.name as filename

> [! Calendar]-  Daily Reviews
>```dataview
 TASK 
 WHERE icontains(text, "#log/day-review") 
 AND (date <= (date(this.date) + dur(6 days))) and (date >= (date(this.date)))
 GROUP BY file.name as filename
 SORT filename ASC

---
-  [ ] #log/week-review 


---
## Wheel Of Life

```chart
type: polarArea
labels: [Soul, Career/Work, Love/Relationships, Health/Fitness, Personal Growth, Fun/Recreation, Social, Finance]
series:
  - title: 
    data: [5, 5, 5, 5, 5, 5, 5, 5]
tension: 0.2
width: 88%
labelColors: true
fill: true
beginAtZero: true
rMax: 10
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
legendPosition: right
```

 - [.] **Soul**: 5 #log/weekly-soul
	- Meditation, prayer, yoga, reading spiritual texts, attending religious services, spending time in nature, practicing gratitude.

- [.] **Career/Work**: 5 #log/weekly-career 
	- Achieving career milestones, acquiring new skills, job performance, work-life balance, networking, and professional development.

- [.] **Love/Relationships**: 5 #log/weekly-relationships
	- Spending quality time with a partner, open communication, romantic gestures, resolving conflicts, and shared activities.

- [.] **Health/Fitness**: 5 #log/weekly-health
	- Regular exercise, balanced diet, routine health check-ups, adequate sleep, and stress management.

- [.] **Personal Growth**: 5 #log/weekly-personal-growth 
	- Reading, taking courses, learning new skills, setting personal goals, practicing mindfulness, and self-reflection.

- [.] **Fun/Recreation**: 5 #log/weekly-fun 
	- Playing sports, traveling, engaging in hobbies, watching movies, playing games, and any activities that you find enjoyable and relaxing.

- [.] **Social**: 5 #log/weekly-social 
	- Socializing with friends, attending social events, participating in community activities, joining clubs or groups, and volunteering.

- [.] **Finance**: 5 #log/weekly-finance 
	- Budgeting, saving, investing, managing expenses, financial planning, and debt management.

---
## Statistics
### Calendar Graph

```tracker
searchType: frontmatter
searchTarget: log-day-rating, log-sleep-rating, log-sleep-hours, log-healthy-eating
datasetName: Day-Rating, Sleep-Rating, Sleep-Hours, Healthy-eating
startDate: <% moment(tp.file.title,'YYYY-[W]ww').startOf('month').add(0, 'days').format("YYYY-MM-DD") %>
endDate: <% moment(tp.file.title,'YYYY-[W]ww').startOf('month').add(1, 'months').add(-1, 'days').format("YYYY-MM-DD") %>
month:
	startWeekOn: 'Sun'
	threshold: 0.99, 0.99, 7.51, 0.99
	color: green
	initMonth: <% moment(tp.file.title,'YYYY-[W]ww').format('YYYY-MM') %>
	circleColorByValue: true
	todayRingColor: white
	selectedRingColor: white
```

### Averages
```tracker
searchType: frontmatter
searchTarget: log-day-rating, log-sleep-rating, log-sleep-hours, log-healthy-eating
datasetName: log-day-rating, log-sleep-rating, log-sleep-hours, log-healthy-eating
startDate: <% moment(tp.file.title,'YYYY-[W]ww').startOf('week').add(0, 'days').format("YYYY-MM-DD") %>
endDate: <% moment(tp.file.title,'YYYY-[W]ww').startOf('week').add(6, 'days').format("YYYY-MM-DD") %>
summary:
	template: 
		" - Average Day Rating:  {{average()}}
		\n - Average sleep rating: {{average(dataset(1))}}
		\n - Average sleep hours: {{average(dataset(2))}}
		\n - Average Healthy Food Rating: {{average(dataset(3))}}"

```

