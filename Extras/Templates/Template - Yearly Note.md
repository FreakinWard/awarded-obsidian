---
date: <% moment(tp.file.title,'YYYY').startOf('year').add(0, 'days').format("YYYY-MM-DD") %>
tags:
  - "#type/yearly-note"
---

---
```calendar-nav
```
---

## Year

> [! picture]- Pictures
> <%* 
let year = tp.file.title; // Assuming the title is just the year like 'YYYY'
let start_of_year = moment(year, 'YYYY').startOf('year');
let end_of_year = moment(year, 'YYYY').endOf('year'); 
let days_in_year = end_of_year.diff(start_of_year, 'days') + 1;
tR += Array(days_in_year).fill(null).map((x, i) => `> ![[${start_of_year.clone().add(i, 'days').format("YYYY-MM-DD[]#YYYY-MM-DD")}]]`).join("\n") + '\n';
%>


> [! highlight]- Stand-out Days
> ```dataview
TABLE aliases
WHERE aliases != null
AND length(aliases) >= 1
AND date >= date(<% moment(tp.file.title,'YYYY').startOf('year').add(0, 'days').format("YYYY-MM-DD") %>)
AND date <= date(<% moment(tp.file.title,'YYYY').startOf('year').add(1, 'years').add(-1, 'days').format("YYYY-MM-DD") %>)

> [! highlight]- Highlights!
>```dataview
TASK 
FROM ""
WHERE contains(text, "#log/highlight") 
AND date >= date(<% moment(tp.file.title,'YYYY').startOf('year').add(0, 'days').format("YYYY-MM-DD") %>)
AND date <= date(<% moment(tp.file.title,'YYYY').startOf('year').add(1, 'years').add(-1, 'days').format("YYYY-MM-DD") %>)
GROUP BY file.name AS filename
SORT filename ASC



> [! Calendar]-  Monthly Reviews
>```dataview
TASK
WHERE contains(text, "#log/month-review")
AND date >= date(<% moment(tp.file.title,'YYYY').startOf('year').add(0, 'days').format("YYYY-MM-DD") %>)
AND date <= date(<% moment(tp.file.title,'YYYY').startOf('year').add(1, 'years').add(-1, 'days').format("YYYY-MM-DD") %>)
GROUP BY file.name AS filename
SORT filename ASC

---
-  [ ] #log/year-review 


---
## Wheel Of Life

```chart
type: polarArea
labels: [Spiritual, Career/Work, Love/Relationships, Health/Fitness, Personal Growth, Fun/Recreation, Social, Finance]
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


 - [.] **Soul**: 5 #log/yearly-soul
	- Meditation, prayer, yoga, reading spiritual texts, attending religious services, spending time in nature, practicing gratitude.

- [.] **Career/Work**: 5 #log/yearly-career 
	- Achieving career milestones, acquiring new skills, job performance, work-life balance, networking, and professional development.

- [.] **Love/Relationships**: 5 #log/yearly-relationships
	- Spending quality time with a partner, open communication, romantic gestures, resolving conflicts, and shared activities.

- [.] **Health/Fitness**: 5 #log/yearly-health
	- Regular exercise, balanced diet, routine health check-ups, adequate sleep, and stress management.

- [.] **Personal Growth**: 5 #log/yearly-personal-growth 
	- Reading, taking courses, learning new skills, setting personal goals, practicing mindfulness, and self-reflection.

- [.] **Fun/Recreation**: 5 #log/yearly-fun 
	- Playing sports, traveling, engaging in hobbies, watching movies, playing games, and any activities that you find enjoyable and relaxing.

- [.] **Social**: 5 #log/yearly-social 
	- Socializing with friends, attending social events, participating in community activities, joining clubs or groups, and volunteering.

- [.] **Finance**: 5 #log/yearly-finance 
	- Budgeting, saving, investing, managing expenses, financial planning, and debt management.

---
## Statistics
### Calendar Graph
```tracker
searchType: frontmatter
searchTarget: log-day-rating, log-sleep-rating, log-sleep-hours, log-healthy-eating
datasetName: Day-Rating, Sleep-Rating, Sleep-Hours, Healthy-Eating
month:
	startWeekOn: 'Sun'
	threshold: 0.99, 0.99, 7.51, 0.99
	color: green
	initMonth: <% moment(tp.file.title,'YYYY').format('YYYY-MM') %>
	circleColorByValue: true
	todayRingColor: white
	selectedRingColor: white
```

### Averages
```tracker
searchType: frontmatter
searchTarget: log-day-rating, log-sleep-rating, log-sleep-hours, log-healthy-eating
datasetName: log-day-rating, log-sleep-rating, log-sleep-hours, log-healthy-eating
startDate: <% moment(tp.file.title,'YYYY').startOf('year').add(0, 'days').format("YYYY-MM-DD") %>
endDate: <% moment(tp.file.title,'YYYY').startOf('year').add(1, 'year').add(-1, 'days').format("YYYY-MM-DD") %>
summary:
	template: 
		" - Average Day Rating:  {{average()}}
		\n - Average sleep rating: {{average(dataset(1))}}
		\n - Average sleep hours: {{average(dataset(2))}}
		\n - Average Healthy Food Rating: {{average(dataset(3))}}"

```

