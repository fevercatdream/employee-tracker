const util = require("util");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect to database
const db = mysql.createConnection(
    {
        // localhost
        host: "127.0.0.1",
        // mysql username
        user: "root",
        // mysql password
        password: "password",
        // database
        database: "employee_db",
    },
    console.log("Connected to the employee_db database")
);

// converting a db.query to a promise returning aka async function
const queryAsync = util.promisify(db.query.bind(db));

// function to view all employees
async function viewAllEmployees() {
    // console.log(db.config, "CONFIG");
    try {
        const results = await queryAsync(`SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        JOIN role
        ON employee.role_id = role.id
        JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee AS manager
        ON employee.manager_id = manager.id
        ORDER BY employee.id;`);
        return results;
    } catch (err) {
        console.error(err)
    }
}

// as a callback function
// function viewAllEmployees(callback) {
//     db.query(`SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department,salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
//     FROM employee
//     JOIN role
//     ON employee.role_id = role.id
//     JOIN department
//     ON role.department_id = department.id
//     LEFT JOIN employee AS manager
//     ON employee.manager_id = manager.id
//     ORDER BY employee.id;`, (err, results) => {
//         if(err){
//             return console.log(err)
//         } 
//         callback(results);
//     });
// }

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
    // TODO: update employee role in employee table in employee database
    return askQuestion();
}

// function to view all roles
async function viewAllRoles() {
    try {
        const results = await queryAsync(`SELECT role.id, title, department.name AS department, salary
        FROM role
        JOIN department
        ON role.department_id = department.id
        ORDER BY role.id;`);
        return results;
    } catch (err) {
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
            name: "departments",
            // async function mapped to department name
            choices: [(await viewAllDepartments()).map(department => department.name)],
        },
    ]);
    // TODO: add role to role table in employee database
    return askQuestion();
}

// function to view all departments
async function viewAllDepartments() {
    try {
        const results = await queryAsync(`SELECT department.id, department.name AS department
        FROM department
        ORDER BY department.id;`);
        return results;

    } catch (err) {
        console.error(err)
    }
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

module.exports.viewAllEmployees = viewAllEmployees;
module.exports.addEmployee = addEmployee;
module.exports.updateEmployeeRole = updateEmployeeRole;
module.exports.viewAllRoles = viewAllRoles;
module.exports.addRole = addRole;
module.exports.viewAllDepartments = viewAllDepartments;
module.exports.addDepartment = addDepartment;
