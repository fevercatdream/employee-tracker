USE employee_db;

INSERT INTO department (name)
VALUES
    ("Engineering"),
    ("Finance")
    ("Legal")
    ("Sales");

INSERT INTO role (title, department, salary)
VALUES
    ("Sales Lead", "Sales", 100000),
    ("Salesperson", "Sales", 80000)
    ("Lead Engineer", "Engineering", 150000)
    ("Software Engineer", "Engineering", 120000)
    ("Account Manager", "Finance", 160000)
    ("Accountant", "Finance", 125000)
    ("Legal Team Lead", "Legal", 250000)
    ("Lawyer", "Legal", 190000);

INSERT INTO employee (first_name, last_name, role, manager)
VALUES
    ("John", "Doe", "Sales Lead"),
    ("Mike", "Chan", "Salesperson", "John Doe")
    ("Ashley", "Rodriguez", "Lead Engineer")
    ("Kevin", "Tupik", "Software Engineer", "Ashley Rodriguez")
    ("Kunal", "Singh", "Account Manager")
    ("Malia", "Brown", "Accountant", "Kunal Singh")
    ("Sarah", "Lourd", "Legal Team Lead")
    ("Tom", "Allen", "Lawyer", "Sarah Lourd");