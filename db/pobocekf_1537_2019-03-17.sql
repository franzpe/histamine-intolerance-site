# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: store4.rosti.cz (MySQL 5.5.5-10.0.35-MariaDB-0+deb8u1)
# Database: pobocekf_1537
# Generation Time: 2019-03-17 07:53:02 +0000
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
  `histamineLevel` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `histamineLevel` (`histamineLevel`),
  CONSTRAINT `histamineLevel` FOREIGN KEY (`histamineLevel`) REFERENCES `HistamineLevel` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Food` WRITE;
/*!40000 ALTER TABLE `Food` DISABLE KEYS */;

INSERT INTO `Food` (`id`, `name`, `histamineLevel`, `description`)
VALUES
	(132,'vajce prepeličie',0,''),
	(133,'vajce slepačie',2,''),
	(134,'vaječný bielok',0,''),
	(138,'vaječný žĺtok',0,''),
	(139,'cmar',1,''),
	(140,'hotový syrový výrobok',2,'záleží na zložení a čerstvosti'),
	(141,'biely jogurt',1,''),
	(142,'kefír',1,''),
	(143,'maslo smotanové',0,''),
	(144,'maslo s mliečnou kultúrou',1,''),
	(145,'mlieko kozie',0,''),
	(146,'mlieko ovčie',0,''),
	(147,'mlieko nepasterizované',0,'rýchlo sa kazí, používať iba čerstvé'),
	(148,'mlieko bezlaktózové',1,''),
	(149,'mlieko pasterizované',0,''),
	(150,'mlieko sušené',1,''),
	(151,'smotana kyslá',1,'fermentovaná mliečnym kvasením'),
	(152,'smotana sladká',0,'ak je bez aditív'),
	(153,'srvátka',0,''),
	(155,'syr čedar',2,''),
	(156,'syr feta',1,''),
	(159,'syr gouda mladý',0,'v malom množstve'),
	(160,'syr gouda vyzretý',2,''),
	(161,'syr krémový',0,'mladý, bez aditív'),
	(162,'syr mascarpone',0,''),
	(163,'syr mozzarella',0,''),
	(164,'syr plesnivý',2,''),
	(166,'syr ricotta',0,''),
	(167,'syr niva, roquefort',2,''),
	(168,'syr tavený',2,''),
	(169,'syr z nepasterizovaného mlieka',2,'riziko záleží od hygieny'),
	(170,'bravčové',1,'čerstvé je dobre tolerované'),
	(171,'divina',1,'čerstvé je dobre tolerované'),
	(172,'hovädzie',0,''),
	(173,'hydina',0,''),
	(174,'jazyk (teľací, hovädzí)',0,'neúdený'),
	(175,'kačacie',0,''),
	(176,'klobása',3,''),
	(177,'kuracie',0,''),
	(178,'mäso mleté čerstvé',0,'skonzumované hneď po zomletí'),
	(179,'mäso mleté balené',2,'záleží od čerstvosti'),
	(180,'mäso sušené',3,''),
	(181,'údené',3,''),
	(182,'morčacie',0,''),
	(183,'párky',3,''),
	(184,'prepeličie mäso',0,''),
	(185,'pštrosie mäso',0,''),
	(186,'údená ryba',3,''),
	(187,'saláma',3,''),
	(188,'šunka',3,''),
	(189,'teľacie',0,''),
	(190,'vnútornosti',2,''),
	(191,'zverina',1,''),
	(192,'ančovičky',3,''),
	(193,'pstruh',0,'čerstvý, rýchlo sa kazí'),
	(194,'ryba čerstvo ulovená',0,''),
	(195,'ryba chladená balená',3,'záleží od čerstvosti'),
	(196,'tuniak',3,''),
	(197,'garnáty',2,''),
	(198,'homár',2,''),
	(199,'krab',2,''),
	(200,'krevety',2,''),
	(201,'langusta',2,''),
	(202,'mušle',2,''),
	(203,'morské plody',2,''),
	(204,'rak',2,''),
	(205,'ustrice',2,''),
	(206,'bravčová masť',0,''),
	(207,'sadlo',0,''),
	(208,'bataty, sladké zemiaky',0,''),
	(209,'chlieb',1,'problémy spôsobujú kvasnice (droždie), slad a jód'),
	(210,'chlieb špaldový kváskový',0,''),
	(211,'gaštany',0,''),
	(212,'jačmeň',1,''),
	(213,'jačmenný slad',2,''),
	(214,'konopné semená',0,''),
	(215,'kukurica sladká čerstvá',0,''),
	(216,'kukurica sladká sušená',0,''),
	(217,'kukurica sladká konzervovaná',0,'v malom množstve'),
	(218,'kukuričné lupienky',0,'bez sladu a kyseliny listovej'),
	(219,'ovos',0,'niektoré odrody môžu spôsobiť nafukovanie'),
	(220,'pečivo',1,'problémy spôsobujú kvasnice (droždie), slad a jód'),
	(221,'pohánka',2,'problémy spôsobujú kvasnice (droždie), slad a jód'),
	(222,'pšenica',1,'často spôsobuje nafukovanie'),
	(223,'pšeničné klíčky',2,''),
	(224,'pšeno',0,''),
	(225,'quinoa',0,''),
	(226,'raž',1,''),
	(227,'ryža',0,'skladovať v chladničke maximálne 24 hodín'),
	(228,'ryža divoká',0,''),
	(229,'ryžové chlebíčky',0,''),
	(230,'ryžové lupienky',0,'bez sladu a kyseliny listovej'),
	(231,'ryžové rezance',0,''),
	(232,'palmový škrob',0,''),
	(233,'slnečnicové semienka',2,''),
	(234,'špalda',0,'staršie odrody'),
	(235,'zemiaky nové',0,''),
	(236,'zemiaky ošúpané',0,''),
	(237,'zemiaky so šupou',0,''),
	(238,'žito',1,''),
	(239,'arašidy',2,''),
	(240,'kešu',1,''),
	(241,'lieskové orechy',1,''),
	(242,'makadamiové orechy',0,''),
	(243,'mandle',1,'v malom množstve'),
	(244,'orechy',3,'záleží od druhu'),
	(245,'para orechy',0,'maximálne 2 denne'),
	(246,'píniové semienka',1,''),
	(247,'pistácie',0,''),
	(248,'vlašské orechy',3,''),
	(249,'olej kokosový',0,''),
	(250,'margarín',0,'bez aditív'),
	(251,'olej olivový',0,'nevhodný pre ľudí so salycilátovou intoleranciou'),
	(252,'olej palmový',0,''),
	(253,'olej repkový',0,''),
	(254,'olej slnečnicový',1,'jednorazovo bez problémov, dlhodobo môže mať zápalové účinky'),
	(255,'olej z čiernej rasce',0,'antialergický'),
	(256,'olej tekvicový',0,'za studena lisovaný olej z pražených tekvicových semienok'),
	(257,'olej z vlašských orechov',2,''),
	(258,'olej bodliakový',0,''),
	(259,'artičoky',0,''),
	(260,'asparágus',0,''),
	(261,'avokádo',2,''),
	(262,'baklažán',2,''),
	(263,'bôb        ',2,''),
	(264,'bok choi',0,''),
	(265,'brokolica',0,''),
	(266,'čakanka ',0,''),
	(267,'cesnak',1,'v malých množstvách a po uvarení dobre tolerovaný'),
	(268,'chren',1,''),
	(269,'cibuľa',1,'v malých množstvách '),
	(270,'cibuľa biela ',0,''),
	(271,'cícer ',2,''),
	(272,'čili paprička ',2,'červená čerstvá'),
	(273,'cuketa ',0,''),
	(274,'dyňa ',0,''),
	(275,'fazuľa ',2,''),
	(276,'fenikel ',0,''),
	(277,'hrášok',1,''),
	(278,'hrach sušený',1,''),
	(279,'kaleráb',1,''),
	(280,'kapusta',0,'biela alebo zelená'),
	(281,'kapusta červená ',0,''),
	(282,'kapusta čínska ',0,''),
	(283,'kapusta kvasená ',3,''),
	(284,'kapusta kyslá ',3,''),
	(285,'kapusta ružičková',1,''),
	(286,'karfiol',0,''),
	(287,'kel',1,''),
	(289,'mangold',1,''),
	(290,'mrkva ',0,''),
	(292,'olivy',2,'zvyčajne fermentované'),
	(293,'pak choi',0,''),
	(294,'paprika sladká ',0,''),
	(295,'paprika štipľavá ',2,''),
	(296,'paradajky ',2,''),
	(297,'paštrnák',0,''),
	(298,'polníček',0,''),
	(299,'pór',1,'v malom množstve'),
	(300,'reďkovka biela ',0,''),
	(301,'reďkovka červená ',0,''),
	(302,'repa červená ',0,''),
	(303,'rukola ',2,''),
	(304,'šalát ',0,''),
	(305,'šalát ľadový ',0,''),
	(306,'sójové bôby ',2,''),
	(307,'sójová múka ',2,''),
	(308,'šošovica ',2,''),
	(309,'špargľa ',0,''),
	(310,'špenát ',2,''),
	(311,'tekvica ',0,''),
	(312,'uhorka',0,''),
	(313,'zaváraná zelenina',2,''),
	(314,'zavárané uhorky ',2,''),
	(315,'fazuľové lusky',1,''),
	(316,'zeler',0,''),
	(317,'žihľava',2,''),
	(318,'bazalka ',0,''),
	(319,'medvedí cesnak ',1,'v malom množstve'),
	(320,'kôpor',1,'v malom množstve, nevhodný pre ľudí so salicylátovou intoleranciou'),
	(321,'mäta ',0,'nevhodná pre ľudí so salicylátovou intoleranciou'),
	(322,'oregano',0,''),
	(323,'pažítka ',1,'v malom množstve'),
	(324,'petržlen',0,''),
	(325,'rozmarín',0,''),
	(326,'šalvia',0,''),
	(327,'ananás',2,''),
	(329,'banán',2,''),
	(330,'baza čierna',0,''),
	(331,'broskyňa',0,''),
	(332,'brusnice',0,''),
	(333,'čerešne ',0,''),
	(334,'citrón',2,''),
	(335,'citrónová kôra ',2,''),
	(336,'citrusy',2,''),
	(337,'čučoriedky ',0,''),
	(338,'ďatle sušené ',0,''),
	(339,'dračie ovocie ',0,''),
	(340,'dula ',0,''),
	(341,'egreš',0,''),
	(342,'figy čerstvé',1,'môžu spôsobiť preháňanie'),
	(343,'figy sušené ',1,'môžu spôsobiť preháňanie'),
	(344,'goji',0,''),
	(345,'granátové jablko ',0,''),
	(346,'grapefruit',2,''),
	(347,'guava',2,''),
	(348,'hrozienka',0,'nevhodné pre ľudí so salicylátovou intoleranciou'),
	(349,'hrozno',0,''),
	(350,'hruška',1,''),
	(351,'hurmi kaki ',0,''),
	(352,'jablko',0,''),
	(353,'jahody',2,''),
	(354,'kakao',2,''),
	(355,'kakaové maslo',0,''),
	(356,'karambola ',0,''),
	(357,'kiwi',2,''),
	(358,'kokos',0,''),
	(359,'kokosové mlieko ',0,''),
	(360,'kustovnica čínska',0,''),
	(361,'liči',0,''),
	(362,'limetka',3,''),
	(363,'maliny',2,''),
	(364,'mandarinky',2,''),
	(365,'mango ',1,''),
	(366,'marhuľa',0,''),
	(367,'melón',0,'okrem vodového'),
	(368,'melón vodový ',1,''),
	(369,'nektarinka',0,''),
	(370,'ostružina',0,''),
	(371,'papája',2,''),
	(372,'pomaranč',3,''),
	(373,'pomarančová kôra',3,''),
	(374,'rakytník',0,''),
	(375,'rebarbora',1,''),
	(376,'ríbezle červené ',0,''),
	(377,'ríbezle čierne ',0,''),
	(378,'šípky',1,''),
	(379,'slivky ',1,''),
	(380,'slivky sušené',1,''),
	(381,'višne',0,''),
	(382,'chia semiačka ',0,''),
	(383,'psyllium',0,'vláknina vhodná pri hnačke alebo zápche'),
	(384,'sezam',1,'môže vyvolávať hnačky'),
	(385,'tekvicové semiačka',0,''),
	(386,'riasy červené ',3,''),
	(387,'chaluhy',3,''),
	(388,'riasy hnedé ',3,''),
	(389,'huby',2,''),
	(390,'hríby',2,''),
	(391,'kvasnice ',1,'výnimkou je pečivo s dlhou dobou fermentácie'),
	(392,'riasy morské ',3,''),
	(393,'riasy',3,'extrémne bohaté na jód'),
	(394,'šampiňóny',1,''),
	(395,'smrčky',2,''),
	(396,'riasy wakame',3,''),
	(397,'riasy zelené ',3,''),
	(398,'agáve ',0,'nektar alebo sirup'),
	(399,'cukor brezový ',0,''),
	(400,'cukor repkový ',0,''),
	(401,'cukor trstinový ',0,''),
	(402,'dextróza',0,''),
	(403,'cukor sorbitolový',0,'preháňadlo a diuretikum'),
	(404,'fruktóza ',0,''),
	(405,'glukóza',0,''),
	(406,'javorový sirup',0,''),
	(407,'karamel',0,''),
	(408,'sladké drievko',2,''),
	(409,'laktóza ',0,'cukor mliečny'),
	(410,'maltóza',0,'cukor sladový'),
	(411,'med',0,''),
	(412,'sacharóza',0,''),
	(413,'sladový extrakt',2,''),
	(414,'stévia',0,''),
	(415,'umelé sladidlá',1,''),
	(416,'korenie biele',2,'v malom množstve dobre tolerované'),
	(417,'borievka ',0,''),
	(418,'bujón',2,'obsahuje nevhodné aditíva'),
	(419,'černuška sjata',0,''),
	(420,'korenie čierne',2,'v malom množstve dobre tolerované'),
	(421,'horčica ',2,''),
	(422,'jalovec',0,''),
	(423,'kardamón',0,''),
	(424,'kari ',2,''),
	(425,'klinčeky ',0,''),
	(426,'koriander',0,''),
	(427,'kurkuma',0,''),
	(428,'kvasnicový extrakt',2,''),
	(429,'mak ',1,'v malom množstve'),
	(430,'mäsový extrakt ',2,''),
	(431,'muškátový oriešok ',1,''),
	(432,'ocot balzamikový ',3,''),
	(433,'ocot jablčný ',1,''),
	(434,'ocot kvasný ',0,'v malom množstve'),
	(435,'ocot vínny',3,''),
	(436,'paprika mletá páliva',2,''),
	(437,'paprika mletá sladká',0,''),
	(438,'rasca',0,'pozitívny efekt na trávenie'),
	(439,'rasca rímska',2,''),
	(440,'škorica',0,''),
	(441,'sójová omáčka ',3,''),
	(442,'tymián ',0,''),
	(443,'vanilka',1,'v malom množstve'),
	(444,'vanilkový cukor',1,''),
	(445,'vanilkový extrakt',1,''),
	(446,'zázvor ',1,'v malom množstve'),
	(447,'minerálna voda neperlivá',0,''),
	(448,'termálna voda',1,'obsah síry, fluóru, jódu a kyseliny uhličitej'),
	(449,'voda z vodovodu',0,''),
	(450,'alkohol ',3,''),
	(451,'alkoholické nápoje',3,''),
	(452,'brandy ',2,''),
	(453,'etanol',3,''),
	(454,'liehovina číra',2,''),
	(455,'liehovina ochutená, prifarbená',3,''),
	(456,'pálenka číra ',2,''),
	(457,'pálenka ochutená, prifarbená',3,''),
	(458,'pivo',2,''),
	(459,'rum',2,''),
	(460,'šampanské ',3,''),
	(461,'šumivé víno ',3,''),
	(462,'víno',3,''),
	(463,'víno bezhistamínové ',1,'vhodné na varenie'),
	(464,'víno biele',2,''),
	(465,'víno červené ',3,''),
	(466,'čaj bylinkový ',1,''),
	(467,'čaj čierny',2,''),
	(468,'čaj kamilkový',0,''),
	(469,'čaj lipový ',0,''),
	(470,'maté',1,''),
	(471,'čaj mätový',1,''),
	(472,'roiboos',0,''),
	(473,'čaj šalviový ',0,''),
	(474,'čaj zelený ',1,''),
	(475,'čaj žihľavový ',1,''),
	(476,'brusnicový nektár',0,''),
	(477,'pomarančový džús',2,''),
	(478,'paradajkový džús',2,''),
	(479,'kola',1,''),
	(480,'energetický nápoj',2,''),
	(481,'espresso',1,''),
	(482,'káva',1,''),
	(483,'mlieko ovsené',1,''),
	(484,'mlieko ryžové',1,''),
	(485,'mlieko sójové',2,''),
	(486,'bazový sirup',0,''),
	(487,'čokoládový nápoj',2,''),
	(488,'kakaový nápoj',2,''),
	(489,'limonáda',1,'záleží od zloženia'),
	(490,'sladký perlivý nápoj',1,'záleží od zloženia'),
	(491,'varená čokoláda',2,''),
	(492,'sóda ',1,''),
	(493,'kyselina askorbová',0,'vitamín C, znižuje hladinu histamínu'),
	(494,'kyselina citrónová ',1,''),
	(495,'kyselina mliečna ',0,''),
	(496,'kyselina octová ',0,''),
	(497,'lepok, glutén ',1,''),
	(498,'soľ ',2,''),
	(499,'jód',3,''),
	(500,'jodid draselný ',3,'aditívum v soli'),
	(501,'kyselina listová ',2,'vitamín B9'),
	(502,'pelendrek',2,''),
	(503,'marcipán',1,'v malom množstve'),
	(504,'čokoláda mliečna ',2,''),
	(505,'čokoláda horká',2,''),
	(506,'čokoláda biela',1,''),
	(507,'tofu',2,''),
	(508,'pšeničná múka',2,''),
	(509,'špaldová múka',0,''),
	(510,'kokosová múka',0,''),
	(511,'karobový prášok',2,''),
	(512,'sóda bikarbóna',0,''),
	(513,'cukor kokosový',0,''),
	(514,'pološtiepok',2,''),
	(515,'majoránka',0,''),
	(516,'parmezán',1,'');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `HistamineLevel` WRITE;
/*!40000 ALTER TABLE `HistamineLevel` DISABLE KEYS */;

INSERT INTO `HistamineLevel` (`value`, `name`, `description`)
VALUES
	(0,'dobre tolerované','pri bežnom užívaní žiadne predpokladané symptómy'),
	(1,'stredne kompatibilné','mierne symptómy, občasná kombinácia v malých množstvách je často tolerovná'),
	(2,'nevhodné','viditeľné symptómy pri bežnom príjme'),
	(3,'veľmi zlé','mnohé symptómy');

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
	('1a0ntL35T','bread-1510298_1280.jpg','image/jpeg','images/1a0ntL35T'),
	('1naNNOhL1','arabian-3489904_1280.jpg','image/jpeg','images/1naNNOhL1'),
	('4eWqUEZQW','macro-1285670_1280.jpg','image/jpeg','images/4eWqUEZQW'),
	('6H4Soc_4G','browny.jpg','image/jpeg','images/6H4Soc_4G'),
	('cHCZV3_vW','pancakes-3926009_960_720.jpg','image/jpeg','images/cHCZV3_vW'),
	('DiiOIUGDq','hummus-1057998_1280.jpg','image/jpeg','images/DiiOIUGDq'),
	('gbMazGTOf','food-3167497_1280.jpg','image/jpeg','images/gbMazGTOf'),
	('gybTHT2sb','guacamole.jpg','image/jpeg','images/gybTHT2sb'),
	('HyIKVfF3E','nachos-2445573_1280.jpg','image/jpeg','images/HyIKVfF3E'),
	('STiIjLPTD','pumpkin-3360793_1280.jpg','image/jpeg','images/STiIjLPTD'),
	('VQAoBUbZ_','baked-goods-1839277_960_720.jpg','image/jpeg','images/VQAoBUbZ_'),
	('WZKNpoBcR','potato-pancakes-544712_1280.jpg','image/jpeg','images/WZKNpoBcR');

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
  `pictureId` varchar(20) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `pictureId` (`pictureId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Recipe` WRITE;
/*!40000 ALTER TABLE `Recipe` DISABLE KEYS */;

INSERT INTO `Recipe` (`id`, `name`, `creatorId`, `process`, `pictureId`, `description`)
VALUES
	(131,'Špaldové palacinky',111,'Ingrediencie v miske dobre vymiešame aby sme sa zbavili hrudiek, najlepšie premiešat cez sítko. Následne pečieme ako klasické palacinky, najlepšie na kokosovom oleji. Recept vychádza na cca 8 porcií.','cHCZV3_vW','Lahodné špaldové palacinky'),
	(132,'Brownies z karobu',111,'Vo väčšej miske si zmiešame kokosovú múku, karobový prášok a sódu bikarbónu. V druhej miske si vymiešame cukor s kokosovým olejom alebo maslom, primiešame vajcia a mlieko. Mokré ingrediencie si vlejeme do misky so suchými ingredienciami a jemne premiešame. Ak s nám zdá zmes príliš suchá, prilejeme ešte mlieko podľa potreby.  Zmes nalejeme do plechy vystlaného papierom na pečenie a dáme do rúry na  25 minút pri teplote 180 stupňov. Po upečení brownies necháme chvílu vychladnúť a podávame.\n\n','6H4Soc_4G','Brownies s náhradou kakaa karobom'),
	(133,'Guacamole',111,'Brokolicu sparíme v parnej nádobe alebo hrnci tak, aby bola mierne rozvarená. Brokolicu, cesnak, koriander, limetkovú šťavu a soľ dáme do mixéra a pomaly mixujeme aby sa brokolica postupne rozpadala na menšie kúsky. Zvýšime výkon a mixujeme po dobu 30 sekúnd, pomaly pridáme olivový olej, aby sme dosiahli požadovanú konzistenciu. Naservírujeme do misy a na 1-2 hodiny vložíme do chladničky. Konzumujeme ako guacamole.','gybTHT2sb','Namiesto vyosokohist. avokáda použitá brokolica'),
	(134,'Zemiakové placky ',111,'Zemiaky postrúhame a vytlačíme z nich vodu. Pridáme dve vajcia, pretlačíme cesnak a korenie podľa tolerancie a chuti. Pološtiepok nahrubo postrúhame a primiešame. Na plech dáme papier na pečenie a potriebe olivovým olejom. Z cesta postupne odoberáme naberačkou a vytvárame na plechu placky.Pečieme v rúre vyhriatej na 200 stupňov, približne 30 minút. Placky môžeme podávať ako samostatné jedlo alebo prílohu.','WZKNpoBcR','Pečené placky'),
	(135,'Zdravé domáce nachos',111,'Všetky ingrediencie spolu premiešame. Soľ, čierne korenie a kurkumu pridáme podľa chuti. Vytvoríme cesto a rozvaľkáme natenko. Z tohto množstva vyjde viacero plechov. Cesto narežeme na pásy a šikmými rezmi spravíme trojuholníky. Pred tým, ako dáme cesto piecť ho posypeme trochou soli. Pečieme približne 15 minút pri 180°C','HyIKVfF3E','Domáce nachos'),
	(136,'Zeleninové quinoa placky',111,'Qionoa sa varí ako ryža – teda v dvojnásobnom množstve vody približne 20 min. Celok by mal byť vzdušne ľahký, ale ešte na zahryznutie. Zemiaky a mrkva sa uvaria na pare a potom rozpučia. Surový karfiol a pór sa nadrobno pokrájajú. Všeko sa dokopy zmiša v myske a okorení podľa chuti. Pridá sa špaldová múka a následne sa vytvarujú malé placky, ktoré vyprážame na oleji do zlata.\n','gbMazGTOf','Quinoa placky'),
	(137,'Čučoriedkové muffiny',111,'Vezmeme si väčšiu misku a zmiešame v nej preosiatu kokosovú múku, lyžičku sódy bikarbóny a štipku soli. V druhe miske rozmixujeme 6 vajec s kokosovým cukrom (alebo môžme použiť aj med), kokosovým olejom, mliekom a vanilkovým extraktom. . Všetky mokré ingrediencie nalejeme do misky so suchými ingredienciami a miešame ručným mixérom približne minútu, až kým nevznikne mierne tekuté cesto. Do košíčkov nalejeme cesto na muffiny asi do 1/3. Pridáme naň pár čučoriedok a zase zakryjeme cestom. Navrch môžeme opäť nasypať čučoriedky podľa chuti. Množstvo čučoriedok závisí od vás.Pečieme pri 180 stupňoch približne 25-30 minút. Z tohto receptu spravíme približne 12 muffinov.','VQAoBUbZ_','Chutné muffiny bez histamínu'),
	(138,'Chlieb bez kvasníc',111,'Dohoromady vo väčšej miske zmiešame preosiatu múku, cukor, soľ, sódu bikarbónu a semiačka podľa vlastného výberu v množstve podľa chuti. V strede zmesi urobíme jamku, do ktorej nalejeme vodu. Poprípade namiesto vody môžeme použiť aj biely jogurt v rovnakom množstve. Všetko spolu jemne miešame, až kým nám nevznikle lepiví hmota. Cesto potom vytvarujeme do bochníka a dáme piecť do zapekacej misy vystlanej papierom na pečenie. Nožom bochník narežeme a posypeme múkou. Pečieme v rúre pri 180 stupňoch približne 1 hodinu.\n','1a0ntL35T','Domáci chlieb bez kvasníc'),
	(139,'Cícerová pomazánka',111,'Deň dopredu cícer umyjeme a cez noc necháme namočený vo vode. Na ďalší deň cícer oplácheme a varíme približne hodinu. Po dovarení ho necháme vychladnúť a rozmixujeme spolu s olivovým olejom. Potom do rozmixovanej pomazánky pritlačíme cesnak. Môžme pridať aj soľ a korenie podľa chuti, ja preferujem čierne korenie. Na záver môžme do pomazánky nakvapkať aj trochu šťavy z citrónu podľa chuti a ozdobiť semiačkami.','DiiOIUGDq','Jednoduchá a chutná hummus pomazánka'),
	(140,'Arabský chlieb',111,'Maslo a mlieko spolu zmiešame a zohrejeme pokiaľ sa maslo neroztopí. Zmiešame múku, soľ a mlieko s maslom. Miesime niekoľko minút a ak je cesto príliš lepkavé, pridáme múku. Cesto zabalíme do fólie a necháme pol hodinu odstáť pri izbovej teplote. Na pomúčenej doske cesto rozkrojíme na 8 častí, vytvoríme guličky a následne vyvaľkáme na približne 0,5 cm hrubé placky. Na panvicu dáme 1 PL olivového oleja a zohrejeme na stredne vysokej teplote. Placky dáme na panvicu a pečieme asi minútu, až pokiaľ sa nezačnú vytvárať bubliny. Vtedy ich otočíme na drihú stranu. Takto opečieme aj ostatné placky.\n','1naNNOhL1','Arabský chlieb rýchlo a ľahko'),
	(141,'Hokkaidové zemiaky',111,'Tekvicu hokkaido umyjeme, vydlabeme semiačka a nakrájame postupne na štvorčeky. Netreba ju šúpať, práve šupa je veľmi zdravá. Na hlbšiu panvicu nalejeme olivový olej, približne 1,5 PL, alebo podľa potreby, aby nám nezhorela cubuľa. Necháme trochu zohriať a nasypeme pokrájanú cibuľu, ktorú necháme podusiť na miernom ohni. Keď sa nám zdá že cibuľka je hotová, nasypeme do panvice pokrájanú hokkaido tekvicu. Následne nalejeme do panvice 3,5 dcl vody. Množstvo vody závisí od množstva tekvice, teda aspoň toľko vody aby pokryla aspoň z trištvrtiny tekvicu v panvici, nech sa nám uvarí. (ale nie aby tekvica plávala, nech nie je príliš vodová). Následne môžme pridať korenie podľa chuti a soľ. Poprípade aj chilli. Prikryjeme a necháme variť približne 15-25 minút, až kým nám hokkaido nezmäkne. Ak sme dali príliš veľa vedy, možme z nej odobrať alebo dať na vyšší oheň a vodu nechať vypariť, vtedy bude tekvica viac mazľavá, avšak tiež chutná. ','STiIjLPTD','Chutné hokkaidové zemiaky'),
	(142,'Chia pudding',111,'Dáme do misky 200 ml kokosového mlieka (poprípade môžme použiť aj mandľové mlieko) a 1 lyžicu chia semiačok. Dobre premiešame a necháme odstáť v chladničke aspoň 5 hodín alebo cez celú noc. Chia semiačka sa dokážu zväčšiť až 9 násobne, tak je normálne ak buduú napučené. Puding bude mať gélovú konzistenciu. Na záver ho môžme ozdobiť ovocím, napríklad malinami, čučoriedkami alebo banánom, ktorý je najlepší pre nás, ak je čo najzelenší. ','4eWqUEZQW','');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `RecipeFoods` WRITE;
/*!40000 ALTER TABLE `RecipeFoods` DISABLE KEYS */;

INSERT INTO `RecipeFoods` (`recipeId`, `foodId`, `quantity`, `unit`)
VALUES
	(131,133,1.00,'ks'),
	(131,149,200.00,'ml'),
	(131,401,1.00,'pl'),
	(131,449,200.00,'ml'),
	(131,498,1.00,'g'),
	(131,509,250.00,'g'),
	(132,133,2.00,'ks'),
	(132,249,50.00,'g'),
	(132,359,300.00,'ml'),
	(132,510,5.00,'pl'),
	(132,511,3.00,'pl'),
	(132,512,1.00,'čl'),
	(132,513,30.00,'g'),
	(133,251,1.00,'pl'),
	(133,265,2.00,'ks'),
	(133,267,1.00,'ks'),
	(133,362,0.50,'dcl'),
	(133,426,0.50,'dcl'),
	(133,498,0.50,'čl'),
	(134,133,2.00,'ks'),
	(134,236,400.00,'g'),
	(134,251,1.00,'čl'),
	(134,267,2.00,'ks'),
	(134,420,0.10,'čl'),
	(134,514,1.00,'ks'),
	(134,515,0.50,'čl'),
	(135,251,2.00,'pl'),
	(135,420,0.20,'čl'),
	(135,427,0.20,'čl'),
	(135,449,4.00,'dcl'),
	(135,498,0.20,'čl'),
	(135,509,4.00,'dcl'),
	(135,516,4.00,'dcl'),
	(136,138,2.00,'ks'),
	(136,225,2.00,'dcl'),
	(136,236,0.50,'kg'),
	(136,253,1.00,'čl'),
	(136,267,1.00,'ks'),
	(136,286,0.50,'ks'),
	(136,290,1.00,'ks'),
	(136,299,1.00,'ks'),
	(136,438,0.10,'čl'),
	(136,509,200.00,'g'),
	(136,515,0.10,'čl'),
	(137,133,6.00,'ks'),
	(137,249,150.00,'ml'),
	(137,337,20.00,'g'),
	(137,359,100.00,'ml'),
	(137,445,1.00,'čl'),
	(137,498,0.10,'čl'),
	(137,510,70.00,'kg'),
	(137,512,1.00,'čl'),
	(137,513,2.00,'pl'),
	(138,385,10.00,'g'),
	(138,401,1.00,'čl'),
	(138,449,500.00,'ml'),
	(138,498,1.00,'čl'),
	(138,509,450.00,'kg'),
	(138,512,1.00,'čl'),
	(139,251,3.00,'pl'),
	(139,267,2.00,'ks'),
	(139,271,150.00,'g'),
	(139,498,0.10,'čl'),
	(140,144,100.00,'g'),
	(140,251,2.50,'pl'),
	(140,359,1.00,'dcl'),
	(140,498,1.00,'čl'),
	(140,509,8.00,'dcl'),
	(141,251,1.50,'pl'),
	(141,269,0.50,'ks'),
	(141,311,1.00,'ks'),
	(141,420,0.50,'čl'),
	(141,449,3.50,'dcl'),
	(142,359,200.00,'g'),
	(142,363,1.00,'pl'),
	(142,382,1.00,'pl');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Unit` WRITE;
/*!40000 ALTER TABLE `Unit` DISABLE KEYS */;

INSERT INTO `Unit` (`id`, `name`)
VALUES
	('čl','čajová lyžička'),
	('dcl','deciliter'),
	('dkg','dekagram'),
	('g','gram'),
	('kg','kilogram'),
	('ks','kus'),
	('l','liter'),
	('mg','miligram'),
	('ml','mililiter'),
	('pl','polievkova lyžica');

/*!40000 ALTER TABLE `Unit` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `nick` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL DEFAULT '',
  `role` char(3) NOT NULL DEFAULT '',
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserNameUnique` (`userName`),
  KEY `FK_UserRole` (`role`),
  CONSTRAINT `FK_UserRole` FOREIGN KEY (`role`) REFERENCES `Role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `userName`, `password`, `nick`, `email`, `role`, `creationDate`)
VALUES
	(97,'2320148817997277','$2b$10$r26Yky6NQ5weTB7pg61bx.0gDvE19vLEOJO5m5RtlpuGT1iGvwPVa','Franzp','franzp31@gmail.com','USR',NULL),
	(110,'pobockovalucia@gmail.com','$2a$10$31f4cbsnhHZcwvOul7osZuk9OpbH52D1L4F/atoDNfhlpUNlYXBBm','Luculka','pobockovalucia@gmail.com','ADM','2019-03-04'),
	(111,'pobocekfrantisek@gmail.com','$2a$10$d2wfYofVZWa89ZdjRjukbu/dM/czKcEObrrvM7QXjoILjocYYyCN.','Franzp','pobocekfrantisek@gmail.com','ADM','2019-03-04');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserFoods` WRITE;
/*!40000 ALTER TABLE `UserFoods` DISABLE KEYS */;

INSERT INTO `UserFoods` (`userId`, `foodId`, `rating`)
VALUES
	(111,141,1),
	(111,145,1),
	(111,267,1),
	(111,268,1),
	(111,269,1),
	(111,275,1),
	(111,315,1),
	(111,332,1),
	(111,382,1),
	(111,479,0);

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
	(111,131,1),
	(111,135,1);

/*!40000 ALTER TABLE `UserRecipes` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
