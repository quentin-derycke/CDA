
# Dictionnaire de données

## Table user
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 user_id | INT AUTO_INCREMENT  | PRIMARY KEY
 user_email | VARCHAR(150)
 user_password | VARCHAR(50)
 user_name | VARCHAR(100)
 user_lastname | VARCHAR(100)
 user_birthdate | DATETIME
 user_signupdate | DATETIME
 | |
 user_phonenumber | VARCHAR(30)
 user_isverified | BOOLEAN
 user_roles | LONGTEXT | | DC2Type:json
 user_vat | DECIMAL(4,2) 
 | |
 user_pro | BOOLEAN
 user_pro_company_name | VARCHAR(50) 
 user_pro_duns | VARCHAR(50) | | DUNS = SIRET international (Data universal number system) 

## Table Supplier
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 supplier_id | INT AUTO_INCREMENT | PRIMARY KEY
 supplier_name | VARCHAR(50)


## Table Category
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 category_id | INT AUTO_INCREMENT | PRIMARY KEY
 category_parent_id | INT | REFERENCES category(category_id)
 category_name | VARCHAR(50)


## Table address
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 address_id | INT AUTO_INCREMENT | PRIMARY KEY
 address_name | VARCHAR(50)
 address_country | VARCHAR(50)
 address_zipcode | VARCHAR(50)
 address_city | VARCHAR(50)
 address_address | VARCHAR(50)



## Table Product
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 product_id | INT AUTO_INCREMENT  | PRIMARY KEY
 product_supplier_id | INT  | REFERENCES supplier(supplier_id)
 product_category_id | INT |  REFERENCES category(category_id)
 product_name | VARCHAR(50) | | Ne pas oublier la brand dans le nom
 product_description | VARCHAR(150)
 product_price | INT
 product_content | VARCHAR(150)
 product_discount | DECIMAL(3,2)
 product_discount_rate | DECIMAL(8,2)
 product_stock_quantity | INT | > 0 
 product_image | VARCHAR(50)
 product_image2 | VARCHAR(50)
 product_image3 | VARCHAR(50)


## Table order
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 order_id | INT AUTO_INCREMENT | PRIMARY KEY
 user_id | INT | REFERENCES user(user_id)
 address_billing_id INT|  REFERENCES address(address_id)
 address_delivery_id INT|  REFERENCES address(address_id)
 order_date | DATETIME
 order_validated | BOOLEAN
 order_shipped | BOOLEAN
 order_billing_date | DATETIME
 order_payment_method | VARCHAR(50)
 order_pay | BOOLEAN

## Table order_details
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 order_details_id | INT AUTO_INCREMENT | PRIMARY KEY
 product_id | INT | REFERENCES product(product_id)
 order_id | INT | REFERENCES order(order_id)
 order_details_quantity | INT
 order_details_unit_price | DOUBLE
 order_optional_discount | DECIMAL(3,2) | | Pour les commerciaux


## Table order_delivery
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 order_delivery_id | INT AUTO_INCREMENT | PRIMARY KEY
 order_id | INT  | REFERENCES order(order_id)
 order_delivery_date | DATETIME
 order_delivery_shipment | DATETIME
  order_delivery_bill| DATETIME

## Table cart
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
cart_id | COUNTER |  AUTO_INCREMENT | PRIMARY KEY
cart_quantity |INT
product_id| INT | REFERENCES product(product_id)
user_id | INT | REFERENCES user(user_id)

## Table live_in
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
user_id | INT | REFERENCES user(user_id)
adress_id | INT | REFERENCES address(address_id)

## Table delivered
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
order_details_id | INT | REFERENCES order_details(order_detail_id)
order_delivery_id |  INT | REFERNCES order_details(order)
order_delivery_quantity | INT 


# MLD
```sql
user = (user_id INT, user_email VARCHAR(150), user_password VARCHAR(50), user_name VARCHAR(100), user_lastname VARCHAR(100), user_birthname DATETIME, user_signindate DATETIME, user_phone_number VARCHAR(30), user_is_verified LOGICAL, user_roles Logntext , user_vat DECIMAL(4,2), user_pro LOGICAL, user_pro_company_name VARCHAR(50), user_pro_duns VARCHAR(50));

supplier = (supplier_id INT, supplier_name VARCHAR(50));

category = (category_id INT, category_name VARCHAR(50), #category__parent_id*);

address = (address_id COUNTER, address_name VARCHAR(50), address_country VARCHAR(50), address_zipcode VARCHAR(50), address_city VARCHAR(50), address_adress VARCHAR(50));

product = (product_id INT, product_name VARCHAR(50), product_description VARCHAR(150), product_reference VARCHAR(50), product_price INT, product_content VARCHAR(150), product_discount DECIMAL(3,2), product_discount_rate DECIMAL(8,2), product_stock_quantity INT, product_image VARCHAR(50), product_image1 VARCHAR(50), product_image2 VARCHAR(50), #category_id*, #supplier_id*);

order = (order_id INT, order_date DATETIME, order_shipped LOGICAL, order_billing_date DATETIME, order_payment_method VARCHAR(50), order_pay LOGICAL, #address_billing_id, #address_delivery_id #user_id);

order_details = (order_details_id INT, order_details_quantity INT, order_details_unit_price VARCHAR(50), order_details_additional_discount DECIMAL(3,2), #order_id, #product_id);

order_delivery = (order_delivery_id INT, order_delivery_date DATETIME, order_delivery_shipment DATETIME, order_delivery_bill DATETIME, #order_id);

cart = (cart_id COUNTER, cart_quantity INT, #product_id, #user_id);

live_in = (#user_id, #address_id);

delivered = (#order_details_id, #order_delivery_id, order_delivery_quantity INT);

```
<img src="MLD.jpg">


# Script SQL
```sql
CREATE TABLE user(
   user_id INT,
   user_email VARCHAR(150) NOT NULL,
   user_password VARCHAR(50),
   user_name VARCHAR(100),
   user_lastname VARCHAR(100),
   user_birthname DATETIME,
   user_signindate DATETIME,
   user_phone_number VARCHAR(30),
   user_is_verified BOOLEAN,
   user_roles LONGTEXT,
   user_vat DECIMAL(4,2),
   user_pro BOOLEAN,
   user_pro_company_name VARCHAR(50),
   user_pro_duns VARCHAR(50),
   PRIMARY KEY(user_id)
);

CREATE TABLE supplier(
   supplier_id INT AUTO_INCREMENT,
   supplier_name VARCHAR(50),
   PRIMARY KEY(supplier_id)
);

CREATE TABLE category(
   category_id INT AUTO_INCREMENT,
   category_name VARCHAR(50),
   category_parent_id INT,
   PRIMARY KEY(category_id),
   FOREIGN KEY(category_parent_id) REFERENCES category(category_id)
);

CREATE TABLE address(
   address_id INT AUTO_INCREMENT,
   address_street VARCHAR(50),
   address_country VARCHAR(50),
   address_zipcode VARCHAR(50),
   address_city VARCHAR(50),
   PRIMARY KEY(address_id)
);

CREATE TABLE product(
   product_id INT AUTO_INCREMENT,
   product_name VARCHAR(50),
   product_description VARCHAR(150),
   product_reference VARCHAR(50),
   product_price INT NOT NULL,
   product_content VARCHAR(150),
   product_discount DECIMAL(3,2),
   product_discount_rate DECIMAL(8,2),
   product_stock_quantity INT,
   product_image VARCHAR(50),
   product_image1 VARCHAR(50),
   product_image2 VARCHAR(50),
   category_id INT,
   supplier_id INT,
   PRIMARY KEY(product_id),
   FOREIGN KEY(category_id) REFERENCES category(category_id),
   FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE order(
   order_id INT AUTO_INCREMENT,
   order_date DATETIME,
   order_shipped BOOLEAN,
   order_billing_date DATETIME,
   order_payment_method VARCHAR(50),
   order_pay BOOLEAN,
   address_delivery_id INT NOT NULL,
   address_billing_id INT NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY(order_id),
   FOREIGN KEY(address_delivery_id) REFERENCES address(address_id),
   FOREIGN KEY(address_billing_id) REFERENCES address(address_id),
   FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE order_details(
   order_details_id INT,
   order_details_quantity INT NOT NULL,
   order_details_unit_price VARCHAR(50),
   order_details_additional_discount DECIMAL(3,2),
   order_id INT NOT NULL,
   product_id INT NOT NULL,
   PRIMARY KEY(order_details_id),
   FOREIGN KEY(order_id) REFERENCES order(order_id),
   FOREIGN KEY(product_id) REFERENCES product(product_id)
);

CREATE TABLE order_delivery(
   order_delivery_id INT,
   order_delivery_date DATETIME,
   order_delivery_shipment DATETIME,
   order_delivery_bill DATETIME,
   order_id INT NOT NULL,
   PRIMARY KEY(order_delivery_id),
   FOREIGN KEY(order_id) REFERENCES order(order_id)
);

CREATE TABLE cart(
   cart_id COUNTER,
   cart_quantity INT,
   product_id INT NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY(cart_id),
   UNIQUE(user_id),
   FOREIGN KEY(product_id) REFERENCES product(product_id),
   FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE live_in(
   user_id INT,
   address_id INT,
   PRIMARY KEY(user_id, address_id),
   FOREIGN KEY(user_id) REFERENCES user(user_id),
   FOREIGN KEY(address_id) REFERENCES address(address_id)
);

CREATE TABLE delivered(
   order_details_id INT,
   order_delivery_id INT,
   order_delivery_quantity INT,
   PRIMARY KEY(order_details_id, order_delivery_id),
   FOREIGN KEY(order_details_id) REFERENCES order_details(order_details_id),
   FOREIGN KEY(order_delivery_id) REFERENCES order_delivery(order_delivery_id)
);
```

# MCD
<img src="Fil_Rouge_MCD.jpg">