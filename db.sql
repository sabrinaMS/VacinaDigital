-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Maio-2020 às 02:11
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `vacinadigital`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `nurse`
--

CREATE TABLE `nurse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `coren` varchar(50) NOT NULL UNIQUE,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL UNIQUE,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `vaccine`
--

CREATE TABLE `vaccine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `vaccinelot`
--

CREATE TABLE `vaccinelot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lotNumber` varchar(50) NOT NULL UNIQUE,
  `expDate` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `vaccine_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`vaccine_id`) REFERENCES vaccine(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `vaccineshot`
--

CREATE TABLE `vaccineshot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `vaccineLot_id` int(11) NOT NULL,
  `nurse_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`vaccineLot_id`) REFERENCES vaccinelot(`id`),
  FOREIGN KEY (`nurse_id`) REFERENCES nurse(`id`),
  FOREIGN KEY (`patient_id`) REFERENCES patient(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



