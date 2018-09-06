-- DROP DATABASE IF EXISTS bamazon_DB;
-- SET PASSWORD FOR 'root'@'localhost' =''
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("laptop","electronics",350,100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("shirt","clothing",90,100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("iPadPro","electronics",200,30);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Aveeno Baby","Baby Care",10,300);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Tide Detergent","Household",8,150);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("What have you done","Books",5,25);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("The rule of one","Books",9,32);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Cascade Dish Washer","Household",6,400);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Crest White","Household",3,120);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Garcinia Cambogia","Weight Loss",10,250);

SELECT * FROM products;
