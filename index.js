const inquirer = require("inquirer");
const mysql = require("mysql2");

const { viewAllEmployees } = require("./query");
const { viewAllRoles } = require("./query");
const { viewAllDepartments } = require("./query");

// main menu function to ask what to do in employee database
async function askQuestion() {
    const answer = await inquirer.createPromptModule([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
        },
    ]);
    switch (answer.choice) {
        case "View All Employees": {
            return await viewAllEmployees();
        }
        case "Add Employee": {
            return await addEmployee();
        }
        case "Update Employee Role": {
            return await updateEmployeeRole();
        }
        case "View All Roles": {
            return await viewAllRoles();
        }
        case "Add Role": {
            return await addRole();
        }
        case "View All Departments": {
            return await viewAllDepartments();
        }
        case "Add Department": {
            return await addDepartment();
        }
        default: {
            return console.log("Finished");
        }
    }
}

// function to add an employee
async function addEmployee() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name? ",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the employee's last name? ",
            name: "lastName",
        },
        {
            type: "list",
            message: "What is the employee's role? ",
            name: "role",
            choices: [/*TODO: list of roles*/],
        },
        {
            type: "list",
            message: "Who is the employee's manager? ",
            name: "manager",
            choices: [/*TODO: list of managers, include None if has no manager*/],
        },
    ]);
    // TODO: add role to role table in employee database
    return askQuestion();
}

// function to update an employee role
async function updateEmployeeRole() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which employee's role do you want to update? ",
            name: "updateEmployee",
            choices: [/*TODO: list of employees*/],
        },
        {
            type: "list",
            message: "Which role do you want to assign the selected employee? ",
            name: "updateRole",
            choices: [/*TODO: list of roles*/],
        },
    ]);
}

// function to add a role
async function addRole() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role? ",
            name: "roleName",
        },
        {
            type: "input",
            message: "What is the salary of the role? ",
            name: "salary",
        },
        {
            type: "list",
            message: "Which department does the role belong to? ",
            name: "departments",
            choices: [/*TODO: list of departments*/],
        },
    ]);
    // TODO: add role to role table in employee database
    return askQuestion();
}

// function to add a department
async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department? ",
            name: "deptName",
        },
    ]);
    // TODO: add department to department table in employee database
    return askQuestion();
}