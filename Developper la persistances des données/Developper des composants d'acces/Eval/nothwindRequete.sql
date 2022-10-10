
/* 1 - Liste des contacts français : */
SELECT
    CompanyName AS société,
    ContactName AS Contact,
    contactTitle AS Fonction,
    phone AS téléphone
FROM
    customers
WHERE
    country LIKE "France";

    /* 2 - Produits vendus par le fournisseur « Exotic Liquids » : */
SELECT
    ProductName AS Produit,
    UnitPrice AS Prix
FROM
    products
JOIN suppliers ON Products.SupplierID = suppliers.SupplierID
WHERE
    CompanyName LIKE "Exotic Liquids";

    /* 3 - Nombre de produits vendus par les fournisseurs Français dans l’ordre décroissant */
SELECT
    CompanyName AS Fournisseur,
    Quantity AS Nbreproduits
FROM
    suppliers
JOIN products ON products.SupplierID = suppliers.SupplierID
JOIN `order details` ON products.ProductID = `order details`.ProductID
WHERE
    suppliers.Country LIKE "france"
ORDER BY
    quantity
DESC
    ;

    /* 4 - Liste des clients Français ayant plus de 10 commandes */
SELECT
    CompanyName,
    COUNT(OrderID) AS NbresProduits
FROM
    customers
JOIN orders ON customers.CustomerID = orders.CustomerId
WHERE
    country LIKE "France"
GROUP BY
    CompanyName
HAVING
    NbresProduits > 10;

/* 5 - Liste des clients ayant un chiffre d’affaires > 30.000 */ 

SELECT
    
    CompanyName AS CLIENT,
    SUM(
        (UnitPrice * Quantity) - Discount
    ) AS CA, Country AS Pays
FROM
    customers
JOIN orders ON orders.CustomerID = customers.CustomerID
JOIN `order details` ON `order details`.OrderID = orders.OrderID
GROUP BY
    CompanyName, Country
HAVING
    CA > 30000
ORDER BY
    CA
DESC
    ;

/* 6 – Liste des pays dont les clients ont passé commande de produits fournis par « Exotic
Liquids » : */ 

SELECT
   ShipCountry as Pays
FROM
    orders

JOIN `order details` on `order details`.OrderId = orders.OrderID
JOIN products on `order details`.ProductID = products.ProductID
JOIN suppliers on products.SupplierID = suppliers.SupplierID
WHERE
    CompanyName LIKE "Exotic Liquids";


  SELECT
    ProductName AS Produit,
    UnitPrice AS Prix
FROM
    products
JOIN suppliers ON products.SupplierID = suppliers.SupplierID
WHERE
    CompanyName LIKE "Exotic Liquids";


/*  Pas terminé */


/* 7 – Montant des ventes 1997 */

