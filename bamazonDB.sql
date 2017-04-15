create database bamazonDB;

use bamazonDB;

create table products (
	item_id integer(11) auto_increment not null,
	product_name varchar(100) not null, 
    department_name varchar(100) not null,
    price integer(11),
    stock_quantity integer(11),
    primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
	values
    ('stratocaster', 'musical instruments', 800, 5),
	('television', 'electronics', 400, 10),
    ('smart phone', 'electronics', 500, 20),
    ('tires', 'automotive', 175, 12),
    ('tent', 'outdoors', 250, 8),
    ('drumkit', 'musical instruments', 900, 3),
    ('skillet', 'cookware', 75, 15),
    ('pizza', 'frozen', 4, 50),
    ('lamp', 'furniture', 40, 20),
    ('sofa', 'furniture', 400, 5);
    
select * from products;

    