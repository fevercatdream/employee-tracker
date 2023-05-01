-- To correctly seed database
-- run commands in the following order:
-- SOURCE schema.sql
-- SOURCE seeds-department.sql
-- SOURCE seeds-role.sql
-- SOURCE seeds-employee.sql

USE employee_db;

INSERT INTO department (name)
VALUES
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");
