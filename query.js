const util = require("util");
const mysql = require("mysql2");

// connect to database
const db = mysql.createConnection(
    {
        // host
        host: "localhost",
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
const queryAsync = util.promisify(db.query);

// function to view all employees
async function viewAllEmployees() {
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

// function to view all roles
async function viewAllRoles() {
    try {
        const results = await queryAsync(`SELECT employee.id, title, department.name AS department, salary
        FROM employee
        JOIN role
        ON employee.role_id = role.id
        JOIN department
        ON role.department_id = department.id
        ORDER BY employee.id;`);
        return results;
    } catch (err) {
        console.error(err)
    }
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

module.exports.viewAllEmployees = viewAllEmployees;
module.exports.viewAllRoles = viewAllRoles;
module.exports.viewAllDepartments = viewAllDepartments;
