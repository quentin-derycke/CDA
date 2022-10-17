-- Active: 1664289946008@@127.0.0.1@3306@northwind
/*  Codez deux procédures stockées correspondant aux requêtes 9 et 10. Les procédures stockées doivent prendre en compte les éventuels paramètres. */

DELIMITER |
Create procedure DateDerCom()
Begin
SELECT
    MAX(OrderDate) AS Date de dernière commande
FROM
    orders
JOIN customers ON orders.CustomerID = customers.CustomerID
WHERE
    CompanyName LIKE 'Du monde entier';
END |
Delimiter ;

CAll `DateDerCom`;


/*10 – Quel est le délai moyen de livraison en jours ?*/

DELIMITER |
Create procedure orders.Delivjrs()
BEGIN
SELECT
    ROUND(
        AVG(
            DATEDIFF(ShippedDate, orderdate)
        )
    ) AS Délai moyen de livraison en jours
FROM
    orders;
END |
Delimiter ;


Call Delivjrs;

/* fonctionne sur PHP my Admin  */ 