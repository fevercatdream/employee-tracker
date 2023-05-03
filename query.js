const util = require("util");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const {
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    addRole,
    addDepartment,
} = require("./index");

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

// function query to insert an employee into the database
// TODO: need to return bool
async function insertEmployee(first_name, last_name, role, manager) {
    try {
        const results = await queryAsync(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ( ?, ?, ?, ?);`, [first_name, last_name, role, manager]);
        return results;
    } catch (err) {
        console.error(err)
    }
}

// function query to update an employee's role in the database
// TODO: need to return bool
async function updateEmployeeRoleQuery(update_role, update_employee) {
    try {
        const results = await queryAsync(`UPDATE employee
        SET role_id = ?
        WHERE CONCAT(employee.first_name, " ", employee.last_name) = ?;`, [update_role, update_employee]);
        return results;
    } catch (err) {
        console.error(err)
    }
}

// function query to update an employee's manager in the database
// TODO: need to return bool
async function updateEmployeeManagerQuery(assign_manager, choose_emp) {
    try {
        const results = await queryAsync(`UPDATE employee
        SET manager_id = ?
        WHERE CONCAT(employee.first_name, " ", employee.last_name) = ?;`, [assign_manager, choose_emp]);
        return results;
    } catch (err) {
        console.error(err)
    }    
}

// function query to view employees by manager
// TODO: need to return bool, need to show employees under manager
async function viewEmployeesByManagerQuery(manager) {
    // console.log(db.config, "CONFIG");
    try {
        const results = await queryAsync(`SELECT CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.first_name, employee.last_name, title, department.name AS department, salary
        FROM employee
        JOIN role
        ON employee.role_id = role.id
        JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee AS manager
        ON employee.manager_id = manager.id
        WHERE CONCAT(manager.first_name, " ", manager.last_name) = ?;`, [manager]);
        return results;
    } catch (err) {
        console.error(err)
    }
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

// function query to insert a role into the database
// TODO: need to return bool
async function insertRole(role, dept, salary) {
    try {
        const results = await queryAsync(`INSERT INTO role (title, department_id, salary)
        VALUES
            (?, ?, ?);`, [role, dept, salary]);
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

// function query to insert a department into the database
// TODO: need to return bool
async function insertDepartment(dept_name) {
    try {
        const results = await queryAsync(`INSERT INTO department (name)
        VALUES
            (?);`, [dept_name]);
        return results;
    } catch (err) {
        console.error(err)
    }    
}

module.exports.viewAllEmployees = viewAllEmployees;
module.exports.insertEmployee = insertEmployee;
module.exports.updateEmployeeRoleQuery = updateEmployeeRoleQuery;
module.exports.updateEmployeeManagerQuery = updateEmployeeManagerQuery;
module.exports.viewEmployeesByManagerQuery = viewEmployeesByManagerQuery;
module.exports.viewAllRoles = viewAllRoles;
module.exports.insertRole = insertRole;
module.exports.viewAllDepartments = viewAllDepartments;
module.exports.insertDepartment = insertDepartment;
