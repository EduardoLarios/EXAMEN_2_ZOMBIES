-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 20, 2021 at 09:13 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zombies`
--

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

CREATE TABLE `estados` (
  `id` int(11) NOT NULL,
  `estado` varchar(40) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`id`, `estado`) VALUES
(1, 'infeccion'),
(3, 'desorientacion'),
(4, 'violencia'),
(5, 'desmayo'),
(6, 'transformacion');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`) VALUES
(1, 'soforongo@gmail.com', 'sofo123'),
(2, 'eduardo@mail.com', 'hola123'),
(3, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `zombies`
--

CREATE TABLE `zombies` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `zombies`
--

INSERT INTO `zombies` (`id`, `nombre`) VALUES
(1, 'Pichiboy69'),
(2, 'Paulita Ayala'),
(3, 'Lalongo');

-- --------------------------------------------------------

--
-- Stand-in structure for view `zombies_estados`
-- (See below for the actual view)
--
CREATE TABLE `zombies_estados` (
`nombre` varchar(100)
,`estado` varchar(40)
,`actualizado` timestamp
);

-- --------------------------------------------------------

--
-- Table structure for table `zombie_estado`
--

CREATE TABLE `zombie_estado` (
  `id` int(11) NOT NULL,
  `zombie_id` int(11) DEFAULT NULL,
  `estado_id` int(11) DEFAULT NULL,
  `actualizado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `zombie_estado`
--

INSERT INTO `zombie_estado` (`id`, `zombie_id`, `estado_id`, `actualizado`) VALUES
(1, 1, 1, '2021-10-20 15:38:50'),
(2, 2, 1, '2021-10-20 16:03:43'),
(3, 2, 3, '2021-10-20 16:03:43'),
(4, 2, 4, '2021-10-20 16:03:43'),
(5, 2, 5, '2021-10-20 16:03:43'),
(6, 3, 1, '2021-10-20 17:55:05');

-- --------------------------------------------------------

--
-- Structure for view `zombies_estados`
--
DROP TABLE IF EXISTS `zombies_estados`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `zombies_estados`  AS SELECT `nombre` AS `nombre`, `estados`.`estado` AS `estado`, `zombie_estado`.`actualizado` AS `actualizado` FROM ((`zombie_estado` join `zombies` on(`id` = `zombie_estado`.`zombie_id`)) join `estados` on(`estados`.`id` = `zombie_estado`.`estado_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zombies`
--
ALTER TABLE `zombies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zombie_estado`
--
ALTER TABLE `zombie_estado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zombie_zombie-estado` (`zombie_id`),
  ADD KEY `estado_zombie-estado` (`estado_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `estados`
--
ALTER TABLE `estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zombies`
--
ALTER TABLE `zombies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zombie_estado`
--
ALTER TABLE `zombie_estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `zombie_estado`
--
ALTER TABLE `zombie_estado`
  ADD CONSTRAINT `estado_zombie-estado` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `zombie_zombie-estado` FOREIGN KEY (`zombie_id`) REFERENCES `zombies` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
