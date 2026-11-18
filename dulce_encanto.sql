-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: dulce_encanto
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `producto_por_cliente` (`id_cliente`,`id_producto`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `tipo_piel` enum('seca','grasa','mixta','normal') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `tipo_piel` enum('seca','grasa','mixta','normal') NOT NULL,
  `categoria` enum('Labios','Ojos','Rostro','Cejas') NOT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mas_vendido` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Base líquida','Maybelline','Base para rostro acabado natural',50000.00,10,'grasa','Rostro','2026-04-22 10:02:36',0),(2,'Labial mate','L’Oréal','Labial de larga duración',30000.00,15,'seca','Labios','2026-04-22 10:02:36',0),(3,'Corrector','Maybelline','Corrector de ojeras cobertura alta',40000.00,8,'mixta','Rostro','2026-04-22 10:02:36',0),(4,'Sombras','MAC','Paleta de sombras profesional',45000.00,12,'normal','Ojos','2026-04-22 10:02:36',0),(5,'Polvo compacto','Revlon','Sella el maquillaje y controla brillo',35000.00,9,'grasa','Rostro','2026-04-22 10:02:36',0),(6,'Delineador','NYX','Delineador líquido negro intenso',25000.00,20,'normal','Ojos','2026-04-22 10:02:36',0),(7,'Rubor','MAC','Rubor en polvo tono rosado',32000.00,7,'seca','Rostro','2026-04-22 10:02:36',0),(8,'Iluminador','Fenty Beauty','Iluminador efecto glow',38000.00,6,'mixta','Rostro','2026-04-22 10:02:36',0),(9,'Máscara de pestañas','Maybelline','Rímel volumen extremo',42000.00,14,'normal','Ojos','2026-04-22 10:02:36',0),(10,'Gloss','NYX','Brillo labial hidratante',28000.00,18,'seca','Labios','2026-04-22 10:02:36',0),(11,'Primer','Smashbox','Prebase para piel grasa',47000.00,5,'grasa','Rostro','2026-04-22 10:02:36',0),(12,'Fijador de maquillaje','Urban Decay','Spray fijador de larga duración',39000.00,11,'mixta','Rostro','2026-04-22 10:02:36',0),(13,'Base líquida','Maybelline','Base para rostro acabado natural',50000.00,10,'grasa','Rostro','2026-04-22 14:01:18',0),(14,'Labial mate','L’Oréal','Labial de larga duración',30000.00,15,'seca','Labios','2026-04-22 14:01:18',0),(15,'Corrector','Maybelline','Corrector de ojeras cobertura alta',40000.00,8,'mixta','Rostro','2026-04-22 14:01:18',0),(16,'Sombras','MAC','Paleta de sombras profesional',45000.00,12,'normal','Ojos','2026-04-22 14:01:18',0),(17,'Polvo compacto','Revlon','Sella el maquillaje y controla brillo',35000.00,9,'grasa','Rostro','2026-04-22 14:01:18',0),(18,'Delineador','NYX','Delineador líquido negro intenso',25000.00,20,'normal','Ojos','2026-04-22 14:01:18',0),(19,'Rubor','MAC','Rubor en polvo tono rosado',32000.00,7,'seca','Rostro','2026-04-22 14:01:18',0),(20,'Iluminador','Fenty Beauty','Iluminador efecto glow',38000.00,6,'mixta','Rostro','2026-04-22 14:01:18',0),(21,'Máscara de pestañas','Maybelline','Rímel volumen extremo',42000.00,14,'normal','Ojos','2026-04-22 14:01:18',0),(22,'Gloss','NYX','Brillo labial hidratante',28000.00,18,'seca','Labios','2026-04-22 14:01:18',0),(23,'Primer','Smashbox','Prebase para piel grasa',47000.00,5,'grasa','Rostro','2026-04-22 14:01:18',0),(24,'Fijador de maquillaje','Urban Decay','Spray fijador de larga duración',39000.00,11,'mixta','Rostro','2026-04-22 14:01:18',0);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-09 20:58:18
