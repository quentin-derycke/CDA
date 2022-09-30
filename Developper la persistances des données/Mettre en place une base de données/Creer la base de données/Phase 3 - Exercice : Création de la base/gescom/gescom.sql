
CREATE TABLE Products(
   pro_id_cat INT NOT NULL,
   pro_ref VARCHAR(50)NOT NULL,
   pro_name varchar(200) NOT NULL,
   pro_desc text(1000)NOT NULL,
   pro_price DECIMAL(6,2)NOT NULL,
   pro_stock smallint(4),
   pro_color VARCHAR(50),
  pro_picture varchar(40),
   pro_add_date DATETIME NOT NULL,
   pro_update_date DATETIME NOT NULL,
   pro_publish tinyint(1) NOT NULL,
   PRIMARY KEY(pro_id)
);

CREATE TABLE orders(
   order_id VARCHAR(50) NOT NULL,
   order_pro_id VARCHAR(50)NOT NULL,
   ord_cust_id INT NOT NULL,
   ord_order_date date NOT NULL, 
   ord_ship_date DATETIME,
   ord_bill_date DATETIME,
   ord_reception_date DATETIME,
   ord_status VARCHAR(50),
   PRIMARY KEY(order_id, order_pro_id, ord_cust_id)
);


CREATE TABLE details(
   det_id INT NOT NUll,
   det_price VARCHAR(200) NOT NUll,
   det_quantity INT(5) NOT NUll,
  
);

CREATE TABLE category(
   cat_id INT,
   cat_parent_id INT,
   cat_name VARCHAR(200),
  
   pro_id VARCHAR(50) NOT NULL,
   PRIMARY KEY(cat_id, cat_sub_id),
   FOREIGN KEY( pro_id) REFERENCES Products(, pro_id)
);


CREATE TABLE Customers(
   cus_id INT NOT NULL,
   cus_lastname VARCHAR(50) NOT NULL,
   cus_firstname VARCHAR(50)NOT NULL,
   cust_countries_id INT NOT NULL,
   cus_adress VARCHAR(50) NOT NULL,
   cus_zipcode VARCHAR(50) NOT NULL,
   cus_city VARCHAR(50) NOT NULL,
   cust_phone INT ,
   cust_mail VARCHAR(50),

   order_id VARCHAR(50) NOT NULL,
   order_pro_id VARCHAR(50) NOT NULL,
   ord_cust_id INT NOT NULL,
   PRIMARY KEY(cus_id_order, cus_id, cust_countries_id),
   FOREIGN KEY(order_id, order_pro_id, ord_cust_id) REFERENCES orders(order_id, order_pro_id, ord_cust_id)
);



CREATE TABLE suppliers(
   sup_id INT,
   sup_lastname VARCHAR(50),
   sup_firstname VARCHAR(50),
   sup_address VARCHAR(150) NOT NULL,
   sup_phone VARCHAR(10) NOT NULL,
   sup_mail VARCHAR(255),

   PRIMARY KEY  (sup_id),
  
);