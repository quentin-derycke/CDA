-- Active: 1664289946008@@127.0.0.1@3306@papyrus

CREATE VIEW  hotel_sta_list
AS

select hot_nom, sta_nom from hotel join station on hotel.hot_sta_id = station.sta_id ; 
 select * from  hotel_stat_list; 

CREATE VIEW  chambre_hotel
AS
 select cha_id, hot_nom from hotel join chambre on hot_id = cha_hot_id;
 select * from chambre_hotel;



create view  resa_cli_nom as
select res_cli_id, res_date, cli_nom from reservation join client on res_cli_id = cli_id; 

select * from resa_cli_nom;

create view chambre_list_sta_hotel  as 
select hot_nom, sta_nom, cha_id from hotel join chambre on hot_id = cha_hot_id  join station on sta_id =  hot_sta_id   ;



/* papyrus*/
create view V_GlobalCde as  
SELECT  produit.codart, sum(qtecde) as Qtetot, sum(priuni) as PrixTot  from ligcom join produit on produit.codart = ligcom.codart group by codart

SELECT * from V_GlobalCde; 


select * from produit join vente on produit.codart = vente.codart where vente.codart = 'I100';

/* v_VentesI100 correspondant à la requête : Afficher les ventes dont le code produit est le I100 (affichage de toutes les colonnes de la table Vente). */