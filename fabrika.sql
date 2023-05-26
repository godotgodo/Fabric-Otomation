-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: fabrika
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employee_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `admins_employee_id_foreign` (`employee_id`),
  CONSTRAINT `admins_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'$2y$10$3WgTwLXz.xtV9HOzMYL55eWSfw0Hc9Zc88D4V0Knlje6C4Z.fx9..',1);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_production`
--

DROP TABLE IF EXISTS `daily_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_production` (
  `daily_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `total_production` int NOT NULL,
  `line_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`daily_id`),
  KEY `daily_production_line_id_foreign` (`line_id`),
  CONSTRAINT `daily_production_line_id_foreign` FOREIGN KEY (`line_id`) REFERENCES `production_lines` (`line_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=742 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_production`
--

LOCK TABLES `daily_production` WRITE;
/*!40000 ALTER TABLE `daily_production` DISABLE KEYS */;
INSERT INTO `daily_production` VALUES (377,'2023-03-28',456,5),(378,'2023-02-10',64,5),(379,'2023-04-02',364,5),(380,'2023-04-27',54,5),(381,'2022-08-19',450,5),(382,'2022-09-18',100,5),(383,'2022-11-09',28,5),(384,'2022-11-27',112,5),(385,'2023-01-22',415,5),(386,'2023-01-28',35,5),(387,'2022-05-12',477,5),(388,'2022-11-20',398,5),(389,'2023-03-16',114,5),(390,'2022-08-13',125,5),(391,'2023-04-04',69,5),(392,'2023-04-19',410,5),(393,'2022-12-18',446,5),(394,'2022-07-22',339,5),(395,'2022-07-25',314,5),(396,'2022-07-13',173,5),(397,'2022-07-11',496,5),(398,'2022-05-28',397,5),(399,'2022-05-26',379,5),(400,'2022-05-19',218,5),(401,'2023-04-09',44,5),(402,'2022-08-28',388,5),(403,'2023-02-26',439,5),(404,'2022-11-02',27,5),(405,'2022-07-02',499,5),(406,'2022-08-18',57,5),(407,'2023-01-10',87,5),(408,'2022-10-01',247,5),(409,'2023-03-25',470,5),(410,'2022-07-21',3,5),(411,'2022-10-09',351,5),(412,'2022-12-02',386,5),(413,'2022-08-25',484,5),(414,'2022-08-12',253,5),(415,'2022-10-16',234,5),(416,'2022-11-25',474,5),(417,'2022-05-17',238,5),(418,'2022-09-30',468,5),(419,'2022-10-31',63,5),(420,'2023-02-16',154,5),(421,'2022-10-03',149,5),(422,'2022-07-05',482,5),(423,'2022-12-10',344,5),(424,'2022-05-25',424,5),(425,'2022-11-13',393,5),(426,'2023-01-03',271,5),(427,'2022-10-30',463,5),(428,'2023-03-27',235,5),(429,'2022-09-16',485,5),(430,'2023-04-01',131,5),(431,'2022-09-22',204,5),(432,'2022-05-27',188,5),(433,'2022-06-16',348,5),(434,'2023-01-24',243,5),(435,'2022-06-15',245,5),(436,'2022-11-30',282,5),(437,'2022-09-14',375,5),(438,'2023-01-05',330,5),(439,'2022-06-17',9,5),(440,'2022-08-17',226,5),(441,'2022-09-09',54,5),(442,'2023-03-18',177,5),(443,'2023-04-28',61,5),(444,'2022-12-28',246,5),(445,'2022-12-15',386,5),(446,'2023-04-03',105,5),(447,'2022-11-03',262,5),(448,'2022-06-08',190,5),(449,'2023-04-06',233,5),(450,'2023-04-22',439,5),(451,'2023-04-16',360,5),(452,'2022-11-21',207,5),(453,'2023-05-05',14,5),(454,'2023-03-19',202,5),(455,'2022-07-14',197,5),(456,'2022-12-20',245,5),(457,'2022-08-08',356,5),(458,'2023-02-24',477,5),(459,'2022-05-09',65,5),(460,'2022-11-10',223,5),(461,'2022-12-24',146,5),(462,'2023-02-01',109,5),(463,'2023-03-05',335,5),(464,'2022-07-15',62,5),(465,'2023-04-08',10,5),(466,'2022-07-04',119,5),(467,'2023-02-20',318,5),(468,'2022-12-17',350,5),(469,'2023-01-31',110,5),(470,'2022-06-07',167,5),(471,'2022-11-15',316,5),(472,'2023-04-07',128,5),(473,'2022-12-30',354,5),(474,'2022-06-10',96,5),(475,'2023-01-25',296,5),(476,'2022-08-06',159,5),(477,'2022-06-29',458,5),(478,'2022-10-17',82,5),(479,'2022-11-24',406,5),(480,'2023-04-23',348,5),(481,'2022-05-23',8,5),(482,'2022-08-24',293,5),(483,'2023-02-27',236,5),(484,'2022-12-31',280,5),(485,'2022-05-22',403,5),(486,'2023-01-09',182,5),(487,'2022-05-20',54,5),(488,'2022-05-18',370,5),(489,'2023-05-04',422,5),(490,'2022-09-24',72,5),(491,'2023-05-01',217,5),(492,'2022-12-25',126,5),(493,'2023-02-23',173,5),(494,'2022-05-11',82,5),(495,'2022-09-10',309,5),(496,'2022-07-24',152,5),(497,'2022-10-10',127,5),(498,'2023-04-15',440,5),(499,'2023-05-02',202,5),(500,'2022-11-18',170,5),(501,'2022-12-01',450,5),(502,'2023-03-15',405,5),(503,'2022-11-16',350,5),(504,'2022-06-30',42,5),(505,'2023-05-09',434,5),(506,'2022-09-21',462,5),(507,'2023-03-21',252,5),(508,'2023-01-17',319,5),(509,'2022-05-13',158,5),(510,'2023-04-11',12,5),(511,'2022-07-30',97,5),(512,'2023-02-25',139,5),(513,'2023-03-07',262,5),(514,'2022-11-17',125,5),(515,'2023-02-22',454,5),(516,'2022-06-01',435,5),(517,'2022-10-02',151,5),(518,'2022-11-04',248,5),(519,'2023-03-02',285,5),(520,'2022-06-25',21,5),(521,'2023-04-05',484,5),(522,'2022-09-27',19,5),(523,'2022-11-07',361,5),(524,'2023-02-15',193,5),(525,'2023-02-11',375,5),(526,'2022-09-05',90,5),(527,'2022-10-22',442,5),(528,'2022-12-22',454,5),(529,'2022-06-24',23,5),(530,'2022-09-13',179,5),(531,'2022-12-03',480,5),(532,'2023-04-25',390,5),(533,'2022-07-01',49,5),(534,'2022-11-05',321,5),(535,'2022-05-15',324,5),(536,'2023-03-10',435,5),(537,'2022-06-27',483,5),(538,'2022-07-23',110,5),(539,'2023-04-26',260,5),(540,'2022-08-05',209,5),(541,'2023-03-11',93,5),(542,'2023-01-02',498,5),(543,'2022-12-27',363,5),(544,'2023-02-04',317,5),(545,'2023-03-06',467,5),(546,'2022-10-15',163,5),(547,'2022-11-14',40,5),(548,'2023-01-15',326,5),(549,'2022-09-29',126,5),(550,'2022-07-17',287,5),(551,'2023-02-12',118,5),(552,'2022-12-06',483,5),(553,'2022-11-06',197,5),(554,'2023-05-07',134,5),(555,'2022-07-29',99,5),(556,'2022-11-29',287,5),(557,'2022-12-09',376,5),(558,'2022-08-29',457,5),(559,'2022-09-19',368,5),(560,'2023-03-04',23,5),(561,'2023-03-09',442,5),(562,'2022-06-12',76,5),(563,'2022-08-21',383,5),(564,'2022-10-25',17,5),(565,'2022-08-03',377,5),(566,'2023-03-03',494,5),(567,'2022-09-02',304,5),(568,'2022-08-23',263,5),(569,'2022-07-20',274,5),(570,'2022-10-26',354,5),(571,'2022-08-16',57,5),(572,'2023-03-14',47,5),(573,'2022-06-28',149,5),(574,'2022-08-11',150,5),(575,'2022-06-04',130,5),(576,'2023-01-13',14,5),(577,'2023-05-03',409,5),(578,'2022-08-15',449,5),(579,'2022-09-23',116,5),(580,'2022-07-07',305,5),(581,'2023-05-08',236,5),(582,'2022-07-31',359,5),(583,'2023-02-13',491,5),(584,'2022-10-24',268,5),(585,'2023-03-08',302,5),(586,'2022-12-26',319,5),(587,'2022-09-04',480,5),(588,'2022-10-04',406,5),(589,'2022-09-11',169,5),(590,'2022-10-06',110,5),(591,'2023-01-21',274,5),(592,'2022-09-26',391,5),(593,'2022-06-20',412,5),(594,'2023-03-24',432,5),(595,'2022-08-14',59,5),(596,'2022-07-26',165,5),(597,'2022-10-19',16,5),(598,'2023-02-19',461,5),(599,'2022-09-25',178,5),(600,'2022-11-23',190,5),(601,'2022-07-19',242,5),(602,'2023-04-12',72,5),(603,'2022-10-13',118,5),(604,'2022-06-13',99,5),(605,'2022-08-20',123,5),(606,'2022-05-24',466,5),(607,'2022-06-05',141,5),(608,'2022-12-29',168,5),(609,'2022-06-21',231,5),(610,'2023-03-26',349,5),(611,'2022-05-16',435,5),(612,'2023-01-23',234,5),(613,'2022-11-28',212,5),(614,'2022-12-16',263,5),(615,'2022-06-06',131,5),(616,'2023-01-11',386,5),(617,'2022-12-14',21,5),(618,'2023-04-29',212,5),(619,'2022-06-11',75,5),(620,'2022-09-12',345,5),(621,'2023-03-20',225,5),(622,'2022-07-27',174,5),(623,'2022-10-08',22,5),(624,'2022-08-04',424,5),(625,'2022-10-18',228,5),(626,'2023-02-06',423,5),(627,'2023-03-17',115,5),(628,'2023-02-18',462,5),(629,'2023-01-07',469,5),(630,'2023-01-14',495,5),(631,'2023-03-23',227,5),(632,'2023-02-09',274,5),(633,'2022-11-11',421,5),(634,'2022-06-14',2,5),(635,'2023-01-06',458,5),(636,'2023-02-02',466,5),(637,'2022-09-07',3,5),(638,'2022-09-20',116,5),(639,'2023-01-20',82,5),(640,'2022-05-21',275,5),(641,'2022-10-05',334,5),(642,'2022-12-04',21,5),(643,'2022-09-06',330,5),(644,'2022-07-06',305,5),(645,'2022-08-26',431,5),(646,'2022-05-30',489,5),(647,'2022-07-12',130,5),(648,'2022-08-10',139,5),(649,'2023-01-26',2,5),(650,'2022-08-01',101,5),(651,'2023-01-18',471,5),(652,'2022-11-26',479,5),(653,'2022-07-18',2,5),(654,'2022-12-08',365,5),(655,'2022-12-19',79,5),(656,'2023-03-01',84,5),(657,'2022-07-28',170,5),(658,'2023-03-30',401,5),(659,'2022-06-22',401,5),(660,'2022-10-20',364,5),(661,'2022-07-08',272,5),(662,'2022-08-22',325,5),(663,'2023-01-12',266,5),(664,'2022-09-03',163,5),(665,'2023-04-14',241,5),(666,'2022-11-12',304,5),(667,'2022-10-21',78,5),(668,'2022-11-08',375,5),(669,'2022-10-29',189,5),(670,'2023-04-21',307,5),(671,'2023-02-14',328,5),(672,'2023-02-03',334,5),(673,'2022-05-31',238,5),(674,'2022-12-12',211,5),(675,'2022-07-10',16,5),(676,'2022-05-10',359,5),(677,'2022-10-12',217,5),(678,'2022-12-13',275,5),(679,'2022-12-11',309,5),(680,'2022-06-19',2,5),(681,'2022-09-08',413,5),(682,'2022-12-07',52,5),(683,'2022-08-02',2,5),(684,'2022-09-01',132,5),(685,'2022-08-30',318,5),(686,'2022-08-27',259,5),(687,'2022-10-11',96,5),(688,'2022-12-23',293,5),(689,'2023-04-24',255,5),(690,'2022-06-03',482,5),(691,'2022-09-17',348,5),(692,'2022-08-09',320,5),(693,'2022-09-15',328,5),(694,'2022-05-29',332,5),(695,'2023-03-31',435,5),(696,'2023-01-29',332,5),(697,'2023-02-17',146,5),(698,'2022-06-02',259,5),(699,'2022-06-18',475,5),(700,'2022-11-22',302,5),(701,'2023-01-19',187,5),(702,'2022-12-21',6,5),(703,'2022-07-16',453,5),(704,'2023-02-05',163,5),(705,'2023-02-08',156,5),(706,'2023-04-13',52,5),(707,'2022-07-09',247,5),(708,'2023-02-07',452,5),(709,'2022-06-23',107,5),(710,'2023-04-30',57,5),(711,'2023-01-01',42,5),(712,'2022-10-27',38,5),(713,'2023-04-10',8,5),(714,'2023-02-28',372,5),(715,'2023-05-06',326,5),(716,'2022-10-14',241,5),(717,'2023-01-08',167,5),(718,'2023-04-17',77,5),(719,'2022-06-26',433,5),(720,'2022-06-09',410,5),(721,'2022-07-03',494,5),(722,'2023-04-18',448,5),(723,'2022-05-14',272,5),(724,'2023-01-16',326,5),(725,'2023-01-04',425,5),(726,'2023-03-22',373,5),(727,'2022-10-23',269,5),(728,'2022-11-01',140,5),(729,'2023-03-29',376,5),(730,'2023-01-27',91,5),(731,'2022-09-28',287,5),(732,'2022-10-28',408,5),(733,'2022-11-19',325,5),(734,'2022-08-07',278,5),(735,'2023-04-20',208,5),(736,'2023-03-13',466,5),(737,'2022-10-07',393,5),(738,'2022-08-31',66,5),(739,'2023-01-30',282,5),(740,'2022-12-05',83,5),(741,'2023-02-21',42,5);
/*!40000 ALTER TABLE `daily_production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tc_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` int NOT NULL,
  `date_of_start` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employees_email_unique` (`email`),
  UNIQUE KEY `employees_tc_no_unique` (`tc_no`),
  UNIQUE KEY `employees_phone_number_unique` (`phone_number`),
  KEY `idx_employees_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'deneme','admin@admin.com','2312312321','0505050505',1515,'2023-04-30 21:00:00'),(2,'ahmeta','ahmet@ahmet.com','23456789012','05011011010',10,'2023-03-04 21:00:00');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machines`
--

DROP TABLE IF EXISTS `machines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machines` (
  `machine_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `machine_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maintenance_date` timestamp NULL DEFAULT NULL,
  `line_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`machine_id`),
  KEY `machines_line_id_foreign` (`line_id`),
  CONSTRAINT `machines_line_id_foreign` FOREIGN KEY (`line_id`) REFERENCES `production_lines` (`line_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machines`
--

LOCK TABLES `machines` WRITE;
/*!40000 ALTER TABLE `machines` DISABLE KEYS */;
INSERT INTO `machines` VALUES (5,'Makine5','2023-04-30 17:17:23',4),(6,'Makine3',NULL,1),(7,'Makine2','2023-05-02 19:10:36',1),(8,'Makine1',NULL,3);
/*!40000 ALTER TABLE `machines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (60,'2014_10_12_000000_create_users_table',1),(61,'2014_10_12_100000_create_password_resets_table',1),(62,'2019_08_19_000000_create_failed_jobs_table',1),(63,'2019_12_14_000001_create_personal_access_tokens_table',1),(64,'2023_04_28_161408_urunler',1),(65,'2023_04_29_175231_production_lines',1),(66,'2023_04_29_213143_daily_production',1),(67,'2023_04_30_152615_machines',2),(68,'2023_04_30_205204_employees',3),(70,'2023_05_01_134033_admins',4),(71,'2023_05_02_120219_order_of_operations',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_of_operations`
--

DROP TABLE IF EXISTS `order_of_operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_of_operations` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `starting_date` timestamp NOT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `order_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `machine_id` bigint unsigned NOT NULL,
  `employee_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_of_operations_machine_id_foreign` (`machine_id`),
  KEY `order_of_operations_employee_id_foreign` (`employee_id`),
  CONSTRAINT `order_of_operations_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `order_of_operations_machine_id_foreign` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`machine_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_of_operations`
--

LOCK TABLES `order_of_operations` WRITE;
/*!40000 ALTER TABLE `order_of_operations` DISABLE KEYS */;
INSERT INTO `order_of_operations` VALUES (2,'2023-05-02 12:29:27','2023-05-02 12:30:27','Aga makineyi patlatma ya',5,1),(3,'2023-05-03 12:29:39','2023-05-02 12:30:35','Bu da ikinci iş hayırlı olsun',5,1),(4,'2023-05-02 12:29:49','2023-05-02 19:27:53','Al bu da 3',5,1);
/*!40000 ALTER TABLE `order_of_operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\Admin',4,'token','ac60ab1b403cd2c8787f61382b731fb9b666575c34cd585ab85ac4a2395b5cc2','[\"*\"]',NULL,'2023-05-01 11:30:51','2023-05-01 11:30:51'),(17,'App\\Models\\Admin',1,'token','4b4098da72c602d3cfb65b2cf53155afa586e42a81887e9fbd233982cf96ab7a','[\"*\"]','2023-05-02 19:32:32','2023-05-02 19:13:24','2023-05-02 19:32:32'),(18,'App\\Models\\Admin',1,'token','2cfb2f8ee97518bfaaa4a9f77ddf14909d92d61a9a4e2184cddf50f17ecafe94','[\"*\"]','2023-05-09 10:16:43','2023-05-09 10:15:02','2023-05-09 10:16:43'),(19,'App\\Models\\Admin',1,'token','b44ba30ea79c33b3dcff306837ea3bb9f1a0beab120262b1d6e7f239527af964','[\"*\"]','2023-05-09 12:48:30','2023-05-09 12:46:59','2023-05-09 12:48:30'),(20,'App\\Models\\Admin',1,'token','ca9e5f3ee8c389d82cef7c83b6542ec1b80a943c2d920ac49ada50f4fe6d3368','[\"*\"]','2023-05-12 08:28:13','2023-05-12 08:23:33','2023-05-12 08:28:13'),(21,'App\\Models\\Admin',1,'token','fcfbf11687d74ea960e450a203f8f4a5896f03df39e74c78d4b157296c06055b','[\"*\"]','2023-05-13 15:08:11','2023-05-13 14:21:33','2023-05-13 15:08:11'),(22,'App\\Models\\Admin',1,'token','a52e661c794bdfb462302bf328e437005f4818f901b2759595b6d74b5a67242d','[\"*\"]','2023-05-13 17:23:20','2023-05-13 16:22:24','2023-05-13 17:23:20'),(23,'App\\Models\\Admin',1,'token','0ef2dd466273b2a0dbb9261dba2ba1e248fc320e9ca6ad958f3f889b8f554a41','[\"*\"]','2023-05-13 17:09:13','2023-05-13 17:08:42','2023-05-13 17:09:13');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_lines`
--

DROP TABLE IF EXISTS `production_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_lines` (
  `line_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `line_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `starting_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`line_id`),
  KEY `production_lines_product_id_foreign` (`product_id`),
  CONSTRAINT `production_lines_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_lines`
--

LOCK TABLES `production_lines` WRITE;
/*!40000 ALTER TABLE `production_lines` DISABLE KEYS */;
INSERT INTO `production_lines` VALUES (1,'Hat1','2023-04-29 19:56:29','2023-05-02 19:11:28',1),(3,'LINE1','2023-05-12 08:26:22','2023-05-13 17:09:13',8),(4,'LINE2','2023-04-29 19:57:00','2023-05-13 17:09:13',9),(5,'LINE3','2023-04-29 19:57:07',NULL,10),(6,'denemeee','2023-05-13 17:23:20',NULL,8);
/*!40000 ALTER TABLE `production_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'PRODUCT1','TEST'),(8,'deneme','deneme'),(9,'deneme2','deneme2'),(10,'deneme3','deneme3');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `recent_completed_tasks`
--

DROP TABLE IF EXISTS `recent_completed_tasks`;
/*!50001 DROP VIEW IF EXISTS `recent_completed_tasks`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `recent_completed_tasks` AS SELECT 
 1 AS `order_id`,
 1 AS `employee_id`,
 1 AS `order_description`,
 1 AS `end_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `recent_completed_tasks`
--

/*!50001 DROP VIEW IF EXISTS `recent_completed_tasks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `recent_completed_tasks` AS select `order_of_operations`.`order_id` AS `order_id`,`order_of_operations`.`employee_id` AS `employee_id`,`order_of_operations`.`order_description` AS `order_description`,`order_of_operations`.`end_date` AS `end_date` from `order_of_operations` where ((`order_of_operations`.`starting_date` >= (curdate() - interval 30 day)) and (`order_of_operations`.`end_date` is not null)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-26  0:58:26
