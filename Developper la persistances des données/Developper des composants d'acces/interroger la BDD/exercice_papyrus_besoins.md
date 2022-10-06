# Papyrus les besoins : 

1. Quelles sont les commandes du fournisseur 09120 ?

```sql
select  * from entcom where  numfou = '09120';
```

2. Afficher le code des fournisseurs pour lesquels des commandes ont été passées.

```sql
select   numfou from entcom ;
```

3. Afficher le nombre de commandes fournisseurs passées, et le nombre de fournisseur concernés.

```sql
select   count(numfou), count(numcom) from entcom ;
```

4. Editer les produits ayant un stock inférieur ou égal au stock d'alerte et dont la quantité annuelle est inférieur est inférieure à 1000 (informations à fournir : n° produit, libellé produit, stock, stock actuel d'alerte, quantité annuelle).

```sql
update   produit set  ;
```
 editer ? afficher ? 

5. Quels sont les fournisseurs situés dans les départements 75 78 92 77 ? L’affichage (département, nom fournisseur) sera effectué par département décroissant, puis par ordre alphabétique.

```sql
select nomfou, numfou, posfou from fournis where posfou LIKE '75%' or posfou like '78%' or posfou like '92%' or posfou like '77%' order by posfou DESC, nomfou ASC; 
 ``` 
6. Quelles sont les commandes passées au mois de mars et avril ?

7. Quelles sont les commandes du jour qui ont des observations particulières ? (Affichage numéro de commande, date de commande)


```sql
select   numcom, obscom, datcom  from entcom  where obscom  not like "";
```

8. Lister le total de chaque commande par total décroissant (Affichage numéro de commande et total)

```sql
select numcom, sum(qtecde*priuni) as `total` from ligcom group by numcom order by `total` desc; 
```

9. Lister les commandes dont le total est supérieur à 10 000€ ; on exclura dans le calcul du total les articles commandés en quantité supérieure ou égale à 1000. (Affichage numéro de commande et total).
-- Avec sous-requête :
select * from (
SELECT numcom, SUM(qtecde) as qte, sum(qtecde * priuni) AS Total FROM ligcom
GROUP BY numcom
) AS calc
WHERE qte < 1000 AND Total > 10000
ORDER BY Total DESC;

-- Avec la clause HAVING :
SELECT numcom, SUM(qtecde * priuni) AS total
FROM ligcom
GROUP BY numcom
HAVING SUM(qtecde) < 1000 AND total > 10000;

10. Lister les commandes par nom fournisseur (Afficher le nom du fournisseur, le numéro de commande et la date) 

```sql
SELECT
    nomfou,
    numcom,
    datcom
FROM
    entcom
JOIN fournis ON fournis.numfou = entcom.numfou
GROUP BY
    numcom
```

11. Sortir les produits des commandes ayant le mot "urgent' en observation? (Afficher le numéro de commande, le nom du fournisseur, le libellé du produit et le sous total = quantité commandée * Prix unitaire)

```sql
SELECT
    nomfou,
    entcom.numcom,
    datcom
FROM
    entcom
JOIN fournis ON fournis.numfou = entcom.numfou
JOIN ligcom ON entcom.numcom = ligcom.numcom
JOIN produit ON ligcom.codart = produit.codart
WHERE
    obscom LIKE '%urgent%'
GROUP BY
    numcom

```
12. Coder de 2 manières différentes la requête suivante : Lister le nom des fournisseurs susceptibles de livrer au moins un article

select nomfou, qteliv from produit where 


13. Coder de 2 manières différentes la requête suivante Lister les commandes (Numéro et date) dont le fournisseur est celui de la commande 70210 :

14. Dans les articles susceptibles d’être vendus, lister les articles moins chers (basés sur Prix1) que le moins cher des rubans (article dont le premier caractère commence par R). On affichera le libellé de l’article et prix1

15. Editer la liste des fournisseurs susceptibles de livrer les produits  dont le stock est inférieur ou égal à 150 % du stock d'alerte. La liste est triée par produit puis fournisseur

16. Éditer la liste des fournisseurs susceptibles de livrer les produit dont  le stock est inférieur ou égal à 150 % du stock d'alerte et un délai de  livraison d'au plus 30 jours. La liste est triée par fournisseur puis produit

17. Avec le même type de sélection que ci-dessus, sortir un total des stocks par fournisseur trié par total décroissant

18. En fin d'année, sortir la liste des produits dont la quantité réellement commandée dépasse 90% de la quantité annuelle prévue.

19. Calculer le chiffre d'affaire par fournisseur pour l'année 93 sachant que les prix indiqués sont hors taxes et que le taux de TVA est 20%.

20. Existe-t-il des lignes de commande non cohérentes avec les produits vendus par les fournisseurs. ?