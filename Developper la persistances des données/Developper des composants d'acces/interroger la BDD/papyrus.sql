# 12. Coder de 2 manières différentes la requête suivante : Lister le nom des fournisseurs susceptibles de livrer au moins un article
-- Active: 1664289946008@@127.0.0.1@3306@papyrus



  
Select   nomfou,numcom, datcom from entcom join fournis on fournis.numfou = entcom.numfou where numcom = '70210';

select  numcom from entcom where numcom = '70210';



