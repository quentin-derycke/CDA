-- Active: 1664289946008@@127.0.0.1@3306@hotel

CREATE VIEW 
AS

select hot_nom, sta_nom from hotel join station on hotel.hot_sta_id = station.sta_id ; 
 select * from  hotel_stat_list; 


 