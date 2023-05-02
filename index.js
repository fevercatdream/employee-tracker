const inquirer = require("inquirer");
const mysql = require("mysql2");
const _cTable = require('console.table');

const { 
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment
 } = require("./query");

// main menu function to ask what to do in employee database
async function askQuestion() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
        },
    ]);
    switch (answer.choice) {
        case "View All Employees": {
            console.table(await viewAllEmployees());
            return askQuestion();
        }
        case "Add Employee": {
            console.table(await addEmployee());
            return askQuestion();
        }
        case "Update Employee Role": {
            console.table(await updateEmployeeRole());
            return askQuestion();
        }
        case "View All Roles": {
            console.table(await viewAllRoles());
            return askQuestion();
        }
        case "Add Role": {
            console.table(await addRole());
            return askQuestion();
        }
        case "View All Departments": {
            console.table(await viewAllDepartments());
            return askQuestion();
        }
        case "Add Department": {
            console.table(await addDepartment());
            return askQuestion();
        }
        default: {
            return console.log("Finished");
        }
    }
}

askQuestion();