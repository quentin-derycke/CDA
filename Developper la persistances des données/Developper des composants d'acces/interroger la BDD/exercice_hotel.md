# Requête Hôtel

## LOT 1 

1-
```sql
 select hot_nom, hot_ville from hotel; 
```
2-
```sql
select  cli_nom, cli_prenom, cli_ville from client where cli_nom = 'White'
```
3-
```sql
SELECT sta_nom, sta_altitude from station where sta_altitude > 1000; 
```
4-
```sql
SELECT cha_id, cha_capacite from chambre where cha_capacite > 1; 
```
5-
```sql
select cli_nom, cli_ville from client where cli_ville not  LIKE "Londres"
```
6-
```sql
SELECT hot_nom, hot_ville, hot_categorie FROM `hotel` WHERE hot_ville = 'Bretou' and hot_categorie > 3; 
```

## LOT 2
7-
```sql
SELECT  sta_nom, hot_nom, hot_categorie, hot_ville from station
JOIN hotel   where hot_sta_id = sta_id ; 
```
-8
```sql
SELECT hot_nom, hot_categorie, hot_ville, cha_id from hotel join chambre  where hot_id =  cha_hot_id; 
```
-9
```sql
SELECT hot_nom, hot_categorie, hot_ville, cha_id, cha_capacite from hotel join chambre  where cha_capacite > 1 and hot_ville = 'Bretou'
```
-10
```sql
SELECT cli_nom, hot_nom, res_date from client join reservation on cli_id = res_cli_id JOIN chambre on cha_id = res_cha_id join hotel on hot_id = cha_hot_id; 
```
-11
```sql
SELECT sta_nom, hot_nom, cha_id, cha_capacite from chambre join hotel on cha_hot_id = hot_id join station on sta_id = hot_sta_id; 
```
-12
```sql
SELECT cli_nom, hot_nom, res_date_debut, datediff(res_date_fin,res_date_debut) from client join reservation on cli_id = res_cli_id join chambre on cha_id = res_cha_id join hotel on cha_hot_id = cha_id; 
```

## LOT 3 17 - Afficher la durée moyenne des réservations par stati

-13
```sql
SELECT count(hot_id), sta_nom from hotel join station  on sta_id = hot_sta_id group by hot_sta_id
```
-14
```sql
SELECT count(cha_id), sta_nom from chambre join hotel on hot_id = cha_hot_id join station on sta_id = hot_sta_id group by hot_sta_id; 
```
-15
```sql
SELECT count(cha_id), sta_nom from chambre join hotel on hot_id = cha_hot_id join station on sta_id = hot_sta_id where cha_capacite > 1 group by hot_sta_id ; 
```
-16
```sql
SELECT hot_id, hot_nom, cli_nom, cha_id, res_date, res_prix from hotel join chambre on hot_id = cha_hot_id join reservation on cha_id = res_cha_id join client on cli_id = res_cli_id where cli_nom = 'Squire'; 
```
-17
```sql
SELECT sta_nom, sta_id, avg(datediff(res_date_fin,res_date_debut)) from station join hotel on sta_id = hot_sta_id join chambre on hot_id = cha_hot_id join reservation on res_cha_id = cha_id group by sta_id; 
```

