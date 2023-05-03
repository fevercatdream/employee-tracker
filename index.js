const inquirer = require("inquirer");
const mysql = require("mysql2");
const _cTable = require('console.table');

const { 
    viewAllEmployees,
    insertEmployee,
    updateEmployeeRoleQuery,
    updateEmployeeManagerQuery,
    viewEmployeesByManager,
    viewAllRoles,
    insertRole,
    viewAllDepartments,
    insertDepartment,
 } = require("./query");

// main menu function to ask what to do in employee database
async function askQuestion() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "Update Employee Manager", "View Employees By Manager","View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
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
        case "Update Employee Manager": {
            console.table(await updateEmployeeManager());
            return askQuestion();
        }
        case "View Employees By Manager": {
            console.table(await viewEmployeesByManager());
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
            // async function mapped to role title
            choices: [(await viewAllRoles()).map(role => role.title)],
        },
        {
            type: "list",
            message: "Who is the employee's manager? ",
            name: "manager",
            // async function mapped to employee name
            choices: [`None`, ...(await viewAllEmployees()).map(employee => `${employee.first_name} ${employee.last_name}`)],
        },
    ]);
    if (insertEmployee(answer.firstName, answer.lastName, answer.role, answer.manager)) {
        console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
    } else {
        console.error(err)
    }

}

// function to update an employee role
async function updateEmployeeRole() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which employee's role do you want to update? ",
            name: "updateEmployee",
            // async function mapped to employee name
            choices: [(await viewAllEmployees()).map(employee => `${employee.first_name} ${employee.last_name}`)],
        },
        {
            type: "list",
            message: "Which role do you want to assign the selected employee? ",
            name: "updateRole",
            // async function mapped to role title
            choices: [(await viewAllRoles()).map(role => role.title)],
        },
    ]);
    if (updateEmployeeRoleQuery(answer.updateRole, answer.updateEmployee)) {
        console.log(`Updated employee's role`);
    } else {
        console.error(err)
    }
}

// function to update an employee's manager
async function updateEmployeeManager() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "On which employee do you want to update the manager? ",
            name: "chooseEmployee",
            // async function mapped to employee name
            choices: [(await viewAllEmployees()).map(employee => `${employee.first_name} ${employee.last_name}`)],
        },
        {
            type: "list",
            message: "Which employee do you want to assign as manager to the selected employee? ",
            name: "assignManager",
            // async function mapped to employee name
            choices: [(await viewAllEmployees()).map(manager => `${employee.first_name} ${employee.last_name}`)],
        },
    ]);
    if (updateEmployeeManagerQuery(answer.assignManager, answer.chooseEmployee)) {
        console.log(`Updated employee's manager`);
    } else {
        console.error(err)
    }    
}

// function to view employees by manager
async function viewEmployeesByManager() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "Select employee to see who they manage? ",
            name: "chooseEmployee",
            // async function mapped to employee name
            choices: [(await viewAllEmployees()).map(employee => `${employee.first_name} ${employee.last_name}`)],
        },
    ]);
    if (viewEmployeesByManagerQuery(answer.chooseEmployee)) {
        console.log(`Employees by Manager`);
    } else {
        console.error(err)
    }    
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
            name: "department",
            // async function mapped to department name
            choices: [(await viewAllDepartments()).map(department => department.name)],
        },
    ]);
    if (insertRole(answer.roleName, answer.department, answer.salary)) {
        console.log(`Added ${role.title} to the database`);
    } else {
        console.error(err)
    };
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
    if (insertDepartment(answer.deptName)) {
        console.log(`Added ${department.name} to the database`);
    } else {
        console.error(err)
    };
}

askQuestion();

module.exports.addEmployee = addEmployee;
module.exports.updateEmployeeRole = updateEmployeeRole;
module.exports.updateEmployeeManager = updateEmployeeManager;
module.exports.viewEmployeesByManager = viewEmployeesByManager;
module.exports.addRole = addRole;
module.exports.addDepartment = addDepartment;