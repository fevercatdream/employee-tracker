# employee-tracker

## Description

Build a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

### User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This application uses [Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4) for collecting input from the user, and [MySQL2](https://www.npmjs.com/package/mysql2) to connect to your MySQL database, and [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. The application will be invoked by using the following command:

```
node index.js
```

## Usage

A content management system (CMS) to manage a company's employee database.

### Screencastify Demo



## Credits

Tutor: Doug Kumagai:
<br />
https://www.linkedin.com/in/doug-kumagai/
<br />
https://github.com/ndesmic
<br />

mdn web docs: https://developer.mozilla.org/en-US/

Inquirer.js: https://www.npmjs.com/package/inquirer/v/8.2.4

MySQL2: https://www.npmjs.com/package/mysql2

console.table: https://www.npmjs.com/package/console.table

Markdown License badges: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba

shields.io: https://shields.io/

Screencastify: Create, Share, and Assess: https://www.youtube.com/watch?v=CX-XvngtsZw&ab_channel=Screencastify

Video Submission Guide: https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide

Taylor Orsini: for recommending to use console.table package

## License

Please refer to the LICENSE in the repo.

---

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

