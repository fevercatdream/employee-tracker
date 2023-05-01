// function to view all employees
function viewAllEmployees() {
    db.query(`SELECT id, first_name, last_name, title, department, salary, manager
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id;`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}