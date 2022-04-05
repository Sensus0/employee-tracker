INSERT INTO department (name)
VALUES
 ('OPERATIONS'), 
 ('MARKETING'), 
 ('IT'), 
 ('DEVELOPMENT');

INSERT INTO role (title, salary, department_id)
VALUES
 ('CEO', 100, 1), 
 ('CFO', 600, 2), 
 ('CDO', 500, 4), 
 ('COO', 200, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('James', 'Blake', 3, NULL), 
 ('Sam', 'Layhe', 2, NULL), 
 ('Greag', 'Powers', 1, NULL), 
 ('John', 'Locke', 4, NULL);

