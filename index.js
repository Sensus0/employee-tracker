const inquirer = require('inquirer');
const path = require('path');
const mysql = require('mysql2');
const table = require('console.table')

//key to enter the database 
const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'employee_tracker'
    },
);

connection.connect( (err) => {
    if(err) throw err;
    menuOptions();
}) 

function menuOptions() {
    inquirer.prompt({
            type: "list",
            message: "What would you like to do?",
            name: "choice", 
            choices: ['View All Roles', 'View All Employees', 'View All Departments', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Finished']
        })
        .then(answers => {
            console.log(answers)
            if(answers.choice === 'View all roles') {
                viewRoles();
            } else if (answers.choice === 'View All Employees') {
                viewEmployee();
            } else if (answers.choice === 'View All Departments') {
                viewDepartments();
            } else if (answers.choice === 'Add A Department') {
                addDepartment();
            } else if (answers.choice === 'Add A Role') {
                addRole();
            } else if (answers.choice === 'Add An Employees') {
                addEmployee();
            } else if (answers.choice === 'Update An Employee Role') {
                updateEmployee();
            
            } else {
                console.log('Finished')
            }
            
        })
}

function viewDepartments() {
    connection.query('SELECT * FROM department;', (err, results) => {
        if(err) throw err;  
        console.table(results);
        menuOptions();
    })
}

function viewRoles() {
    connection.query('SELECT * FROM role;', (err, results) => {
        if(err) throw err;  
        console.table(results);
        menuOptions();
    })
}

function viewEmployee() {
    connection.query('SELECT * FROM employee;', (err, results) => {
        if(err) throw err;  
        console.table(results);
        menuOptions();
    })
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department you want to add?'
    })
    .then(answers => {
        connection.execute('INSERT INTO department(name) VALUE (?);', answers.addDepartment, (err, results) => {
            if(err) throw err;
            menuOptions();
        })
    })
}

function addRole() {
    inquirer.prompt({
        type: 'input',
        name: 'addRole',
        message: 'What is the name of the role you want to add?'
    })
    .then(answers => {
        connection.execute('INSERT INTO role(salary, department_id, title) VALUE (?);', answers.addRole, (err, results) => {
            if(err) throw err;
            menuOptions();
        })
    }) 
}

function addEmployee() {
    inquirer.prompt({
        type: 'input',
        name: 'addEmployee',
        message: 'What is the name of the employee you want to add?'
    })
    .then(answers => {
        connection.execute('INSERT INTO emmployee(first_name, last_name, role_id, manager_id) VALUE (?);', answers.addEmployee, (err, results) => {
            if(err) throw err;
            menuOptions();
        })
    })
}

function updateEmployee() {
    var updateEmployeeId;
    var updateEmployeeField; 

    inquirer.prompt({
        type: 'input',
        name: 'updateEmployee',
        message: 'What employee would you like to update?',
    })
    .then(answers => {
        updateEmployeeId = answers.updateEmployee
        return inquirer.prompt({
            type: 'list',
            name: 'updateField',
            message: 'what field would you like to update?',
            choices: [
                {name: 'First Name', value: 'first_name'},
                {name: 'Last Name', value: 'last_name'},
                {name: 'Manager Id', value: 'manager_id'},
                {name: 'Role Id', value: 'role_id'},
            ]
        })
    })
    .then(answers => {
        updateEmployeeField = answers.updateField
        return inquirer.prompt({
            type: 'input',
            name: 'newEmployeeValue',
            message: 'The employee value has been updated'
        })
    })
    .then (answers => {
        connection.execute('UPDATE employee SET '+updateEmployeeField+'="'+answers.newEmployeeValue+'" WHERE id='+updateEmployeeId+';', (err, results) => {
            if(err) throw err;
            console.log(results)
            menuOptions();
        })
    })
}

