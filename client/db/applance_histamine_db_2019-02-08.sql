# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: uvdb35.active24.cz (MySQL 5.5.5-10.1.37-MariaDB-0+deb9u1)
# Database: applance_histamine_db
# Generation Time: 2019-02-08 17:32:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Food
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Food`;

CREATE TABLE `Food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `histamineLevel` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `histamineLevel` (`histamineLevel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `Food` WRITE;
/*!40000 ALTER TABLE `Food` DISABLE KEYS */;

INSERT INTO `Food` (`id`, `name`, `histamineLevel`, `description`)
VALUES
	(1,'wurst',2,'Wursts the best'),
	(2,'apple',4,'This is an apple , pen apple pen'),
	(3,'banana',2,'Big banana'),
	(4,'vajíčko kuracie',3,'Celé vajíčko'),
	(5,'vajíčko - bielok',3,'Bielok'),
	(6,'vajíčko - žlítok',1,'Žĺtok'),
	(7,'vajíčko kačacie',1,'Celé vajíčko');

/*!40000 ALTER TABLE `Food` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table HistamineLevel
# ------------------------------------------------------------

DROP TABLE IF EXISTS `HistamineLevel`;

CREATE TABLE `HistamineLevel` (
  `value` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `HistamineLevel` WRITE;
/*!40000 ALTER TABLE `HistamineLevel` DISABLE KEYS */;

INSERT INTO `HistamineLevel` (`value`, `name`, `description`)
VALUES
	(1,'dobre tolerované','pri bežnom užívaní žiadne predpokladané symptómy'),
	(2,'stredne kompatibilné','mierne symptómy, občasná kombinácia v malých množstvách je často tolerovná'),
	(3,'nevhodné','viditeľné symptómy pri bežnom príjme'),
	(4,'veľmi zlé','mnohé symptómy');

/*!40000 ALTER TABLE `HistamineLevel` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Picture
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Picture`;

CREATE TABLE `Picture` (
  `id` varchar(20) NOT NULL,
  `filename` varchar(255) NOT NULL DEFAULT '',
  `mimetype` varchar(255) NOT NULL DEFAULT '',
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IdUnique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Picture` WRITE;
/*!40000 ALTER TABLE `Picture` DISABLE KEYS */;

INSERT INTO `Picture` (`id`, `filename`, `mimetype`, `path`)
VALUES
	('-ZgsNhuGa','9fdbf585d17c95f7a31ccacdb6466af9.jpeg','image/jpeg','images/-ZgsNhuGa'),
	('5IOmpwh2U','9fdbf585d17c95f7a31ccacdb6466af9.jpeg','image/jpeg','images/5IOmpwh2U'),
	('6bDNupMV_','download.jpeg','image/jpeg','images/6bDNupMV_'),
	('bi-SvKERx','9fdbf585d17c95f7a31ccacdb6466af9.jpeg','image/jpeg','images/bi-SvKERx'),
	('DZUSS5zns','9fdbf585d17c95f7a31ccacdb6466af9.jpeg','image/jpeg','images/DZUSS5zns'),
	('kGJxHdw9T','9fdbf585d17c95f7a31ccacdb6466af9.jpeg','image/jpeg','images/kGJxHdw9T'),
	('Mp75Wwi7g','pexels-photo-46710.jpeg','image/jpeg','images/Mp75Wwi7g'),
	('Pq6nWrxHD','pexels-photo-46710.jpeg','image/jpeg','images/Pq6nWrxHD'),
	('W-BHmKTMx','9fdbf585d17c95f7a31ccacdb6466af9.jpeg','image/jpeg','images/W-BHmKTMx'),
	('y12ljion-','blog-featured-diabetes-20180406-1330.jpg','image/jpeg','images/y12ljion-'),
	('zK_5lz7xw','velky-recept66949_1444894775.jpg','image/jpeg','images/zK_5lz7xw');

/*!40000 ALTER TABLE `Picture` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Recipe
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Recipe`;

CREATE TABLE `Recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `process` mediumtext,
  `rating` float(4,2) DEFAULT NULL,
  `pictureId` varchar(20) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `pictureId` (`pictureId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `Recipe` WRITE;
/*!40000 ALTER TABLE `Recipe` DISABLE KEYS */;

INSERT INTO `Recipe` (`id`, `name`, `creatorId`, `process`, `rating`, `pictureId`, `description`)
VALUES
	(127,'First recipe',108,' First postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postupFirst postup',NULL,'6bDNupMV_','First postup First postupFirst postup First postup'),
	(128,'5',108,'',NULL,'y12ljion-',''),
	(129,'New',108,'NEW',NULL,'bi-SvKERx','STILL NEW'),
	(130,'Palacinky',108,'Nachystáme si suroviny :) Ešte raz sa budem opakovať ako pri minulom recepte ja sa snažím robiť recepty teda fotiť postupy aj kvôli začiatočníkom čo napr palacinky ešte nerobili lebo to dosť pomáha keď sú aj fotky pri recepte,viem z vlastnej skúsenosti ;) napr. zbehlé kuchárky/kuchári určite nepotrebujú fotky lebo palacinky vedia už možno aj z pamäti takže tak :)\n\nvšetky suroviny si dáme do jednej misky\n\nkeď už máme všetky suroviny v miske cesto mixujeme s mixérom ...a necháme aspoň 15-20 minút odpočívať niekto možno cesto mieša ručne ale s mixérom to je rýchle a dobre :)\n\ncesto nám postálo 20 minút skontrolujeme či ma správnu hustotu a môžeme sa pustiť do pečenia :) Vymastíme si panvicu s olejom úplne jemnučko nie veľa oleja a poriadne rozohrejeme panvicu a môžeme piecť.. naozaj je dosť dôležité na akej panvici palacinky pečieme ja som piekla na tefal panvici, čo sa aj odzrkadlilo lebo sa mi ani jedna palacinka nepotrhala ani ta prvá....\n\nupečené palacinky si ochutíme podľa vlastného gusta :) ja dávam do palacinky nutelu, čerstvé ovocie nakrájané jahody,maliny,čučoriedky a šľahačku, keď dávam šľahačku do vnútra je to super fakt a určite to vyskúšajte :) ozdobila som topingom , šľahačkou, ovocím a mätou... Dobrú chuť :)',NULL,'zK_5lz7xw','Coko palacinky');

/*!40000 ALTER TABLE `Recipe` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table RecipeFoods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `RecipeFoods`;

CREATE TABLE `RecipeFoods` (
  `recipeId` int(11) NOT NULL,
  `foodId` int(11) NOT NULL,
  `quantity` float(12,2) DEFAULT NULL,
  `unit` char(5) NOT NULL,
  PRIMARY KEY (`recipeId`,`foodId`),
  KEY `foodId` (`foodId`),
  KEY `unit` (`unit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `RecipeFoods` WRITE;
/*!40000 ALTER TABLE `RecipeFoods` DISABLE KEYS */;

INSERT INTO `RecipeFoods` (`recipeId`, `foodId`, `quantity`, `unit`)
VALUES
	(130,5,10.00,'mg'),
	(130,1,10.00,'kg'),
	(130,7,3.00,'kg'),
	(130,2,10.00,'kg'),
	(130,3,213.00,'mg'),
	(128,4,10.00,'kg'),
	(128,2,10.00,'kg'),
	(128,3,10.00,'kg'),
	(129,1,10.00,'kg'),
	(128,1,10.00,'kg'),
	(127,5,3.00,'kg'),
	(127,4,3.00,'kg'),
	(0,0,10.00,'kg'),
	(127,1,10.00,'kg');

/*!40000 ALTER TABLE `RecipeFoods` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Role`;

CREATE TABLE `Role` (
  `id` char(3) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;

INSERT INTO `Role` (`id`, `name`)
VALUES
	('ADM','Admin'),
	('USR','User');

/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Unit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Unit`;

CREATE TABLE `Unit` (
  `id` char(5) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `Unit` WRITE;
/*!40000 ALTER TABLE `Unit` DISABLE KEYS */;

INSERT INTO `Unit` (`id`, `name`)
VALUES
	('kg','kilogram'),
	('cm','centimeter'),
	('mg','miligram'),
	('g','gram'),
	('t','tone');

/*!40000 ALTER TABLE `Unit` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL DEFAULT '',
  `role` char(3) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserNameUnique` (`userName`),
  KEY `FK_UserRole` (`role`),
  CONSTRAINT `FK_UserRole` FOREIGN KEY (`role`) REFERENCES `Role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `userName`, `password`, `firstName`, `lastName`, `email`, `role`)
VALUES
	(85,'franzp@gmail.com','$2b$10$tXAqcd2JEPWYWVSr4VM7QOhwHItHc/jfEx411IEktrn1CDFKifEB.','Frantisek','Pobocek','franzp@gmail.com','ADM'),
	(97,'2320148817997277','$2b$10$r26Yky6NQ5weTB7pg61bx.0gDvE19vLEOJO5m5RtlpuGT1iGvwPVa','Frantisek','Pobocek','franzp31@gmail.com','USR'),
	(108,'pobocekfrantisek@gmail.com','$2a$10$.M/XKrqPN8WIqDuzzudoCu0fZboT3CCEp/MICtZzAwrYacfAcI/PK',NULL,NULL,'pobocekfrantisek@gmail.com','USR'),
	(109,'roboto@roboto.sk','$2a$10$vI9pttEJYsTOXp8Vs35v8OTPd9C1DlbrtnHFrfLyDVq1YLr/FTTHC',NULL,NULL,'roboto@roboto.sk','USR');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserFoods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserFoods`;

CREATE TABLE `UserFoods` (
  `userId` int(11) NOT NULL,
  `foodId` int(11) NOT NULL,
  `rating` int(1) DEFAULT NULL,
  PRIMARY KEY (`userId`,`foodId`),
  KEY `foodId` (`foodId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `UserFoods` WRITE;
/*!40000 ALTER TABLE `UserFoods` DISABLE KEYS */;

INSERT INTO `UserFoods` (`userId`, `foodId`, `rating`)
VALUES
	(83,1,1),
	(83,2,1),
	(85,1,0),
	(85,2,1),
	(85,3,1),
	(98,3,1),
	(98,6,1),
	(98,5,0),
	(97,5,1),
	(97,3,0),
	(97,2,0),
	(98,2,1),
	(97,1,0),
	(97,4,0),
	(97,6,0),
	(97,7,0),
	(108,3,0),
	(108,2,0);

/*!40000 ALTER TABLE `UserFoods` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserRecipes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserRecipes`;

CREATE TABLE `UserRecipes` (
  `userId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `rating` int(1) DEFAULT NULL,
  PRIMARY KEY (`userId`,`recipeId`),
  KEY `recipeId` (`recipeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserRecipes` WRITE;
/*!40000 ALTER TABLE `UserRecipes` DISABLE KEYS */;

INSERT INTO `UserRecipes` (`userId`, `recipeId`, `rating`)
VALUES
	(108,127,1),
	(108,128,1),
	(108,130,1);

/*!40000 ALTER TABLE `UserRecipes` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
