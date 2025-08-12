USE bcvwxrmap9ixcuvnnxf9;

CREATE TABLE customers(
customer_id INT PRIMARY KEY AUTO_INCREMENT,
full_name VARCHAR(100) NOT NULL,
email VARCHAR(100) DEFAULT NULL,
phone VARCHAR (40) DEFAULT NULL,
adress VARCHAR(100) DEFAULT NULL,
number_id VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE platforms(
	platform_id INT PRIMARY KEY AUTO_INCREMENT,
    platform_name VARCHAR(50) NULL
);


CREATE TABLE invoices(
	invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    invoiced_amount DECIMAL(10,2) NOT NULL,
    status_ ENUM('Completada', 'Pendiente', 'Fallida') DEFAULT NULL,
    number_invoice VARCHAR (100) NOT NULL,
    type_ VARCHAR(100) NOT NULL,
    FOREIGN KEY  (customer_id) REFERENCES customers (customer_id) 
);

CREATE TABLE transactions(
	transaction_id VARCHAR(50) PRIMARY KEY,
    invoice_id INT NOT NULL,
    platform_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    amount_pay DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices (invoice_id),
    FOREIGN KEY (platform_id) REFERENCES platforms (platform_id) 
);


-- SELECT * FROM customers;
-- SELECT * FROM platforms;
-- SELECT * FROM invoices;
-- SELECT * FROM transactions;