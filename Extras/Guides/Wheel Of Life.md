---
created: 2024-07-22
updated: 2024-07-22
aliases: 
tags:
  - "#on/charts"
  - "#on/obsidian/plugin/chart"
  - "#on/review"
  - "#on/wheel-of-life"
source:
  - Ali Abdaal's YouTube video "How to Make 2024 The Best Year of Your Life"
  - https://youtu.be/c_DOG_mXz5w?si=2qMLyMDCd1VYOGZM
  - For how to implement it in Obsidian I got it from Mike Smitzh YouTube video "How to Do a Personal Retreat in Obsidian"
  - https://youtu.be/D2VfeT1dsxY?si=G5PDeNN1R58-Zaoa
  - Nick Milo recently brough out a video on the subject as well!
  - https://youtu.be/o9811FmW21A?si=Xu3sZjNriw3_sIWM
summary:
  - This note contains the theory behind the Wheel Of Life and the related code to set it up in Obsidian
  - We use this chart for our reviews.
---




## Code
### Wheel with auto-colours
```chart
type: polarArea
labels: [Soul, Career/Work, Love/Relationships, Health/Fitness, Personal Growth, Fun/Recreation, Social, Finance]
series:
  - title: 
    data: [5, 2, 5, 8, 3, 6, 4, 3]
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


### Wheel where you can specify the colours
```chart
type: polarArea
labels: [Spiritual, Career/Work, Love/Relationships, Health/Fitness, Personal Growth, Fun/Recreation, Social, Finance]
series:
  - title: 
    data: [5, 5, 5, 5, 3, 6, 4, 3]
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)', 
      'rgba(54, 162, 235, 0.2)', 
      'rgba(255, 206, 86, 0.2)', 
      'rgba(75, 192, 192, 0.2)', 
      'rgba(153, 102, 255, 0.2)', 
      'rgba(255, 159, 64, 0.2)', 
      'rgba(199, 199, 199, 0.2)', 
      'rgba(83, 102, 255, 0.2)'
    ]
    borderColor: [
      'rgba(255, 99, 132, 1)', 
      'rgba(54, 162, 235, 1)', 
      'rgba(255, 206, 86, 1)', 
      'rgba(75, 192, 192, 1)', 
      'rgba(153, 102, 255, 1)', 
      'rgba(255, 159, 64, 1)', 
      'rgba(199, 199, 199, 1)', 
      'rgba(83, 102, 255, 1)'
    ]
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


## Categories breakdown

### 1. **Soul (Spiritual)**

- **Focus**: Inner peace, values, and connection with a higher purpose.
- **Activities**: Practices and activities that help you connect with your inner self, spiritual beliefs, and the broader universe.
- **Examples**: Meditation, prayer, yoga, reading spiritual texts, attending religious services, spending time in nature, practicing gratitude.

### 2. **Career/Work**

- **Focus**: Professional development, job satisfaction, and career goals.
- **Activities**: Tasks and activities related to your profession, career advancement, and workplace environment.
- **Examples**: Achieving career milestones, acquiring new skills, job performance, work-life balance, networking, and professional development.

### 3. **Love/Relationships**

- **Focus**: Romantic relationships and close emotional bonds.
- **Activities**: Actions and behaviors that nurture and strengthen intimate and loving relationships.
- **Examples**: Spending quality time with a partner, open communication, romantic gestures, resolving conflicts, and shared activities.

### 4. **Health/Fitness**

- **Focus**: Physical well-being and fitness.
- **Activities**: Exercise, nutrition, and lifestyle choices that promote physical health.
- **Examples**: Regular exercise, balanced diet, routine health check-ups, adequate sleep, and stress management.

### 5. **Personal Growth**

- **Focus**: Self-improvement and personal development.
- **Activities**: Activities that challenge you to grow mentally, emotionally, and intellectually.
- **Examples**: Reading, taking courses, learning new skills, setting personal goals, practicing mindfulness, and self-reflection.

### 6. **Fun/Recreation**

- **Focus**: Personal enjoyment and leisure activities.
- **Activities**: Hobbies and activities done for relaxation and pleasure.
- **Examples**: Playing sports, traveling, engaging in hobbies, watching movies, playing games, and any activities that you find enjoyable and relaxing.

### 7. **Social**

- **Focus**: Interpersonal relationships and social interactions.
- **Activities**: Engaging with friends, family, and community to build and maintain relationships.
- **Examples**: Socializing with friends, attending social events, participating in community activities, joining clubs or groups, and volunteering.

### 8. **Finance**

- **Focus**: Financial stability and management.
- **Activities**: Managing your financial resources, planning for the future, and ensuring economic security.
- **Examples**: Budgeting, saving, investing, managing expenses, financial planning, and debt management.

### Summary

- **Soul (Spiritual)**: Inner peace and spiritual connection.
- **Career/Work**: Professional growth and job satisfaction.
- **Love/Relationships**: Romantic and intimate connections.
- **Health/Fitness**: Physical well-being and fitness.
- **Personal Growth**: Self-improvement and development.
- **Fun/Recreation**: Leisure activities for personal enjoyment.
- **Social**: Building and maintaining interpersonal relationships.
- **Finance**: Financial management and stability.