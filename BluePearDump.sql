-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 30, 2019 at 05:59 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bluepear`
--
CREATE DATABASE IF NOT EXISTS `bluepear` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bluepear`;

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
CREATE TABLE IF NOT EXISTS `managers` (
  `username` varchar(128) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`username`, `password`) VALUES
('Tanja', 'tanjatanja');

-- --------------------------------------------------------

--
-- Table structure for table `peers`
--

DROP TABLE IF EXISTS `peers`;
CREATE TABLE IF NOT EXISTS `peers` (
  `username` varchar(128) NOT NULL,
  `password` varchar(64) NOT NULL,
  `savefile` mediumblob,
  `eval_status` enum('not started','unfinished','finished') NOT NULL DEFAULT 'not started',
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `peers`
--

INSERT INTO `peers` (`username`, `password`, `savefile`, `eval_status`) VALUES
('alexander.tan', '12345678', NULL, 'not started'),
('angela.pagkalinawan', '12345678', NULL, 'not started'),
('erica.sta_cruz', '12345678', NULL, 'not started'),
('hans.go', '12345678', NULL, 'not started'),
('james.baylon', '12345678', NULL, 'not started'),
('jimalene.dela_cruz', '12345678', NULL, 'not started'),
('joseph.divina', '12345678', NULL, 'not started'),
('kim.bandeleon', '12345678', NULL, 'not started'),
('louel.lagasca', 'lmdl.8298', NULL, 'not started'),
('mikee.ojastro', '12345678', NULL, 'not started'),
('ral.itong', '12345678', NULL, 'not started'),
('raphael.orbe', '12345678', NULL, 'not started'),
('shayne.ulep', '12345678', NULL, 'not started'),
('xyrus.manongsong', '12345678', NULL, 'not started');

-- --------------------------------------------------------

--
-- Table structure for table `questionnaires`
--

DROP TABLE IF EXISTS `questionnaires`;
CREATE TABLE IF NOT EXISTS `questionnaires` (
  `filename` varchar(200) NOT NULL,
  `teams` varchar(10000) NOT NULL,
  `file` mediumblob NOT NULL,
  `status` enum('inactive','active') NOT NULL DEFAULT 'inactive',
  PRIMARY KEY (`filename`),
  UNIQUE KEY `filename_UNIQUE` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE IF NOT EXISTS `teams` (
  `teamname` varchar(128) NOT NULL,
  `members` varchar(10000) NOT NULL,
  PRIMARY KEY (`teamname`),
  UNIQUE KEY `teamname_UNIQUE` (`teamname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
