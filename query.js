// function to view all employees
function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee AS manager
    ON employee.manager_id = manager.id
    ORDER BY employee.id;`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}

// function to view all roles
function viewAllRoles() {
    db.query(`SELECT employee.id, title, department.name AS department, salary
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    ORDER BY employee.id;`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}

// function to view all departments
function viewAllDepartments() {
    db.query(`SELECT department.id, department.name AS department
    FROM department
    ORDER BY department.id;`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}