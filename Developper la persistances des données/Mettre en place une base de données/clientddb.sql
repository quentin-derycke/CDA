CREATE DATABASE IF NOT EXISTS gestcom;
USE gestcom;

CREATE TABLE IF NOT EXISTS Client(
    cli_num INT (11) NOT NULL AUTO_INCREMENT,
    cli_nom VARCHAR(50),
    cli_adresse VARCHAR(50),
    cli_tel VARCHAR(30),
    PRIMARY KEY (cli_num)
);

CREATE TABLE IF NOT EXISTS Produit(
    pro_num INT(11) NOT NULL AUTO_INCREMENT,
    pro_libelle VARCHAR(50),
    pro_desription VARCHAR(255),
    PRIMARY KEY (pro_num)
);

CREATE TABLE IF NOT EXISTS Commande (
    com_num INT(11) NOT NULL AUTO_INCREMENT,
    cli_num INT(11) NOT NULL,
    com_date timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    com_obs VARCHAR(50),
    PRIMARY KEY (com_num),
    FOREIGN KEY (cli_num) REFERENCES Client (cli_num)
);

CREATE TABLE IF NOT EXISTS est_compose(
    est_com_num INT(11) NOT NULL AUTO_INCREMENT,
    com_num INT(11) NOT NULL,
    pro_num INT(11) NOT NULL,
    est_qte int(11) NOT NULL,
    PRIMARY KEY (est_com_num),
    FOREIGN KEY (com_num) REFERENCES Commande (com_num),
    FOREIGN KEY (pro_num) REFERENCES Produit (pro_num)
);

CREATE INDEX cli_index ON Client (cli_nom);