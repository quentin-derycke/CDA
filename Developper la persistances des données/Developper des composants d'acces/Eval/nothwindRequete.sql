
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
    customers.Country AS Pays
FROM
    customers
JOIN orders ON customers.CustomerId = orders.CustomerId
JOIN `order details` AS od ON orders.OrderID = od.OrderID
JOIN products ON products.ProductId = od.ProductId
JOIN suppliers ON suppliers.SupplierId = products.SupplierId
WHERE
    suppliers.CompanyName = "Exotic Liquids"
GROUP BY
    customers.Country
ORDER BY
    customers.Country ASC;


/* 7 – Montant des ventes 1997 */
SELECT
    SUM(unitprice * quantity) AS "Montant de vente de '1997' """
FROM
    `order details` AS od
JOIN orders ON od.OrderID = orders.OrderID
WHERE
    YEAR(orderdate) = "1997";





/*8 – Montant des ventes de 1997 mois par mois :*/
SELECT
    MONTH(orderdate) AS Mois 97,
    SUM(unitprice * quantity) AS Montant de ventes
FROM
    `order details` AS od
JOIN orders ON od.OrderID = orders.OrderID
WHERE
    YEAR(orderdate) = "1997"
GROUP BY
    MONTH(orderdate);

/* 9 – Depuis quelle date le client « Du monde entier » n’a plus commandé ?*/

SELECT
    MAX(OrderDate) AS Date de dernière commande
FROM
    orders
JOIN customers ON orders.CustomerID = customers.CustomerID
WHERE
    CompanyName LIKE 'Du monde entier';




/*10 – Quel est le délai moyen de livraison en jours ?*/
SELECT
    ROUND(
        AVG(
            DATEDIFF(ShippedDate, orderdate)
        )
    ) AS Délai moyen de livraison en jours
FROM
    orders;