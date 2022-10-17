
DROP TRIGGER IF EXISTS  after_orders_insert $$
CREATE TRIGGER after_orders_insert
    AFTER INSERT
    on orders
    FOR EACH ROW
    
BEGIN
        DECLARE id_o int;
        DECLARE id_order_product= new.products.productid;
        DECLARE id_order_supplier = new.suppliers.supplierid;
    
        SET id_o = new.suppliers.supplierid;
        SET  ord = (select);         

            
        IF 
            SIGNAL SQLSTATE '40000' SET MESSAGE_TEXT = " le client et le fournisseur habitent dans le même pays";
        END IF;
END $$ 
DELIMITER ;




SELECT distinct  products.productID, productName, suppliers.supplierID, suppliers.Country, suppliers.companyName, `order details`.OrderID, customers.customerID, customers.companyName, customers.country from suppliers
join products on products.supplierID = suppliers.supplierID
JOIN `order details` on products.productID = `order details`.productID
join orders on `order details`.OrderID = orders.OrderID
JOIN customers on orders.CustomerID = customers.CustomerID
GROUP BY ProductID, productName, OrderID, SupplierID
HAVING suppliers.country = customers.country
