-- Active: 1664289946008@@127.0.0.1@3306@phpmyadmin
CREATE DATABASE greenvillage;

USE greenvillage;

CREATE TABLE user(
   user_id INT AUTO_INCREMENT,
   user_email VARCHAR(150)  NOT NULL,
   user_password VARCHAR(50) ,
   user_name VARCHAR(100) ,
   user_lastname VARCHAR(100) ,
   user_birthdate DATETIME,
   user_signindate DATETIME,
   user_phone_number VARCHAR(30) ,
   user_is_verified BOOLEAN,
   user_roles TINYINT UNSIGNED,
   user_vat DECIMAL(4,2)  ,
   user_pro BOOLEAN,
   user_pro_company_name VARCHAR(50) ,
   user_pro_duns VARCHAR(50) ,
   PRIMARY KEY(user_id)
);

CREATE TABLE supplier(
   supplier_id INT AUTO_INCREMENT,
   supplier_name VARCHAR(50) ,
   PRIMARY KEY(supplier_id)
);

CREATE TABLE category(
   category_id INT AUTO_INCREMENT,
   category_name VARCHAR(50) ,
   category_parent_id INT,
   PRIMARY KEY(category_id),
   FOREIGN KEY(category_parent_id) REFERENCES category(category_id)
);

CREATE TABLE address(
   address_id INT AUTO_INCREMENT,
   address_street VARCHAR(50) ,
   address_country VARCHAR(50) ,
   address_zipcode VARCHAR(50) ,
   address_city VARCHAR(50) ,
   PRIMARY KEY(address_id)
);

CREATE TABLE cart(
   cart_id INT AUTO_INCREMENT,
   cart_quantity INT,
   cart_user_id INT NOT NULL,
   PRIMARY KEY(cart_id),
   UNIQUE(cart_user_id),
   FOREIGN KEY(cart_user_id) REFERENCES user(user_id)
);

CREATE TABLE product(
   product_id INT AUTO_INCREMENT,
   product_name VARCHAR(50) ,
   product_description VARCHAR(150) ,
   product_reference VARCHAR(50) ,
   product_price INT NOT NULL,
   product_content VARCHAR(150) ,
   product_discount DECIMAL(3,2)  ,
   product_discount_rate DECIMAL(8,2)  ,
   product_stock_quantity INT,
   product_category_id INT,
   product_supplier_id INT,
   PRIMARY KEY(product_id),
   FOREIGN KEY(product_category_id) REFERENCES category(category_id),
   FOREIGN KEY(product_supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE `order`(
   order_id INT AUTO_INCREMENT,
   order_date DATETIME,
   order_shipped BOOLEAN,
   order_billing_date DATETIME,
   order_payment_method VARCHAR(50) ,
   order_pay BOOLEAN,
   order_billing_address_id INT NOT NULL,
   order_delivery_address_id INT NOT NULL,
   order_user_id INT NOT NULL,
   PRIMARY KEY(order_id),
   FOREIGN KEY(order_billing_address_id) REFERENCES address(address_id),
   FOREIGN KEY(order_delivery_address_id) REFERENCES address(address_id),
   FOREIGN KEY(order_user_id) REFERENCES user(user_id)
);

CREATE TABLE order_details(
   order_details_id INT AUTO_INCREMENT,
   order_details_quantity INT NOT NULL,
   order_details_unit_price VARCHAR(50) ,
   order_details_additional_discount DECIMAL(3,2)  ,
   order_details_order_id INT NOT NULL,
   order_details_product_id INT NOT NULL,
   PRIMARY KEY(order_details_id),
   FOREIGN KEY(order_details_order_id) REFERENCES `order`(order_id),
   FOREIGN KEY(order_details_product_id) REFERENCES product(product_id)
);

CREATE TABLE order_delivery(
   order_delivery_id INT AUTO_INCREMENT,
   order_delivery_date DATETIME,
   order_delivery_shipment DATETIME,
   order_delivery_bill DATETIME,
   order_delivery_order_id INT NOT NULL,
   PRIMARY KEY(order_delivery_id),
   FOREIGN KEY(order_delivery_order_id) REFERENCES `order`(order_id)
);

CREATE TABLE image(
   image_id INT AUTO_INCREMENT,
   image_title VARCHAR(150) ,
   image_path VARCHAR(150) ,
   image_product_id INT,
   PRIMARY KEY(image_id),
   FOREIGN KEY(image_product_id) REFERENCES product(product_id)
);

CREATE TABLE live_in(
   live_in_user_id INT,
   live_in_address_id INT,
   PRIMARY KEY(live_in_user_id, live_in_address_id),
   FOREIGN KEY(live_in_user_id) REFERENCES user(user_id),
   FOREIGN KEY(live_in_address_id) REFERENCES address(address_id)
);

CREATE TABLE delivered(
   delivered_order_details_id INT,
   delivered_order_delivery_id INT,
   delivered_order_delivery_quantity INT,
   PRIMARY KEY(delivered_order_details_id, delivered_order_delivery_id),
   FOREIGN KEY(delivered_order_details_id) REFERENCES order_details(order_details_id),
   FOREIGN KEY(delivered_order_delivery_id) REFERENCES order_delivery(order_delivery_id)
);

CREATE TABLE contained(
   contained_product_id INT,
   contained_cart_id INT,
   PRIMARY KEY(contained_product_id, contained_cart_id),
   FOREIGN KEY(contained_product_id) REFERENCES product(product_id),
   FOREIGN KEY(contained_cart_id) REFERENCES cart(cart_id)
);