```sql

Create table station (
station_num int auto_increment primary key,
station_nom varchar(50)
 );

Create table hotel (
hotel_num int auto_increment primary key,
hotel_cat varchar(50),
hotel_cap varchar(50),
hotel_adress varchar(50),
hotel_station varchar(50)
 );

  
Create table chambre (
chambre_num int auto_increment primary key,
chambre_hotel_num int,
chambre_expo varchar(50),
chambre_type varchar(50),
chambre_confort varchar(50),
 FOREIGN KEY(chambre_hotel_num) REFERENCES hotel(hotel_num)
 );
 
 Create table client (
client_num int auto_increment primary key,
client_nom varchar(50),
client_prenom varchar(50),
client_adresse varchar(50)
 );
Create table reservation (
reservation_date datetime,
reservation_debut  datetime,
 reservation_fin datetime,
reservation_prixTTC varchar(50),
reservation_ahhres varchar(50),

reservation_num_chambre  int REFERENCES  chambre(chambre_num),
reservation_num_client int REFERENCES  Client(client_num)

 );
 ```