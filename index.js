const inquirer = require("inquirer");
const mysql = require("mysql2");

// main menu function to ask what to do in employee database
async function askQuestion() {
    const answer = await inquirer.createPromptModule([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "View All Departments", "Add Department"],
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

// function to view all employees
function viewAllEmployees() {

}

// function to add an employee
function addEmployee() {

}

// function to update an employee role
function updateEmployeeRole() {

}

// function to view all roles
function viewAllRoles() {

}

// function to view all departments
function viewAllDepartments() {

}

// function to add a department
function addDepartment() {

}