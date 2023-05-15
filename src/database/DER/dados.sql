-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: dados_loja_tech
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.10.1

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
-- Table structure for table `carrinho`
--

DROP TABLE IF EXISTS `carrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrinho` (
  `id_carrinho` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `valor_total` decimal(9,2) DEFAULT NULL,
  PRIMARY KEY (`id_carrinho`,`id_usuario`),
  UNIQUE KEY `id_carrinho_UNIQUE` (`id_carrinho`),
  KEY `fk_carrinho_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_carrinho_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrinho`
--

LOCK TABLES `carrinho` WRITE;
/*!40000 ALTER TABLE `carrinho` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrinho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id_departamento` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_departamento`),
  UNIQUE KEY `id_departamento_UNIQUE` (`id_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'computador'),(2,'hardware'),(3,'periferico'),(4,'notebook'),(5,'kit upgrade'),(6,'cadeira gamer'),(7,'monitor'),(8,'celular'),(9,'game');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id_endereco` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `cep` varchar(20) NOT NULL,
  `rua` varchar(200) NOT NULL,
  `numero` int NOT NULL,
  `bairro` varchar(200) NOT NULL,
  `cidade` varchar(200) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `complemento` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`),
  UNIQUE KEY `id_endereco_UNIQUE` (`id_endereco`),
  KEY `fk_endereco_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_endereco_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (2,11,'3243243','24234',2433234,'432244','234323','32322','32342323'),(3,12,'000000000','bla bla bla',666,'tistreza','depreçaum','infelizlandia','');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagem`
--

DROP TABLE IF EXISTS `imagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagem` (
  `id_imagem` int NOT NULL AUTO_INCREMENT,
  `id_produto` int NOT NULL,
  `caminho` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagem`),
  UNIQUE KEY `id_imagem_UNIQUE` (`id_imagem`),
  KEY `fk_imagem_produto1_idx` (`id_produto`),
  CONSTRAINT `fk_imagem_produto1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagem`
--

LOCK TABLES `imagem` WRITE;
/*!40000 ALTER TABLE `imagem` DISABLE KEYS */;
INSERT INTO `imagem` VALUES (3,10,'/images/productImages/multerImages/1683862377287-uma-historia-totalmente-aleatoria-interativa-6353447-300820162245.jpg'),(4,11,'/images/productImages/multerImages/1683863092306-download.jpeg'),(5,12,'/images/productImages/multerImages/1683914724060-Simbolo-da-criptomoeda-meme-Bonk-Inu-utiliza-imagem-da-raca-de-cachorros-Shiba-Inu.jpg.webp'),(6,12,'/images/productImages/multerImages/1683914724062-c3021651670432f75831e8db7d037f04bf237b2e7dbe2c14c15eea0ec5141166_1.jpg'),(7,12,'/images/productImages/multerImages/1683914724065-218-1644073113-1754471975.webp');
/*!40000 ALTER TABLE `imagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_carrinho`
--

DROP TABLE IF EXISTS `item_carrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_carrinho` (
  `id_produto` int NOT NULL,
  `id_carrinho` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`id_produto`,`id_carrinho`),
  KEY `fk_produto_has_carrinho_carrinho1_idx` (`id_carrinho`),
  KEY `fk_produto_has_carrinho_produto1_idx` (`id_produto`),
  CONSTRAINT `fk_produto_has_carrinho_carrinho1` FOREIGN KEY (`id_carrinho`) REFERENCES `carrinho` (`id_carrinho`),
  CONSTRAINT `fk_produto_has_carrinho_produto1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_carrinho`
--

LOCK TABLES `item_carrinho` WRITE;
/*!40000 ALTER TABLE `item_carrinho` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_carrinho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_pedido`
--

DROP TABLE IF EXISTS `item_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_pedido` (
  `produto_id_produto` int NOT NULL,
  `pedido_id_pedido` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`produto_id_produto`,`pedido_id_pedido`),
  KEY `fk_produto_has_pedido_pedido1_idx` (`pedido_id_pedido`),
  KEY `fk_produto_has_pedido_produto1_idx` (`produto_id_produto`),
  CONSTRAINT `fk_produto_has_pedido_pedido1` FOREIGN KEY (`pedido_id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `fk_produto_has_pedido_produto1` FOREIGN KEY (`produto_id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_pedido`
--

LOCK TABLES `item_pedido` WRITE;
/*!40000 ALTER TABLE `item_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `valor_total` decimal(9,2) NOT NULL,
  `data` date NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `id_pedido_UNIQUE` (`id_pedido`),
  KEY `fk_pedido_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_pedido_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `fabricante` varchar(45) DEFAULT NULL,
  `id_departamento` int NOT NULL,
  `id_sub_departamento` int DEFAULT NULL,
  `descricao` text,
  PRIMARY KEY (`id_produto`),
  UNIQUE KEY `id_produto_UNIQUE` (`id_produto`),
  KEY `fk_produto_departamento1_idx` (`id_departamento`),
  KEY `fk_produto_sub_departamento1_idx` (`id_sub_departamento`),
  CONSTRAINT `fk_produto_departamento1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`),
  CONSTRAINT `fk_produto_sub_departamento1` FOREIGN KEY (`id_sub_departamento`) REFERENCES `sub_departamento` (`id_sub_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (10,'Produto Teste',999999.99,'LogiTeste',4,18,'rewreewww'),(11,'produto teste 2',1999999.99,'MultiTeste',1,1,NULL),(12,'Outro produto Teste',666.00,'testovsky',2,5,NULL);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_departamento`
--

DROP TABLE IF EXISTS `sub_departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_departamento` (
  `id_sub_departamento` int NOT NULL AUTO_INCREMENT,
  `id_departamento` int NOT NULL,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_sub_departamento`),
  UNIQUE KEY `id_sub_departamento_UNIQUE` (`id_sub_departamento`),
  KEY `fk_sub_departamento_departamento1_idx` (`id_departamento`),
  CONSTRAINT `fk_sub_departamento_departamento1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_departamento`
--

LOCK TABLES `sub_departamento` WRITE;
/*!40000 ALTER TABLE `sub_departamento` DISABLE KEYS */;
INSERT INTO `sub_departamento` VALUES (1,1,'pc gamer'),(2,1,'pc casual'),(3,1,'pc home office'),(4,2,'processador'),(5,2,'placa de video'),(6,2,'placa mae'),(7,2,'memoria'),(8,2,'armazenamento'),(9,2,'refrigeramento'),(12,3,'teclado'),(13,3,'mouse'),(14,3,'fone'),(15,3,'headset'),(16,3,'webcam'),(17,3,'kits perifericos'),(18,4,'macbook'),(19,4,'notebook gamer'),(20,4,'notebook escritorio');
/*!40000 ALTER TABLE `sub_departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `cpf` varchar(45) NOT NULL,
  `telefone` varchar(45) NOT NULL,
  `data_nasc` date NOT NULL,
  `adm` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `senha_UNIQUE` (`senha`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (11,'Usuario Teste','usuarioTeste2@gmail.com','$2b$10$ltANQQRc4bNiD/jmDgCEDORzFi5ktbaqsFIwsJ6zEfjeyydpd1D6W','11111111111','43443223','2023-05-16',0),(12,'Thiago Machado','thiago@gmail.com','$2b$10$7Vm8zGTq9S8u69YYBM6YcOh7MMkEC2bqNsxFn9zwUvumjFlC9LE/u','00000000000','00000000000','2023-05-10',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-14 22:28:32
