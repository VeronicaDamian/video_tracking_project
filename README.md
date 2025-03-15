## Client Video Tracking Tool

A lightweight tool designed for tracking client videos.

No authentication system – The tool is meant to be used without user accounts.

Single-user application – Designed for personal use only.

### User Stories

- As a user, I want to see graphics, so I can see my work performance over different periods of time.
  - The app should generate visual reports (bar charts, line graphs, or pie charts) based on tracked data.
  - Users should be able to filter data by day, week, month, or custom time frames.
- As a user, I want to be able to use the app without an account.

  - The system will not require authentication (no login, signup, or user profiles).
  - All data will be stored locally in a json file.
  - The focus is on a seamless experience, allowing instant access without setup.

- As a user, I want to see the navigation bar with the following sections: payment calculator, projects, performance, time tracking.
  - The navigation bar should be persistent and accessible from all screens.
  - Each section should be clearly labeled and easy to switch between.
  - The UI should remain simple and responsive, ensuring smooth transitions between sections.

### Section Descriptions

1. Payment Calculator

A simple calculator to determine earnings based on the video length and per-second rate.

Features:

- Input fields for video length (seconds) and rate per second ($)
- Auto-calculation of total earnings per project
- Option to apply different rates for different clients
- Send calculated earnings data to the Performance section for financial tracking

2. Projects

A structured table for managing and tracking all ongoing and completed projects.

Features:

- Table with the following columns:
  - Project Name _(string)_
  - Client Name _(object field)_
  - Status (Not Started / In Progress / Done) _(enum)_
  - Video Length (seconds) _(int)_
- **\*[Optional]** video upload feature that auto-extracts metadata (length, file name, etc.), reducing manual input\*
- Edit/update project details directly in the table
- Quick filters (e.g., show only "In Progress" projects)

3.  Time Tracking

A work session tracker that logs active editing time.

Features:

- Clock-in / Clock-out button to start and stop work sessions
- Auto-log the total time spent per session
- Option to manually adjust session times (if needed)
- Store all tracked time data and send it to the Performance section for reporting

4.  Performance

A dashboard with interactive graphs and statistics to monitor work progress and earnings.

Features:

- Graphs displaying:
  - Total seconds edited over a selected time interval (1 day, 7 days, 1 month, custom)
  - Total earnings over different periods
  - Total hours worked based on time-tracking logs
- Filters for custom date ranges
- Clear visual trends to optimize workflow, income and payments management

---

- export/import feature
- login pe baza de pin ca la 24pay - un cont salvat in local storage, pin cu numele meu,
  user salvez cu toate datele pe care le dau export si importa, ca la visual studio, parola
  pot sa o criptez ca sa nu apara codul ala, numai eu sa stiu sa decriptez.
- **video project management**
