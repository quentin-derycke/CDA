# Dictionnaire de données

## Table User
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 user_id | INT AUTO_INCREMENT | PRIMARY KEY
 user_email | VARCHAR (150)
 user_password | VARCHAR(50)
 user_name | VARCHAR(100)
 user_lastname | VARCHAR(100)
 user_birthdate | DATETIME
 user_signindate | DATETIME
 | |
 user_country | LONGTEXT | | DC2Type:json
 user_adress | VARCHAR (150)
 user_zipcode | VARCHAR (150)
 | |
 user_delivery_country | LONGTEXT | | DC2Type:json
 user_delivery_adress | VARCHAR (150)
 user_delivery_zipcode | VARCHAR (150)
 | |
 user_phonenumber | VARCHAR (30)
 user_isverified | BOOLEAN
 user_roles | LONGTEXT | | DC2Type:json
 | |
 user_pro | BOOLEAN
 ++ raison sociale, SIRET, .....


## Table Supplier
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 supplier_id | INT AUTO_INCREMENT | PRIMARY KEY
 supplier_order_id |   INT REFERENCES supplier(supplier_id)


## Table Product
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 product_id | INT AUTO_INCREMENT | PRIMARY KEY
 product_supplier_id |   INT REFERENCES supplier(supplier_id)
 product_category_id |   INT REFERENCES category(category_id)
 product_name | VARCHAR(50)
 product_description | VARCHAR(150)
 product_price | INT
 product_content | VARCHAR (150)
 product_discount | DECIMAL (3,2)
 product_discount_price | DECIMAL (8,2)
 product_stock_quantity | INT | > 0 


## Table Category
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 category_id | INT AUTO_INCREMENT | PRIMARY KEY
 category_subcategory_id |   INT REFERENCES category(category_id)
 category_name | VARCHAR(50)



## Table Cart
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 cart_id | INT AUTO_INCREMENT | PRIMARY KEY
 user_id | INT REFERENCES user(user_id)
 user_order_id | INT REFERENCES orderdetails(orderdetails_id)
 category_name | VARCHAR(50)
 cart_validated | BOOLEAN
 order_date | DATETIME
 shipped | BOOLEAN
 shipment_date | DATETIME

## Table Order details
Codification | Type | Contraintes | Règles
---------|----------| ----------- | -----
 orderdetails_id | INT AUTO_INCREMENT | PRIMARY KEY
 product_id | INT REFERENCES product(product_id)
 cart_id | INT REFERENCES cart(cart_id)
 orderdetails_quantity | INT
 order_details_total | DOUBLE
 order_additional_discount | DECIMAL (3,2) | | Pour les commerciaux
