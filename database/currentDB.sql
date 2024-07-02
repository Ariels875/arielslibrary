CREATE DATABASE  IF NOT EXISTS `biblioteca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `biblioteca`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: biblioteca
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Nacionalidad` varchar(100) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `idx_autores_nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'Gabriel García Márquez','Colombiana','1927-03-06'),(2,'Isabel Allende','Chilena','1942-08-02'),(3,'J.K. Rowling','Británica','1965-07-31'),(4,'Stephen King','Estadounidense','1947-09-21'),(5,'Haruki Murakami','Japonesa','1949-01-12');
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `ISBN` varchar(20) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Autor_id` int NOT NULL,
  `Anio_publicacion` int NOT NULL,
  `Genero` varchar(50) NOT NULL,
  `Descripcion` longtext NOT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `idx_libros_titulo` (`Titulo`),
  KEY `libros_ibfk_1` (`Autor_id`),
  CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`Autor_id`) REFERENCES `autores` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES ('978-0-06-054201-3','La Casa de los Espíritus',2,1982,'Realismo Mágico',''),('978-0-385-53207-2','Norwegian Wood',5,1987,'Ficción',''),('978-0-7475-3269-9','Harry Potter y la Piedra Filosofal',3,1997,'Fantasía',''),('978-1-5011-8756-6','It',4,1986,'Terror',''),('978-3-16-148410-0','Cien Años de Soledad',1,1967,'Realismo Mágico','');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Libro_ISBN` varchar(20) NOT NULL,
  `Usuario_ID` int NOT NULL,
  `Fecha_prestamo` date NOT NULL,
  `Fecha_devolucion` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `prestamos_ibfk_1` (`Libro_ISBN`),
  KEY `prestamos_ibfk_2` (`Usuario_ID`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`Libro_ISBN`) REFERENCES `libros` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`Usuario_ID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Correo_electronico` varchar(255) NOT NULL,
  `Fecha_registro` date NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Rol` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Correo_electronico_UNIQUE` (`Correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vistalibrosautores`
--

DROP TABLE IF EXISTS `vistalibrosautores`;
/*!50001 DROP VIEW IF EXISTS `vistalibrosautores`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistalibrosautores` AS SELECT 
 1 AS `ISBN`,
 1 AS `Titulo`,
 1 AS `AutorNombre`,
 1 AS `Anio_publicacion`,
 1 AS `Genero`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vistaprestamos`
--

DROP TABLE IF EXISTS `vistaprestamos`;
/*!50001 DROP VIEW IF EXISTS `vistaprestamos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistaprestamos` AS SELECT 
 1 AS `PrestamoID`,
 1 AS `LibroTitulo`,
 1 AS `UsuarioNombre`,
 1 AS `Fecha_prestamo`,
 1 AS `Fecha_devolucion`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'biblioteca'
--
/*!50003 DROP PROCEDURE IF EXISTS `AgregarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarUsuario`(
    IN p_Nombre VARCHAR(100),
    IN p_Correo_electronico VARCHAR(255),
    IN p_Fecha_registro DATE,
    IN p_Contraseña VARCHAR(255)
)
BEGIN
    INSERT INTO Usuarios (Nombre, Correo_electronico, Fecha_registro, Contraseña)
    VALUES (p_Nombre, p_Correo_electronico, p_Fecha_registro, SHA2(p_Contraseña, 256));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarPrestamo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarPrestamo`(
    IN p_Libro_ISBN VARCHAR(20),
    IN p_Usuario_ID INT,
    IN p_Fecha_prestamo DATE,
    IN p_Fecha_devolucion DATE
)
BEGIN
    INSERT INTO Prestamos (Libro_ISBN, Usuario_ID, Fecha_prestamo, Fecha_devolucion)
    VALUES (p_Libro_ISBN, p_Usuario_ID, p_Fecha_prestamo, p_Fecha_devolucion);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vistalibrosautores`
--

/*!50001 DROP VIEW IF EXISTS `vistalibrosautores`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistalibrosautores` AS select `l`.`ISBN` AS `ISBN`,`l`.`Titulo` AS `Titulo`,`a`.`Nombre` AS `AutorNombre`,`l`.`Anio_publicacion` AS `Anio_publicacion`,`l`.`Genero` AS `Genero` from (`libros` `l` join `autores` `a` on((`l`.`Autor_id` = `a`.`ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vistaprestamos`
--

/*!50001 DROP VIEW IF EXISTS `vistaprestamos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistaprestamos` AS select `p`.`ID` AS `PrestamoID`,`l`.`Titulo` AS `LibroTitulo`,`u`.`Nombre` AS `UsuarioNombre`,`p`.`Fecha_prestamo` AS `Fecha_prestamo`,`p`.`Fecha_devolucion` AS `Fecha_devolucion` from ((`prestamos` `p` join `libros` `l` on((`p`.`Libro_ISBN` = `l`.`ISBN`))) join `usuarios` `u` on((`p`.`Usuario_ID` = `u`.`ID`))) */;
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

-- Dump completed on 2024-07-01 23:37:13
