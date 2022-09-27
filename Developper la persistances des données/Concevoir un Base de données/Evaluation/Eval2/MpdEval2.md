


# Mld textuel
```sql
Client = (N_Client INT, NomClient VARCHAR(50), PrenomClient VARCHAR(50));
Commande = (N_Commande INT, MontantCommande CURRENCY, DateCommande DATETIME, #N_Client);
Article = (N_Article INT, DesignationArticle VARCHAR(50), PUarticle VARCHAR(50));
SeComposeDe = (#N_Commande, #N_Article, Qte INT, TauxTVA DECIMAL(15,2));


```


# Script Sql

```sql
CREATE TABLE Client(
   N_Client INT,
   NomClient VARCHAR(50),
   PrenomClient VARCHAR(50),
   PRIMARY KEY(N_Client)
);

CREATE TABLE Commande(
   N_Commande INT,
   MontantCommande CURRENCY,
   DateCommande DATETIME,
   N_Client INT NOT NULL,
   PRIMARY KEY(N_Commande),
   FOREIGN KEY(N_Client) REFERENCES Client(N_Client)
);

CREATE TABLE Article(
   N_Article INT,
   DesignationArticle VARCHAR(50),
   PUarticle VARCHAR(50),
   PRIMARY KEY(N_Article)
);

CREATE TABLE SeComposeDe(
   N_Commande INT,
   N_Article INT,
   Qte INT,
   TauxTVA DECIMAL(15,2),
   PRIMARY KEY(N_Commande, N_Article),
   FOREIGN KEY(N_Commande) REFERENCES Commande(N_Commande),
   FOREIGN KEY(N_Article) REFERENCES Article(N_Article)
);

```