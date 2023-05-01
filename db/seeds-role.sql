-- To correctly seed database
-- run commands in the following order:
-- SOURCE schema.sql
-- SOURCE seeds-department.sql
-- SOURCE seeds-role.sql
-- SOURCE seeds-employee.sql

USE employee_db;

INSERT INTO role (title, department_id, salary)
VALUES
    ("Sales Lead", 4, 100000),
    ("Salesperson", 4, 80000),
    ("Lead Engineer", 1, 150000),
    ("Software Engineer", 1, 120000),
    ("Account Manager", 2, 160000),
    ("Accountant", 2, 125000),
    ("Legal Team Lead", 3, 250000),
    ("Lawyer", 3, 190000);
    