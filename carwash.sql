-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 27, 2025 at 12:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carwash`
--

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_number` varchar(20) DEFAULT NULL,
  `payment` enum('Бэлэн','Данс','Карт') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `service_id`, `user_id`, `vehicle_number`, `payment`, `created_at`) VALUES
(35, 18, 5, '9648УБА', 'Карт', '2024-12-06 08:50:02'),
(36, 32, 4, '4545ДАР', 'Данс', '2024-12-06 17:28:43'),
(38, 28, 5, '9895ХОА', 'Бэлэн', '2024-12-06 18:48:35'),
(42, 18, 6, '9895ХОА', 'Карт', '2024-12-07 13:04:23'),
(43, 32, 5, '4584ДАХ', 'Данс', '2024-12-12 05:25:30'),
(44, 32, 4, '4577ДАУ', 'Данс', '2024-12-24 13:28:11'),
(45, 32, 4, '9648УБА', 'Данс', '2024-12-30 18:29:14'),
(46, 18, 4, '5645ДАР', 'Данс', '2025-03-29 15:47:24'),
(47, 18, 4, '4545ДАР', 'Бэлэн', '2025-04-02 03:35:06'),
(48, 18, 4, '4545ДАР', 'Данс', '2025-04-02 03:45:11'),
(49, 18, 4, '4545ДАР', 'Данс', '2025-04-02 03:45:41'),
(50, 26, 5, '6565ДАР', 'Данс', '2025-04-04 04:37:42'),
(51, 18, 5, '1242ДАУ', 'Бэлэн', '2025-04-04 05:03:16'),
(52, 32, 6, '7884ДАХ', 'Карт', '2025-04-04 05:03:41'),
(53, 33, 4, '7812ДАР', 'Бэлэн', '2025-04-04 05:04:31'),
(54, 18, 4, '4545ДАР', 'Данс', '2025-04-04 06:16:19'),
(55, 18, 4, '4878ДАР', 'Карт', '2025-05-23 05:49:33'),
(56, 33, 4, '1234УБК', 'Карт', '2025-06-04 05:25:41'),
(57, 28, 5, '3454ДАХ', 'Карт', '2025-06-04 05:26:03'),
(58, 32, 6, '4876ДАХ', 'Бэлэн', '2025-06-04 05:26:25'),
(60, 26, 5, '5654ДАУ', 'Карт', '2025-06-04 16:04:55'),
(61, 32, 6, '8955ДАР', 'Данс', '2025-06-04 16:05:13'),
(64, 18, 4, '4878ДАР', 'Бэлэн', '2025-06-05 05:58:51'),
(65, 28, 4, '4584ДАХ', 'Бэлэн', '2025-06-18 08:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` int(50) NOT NULL,
  `base_price` int(50) NOT NULL,
  `salary_percentage` int(50) NOT NULL,
  `status` enum('Олгосон','Олгоогүй') NOT NULL DEFAULT 'Олгоогүй',
  `updated_by` varchar(250) NOT NULL DEFAULT 'Олгоогүй',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `user_id`, `total_price`, `base_price`, `salary_percentage`, `status`, `updated_by`, `created_at`) VALUES
(20, 5, 65000, 32500, 50, 'Олгосон', 'Менежер', '2024-12-06 08:50:02'),
(21, 4, 35000, 17500, 50, 'Олгосон', 'Менежер', '2024-12-06 17:28:43'),
(23, 5, 40000, 20000, 50, 'Олгосон', 'Менежер', '2024-12-06 18:48:35'),
(26, 6, 65000, 32500, 50, 'Олгосон', 'Менежер', '2024-12-07 13:04:23'),
(27, 5, 35000, 17500, 50, 'Олгосон', 'Менежер', '2024-12-12 05:25:30'),
(28, 4, 35000, 17500, 50, 'Олгосон', 'Менежер', '2024-12-24 13:28:11'),
(29, 4, 35000, 17500, 50, 'Олгосон', 'Менежер', '2024-12-30 18:29:14'),
(30, 4, 65000, 32500, 50, 'Олгосон', 'Менежер', '2025-03-29 15:47:24'),
(31, 4, 130000, 52000, 50, 'Олгосон', 'Менежер', '2025-04-02 03:35:06'),
(32, 5, 110000, 55000, 50, 'Олгосон', 'Менежер', '2025-04-04 04:37:42'),
(33, 6, 35000, 17500, 50, 'Олгосон', 'Менежер', '2025-04-04 05:03:41'),
(34, 4, 90000, 45000, 50, 'Олгосон', 'Менежер2', '2025-04-04 05:04:31'),
(35, 4, 65000, 32500, 50, 'Олгосон', 'Менежер', '2025-05-23 05:49:33'),
(36, 4, 25000, 12500, 50, 'Олгоогүй', 'Олгоогүй', '2025-06-04 05:25:41'),
(37, 5, 40000, 20000, 50, 'Олгосон', 'Менежер', '2025-06-04 05:26:03'),
(38, 6, 35000, 17500, 50, 'Олгосон', 'Менежер', '2025-06-04 05:26:25'),
(40, 5, 45000, 22500, 50, 'Олгоогүй', 'Олгоогүй', '2025-06-04 16:04:55'),
(41, 6, 35000, 17500, 50, 'Олгоогүй', 'Олгоогүй', '2025-06-04 16:05:13'),
(42, 4, 65000, 32500, 50, 'Олгосон', 'Менежер', '2025-06-05 05:58:51'),
(43, 4, 40000, 20000, 50, 'Олгоогүй', 'Олгоогүй', '2025-06-18 08:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `car_type` varchar(50) NOT NULL,
  `price` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `car_type`, `price`, `created_at`) VALUES
(18, 'Бүтэн угаалга', 'TUNDRA & PICKUP', 65000, '2024-12-05 10:42:47'),
(19, 'Гадна угаалга', 'TUNDRA & PICKUP', 40000, '2024-12-05 10:48:56'),
(20, 'Бүтэн угаалга', 'ALPHARD & VOXY & NOAH', 65000, '2024-12-05 10:49:11'),
(21, 'Гадна угаалга', 'ALPHARD & VOXY & NOAH', 35000, '2024-12-05 10:49:24'),
(22, 'Бүтэн угаалга', 'ТОМ ЖИЙП', 55000, '2024-12-05 10:49:45'),
(23, 'Гадна угаалга', 'ТОМ ЖИЙП', 35000, '2024-12-05 10:50:49'),
(24, 'Бүтэн угаалга', 'ДУНД ЖИЙП', 50000, '2024-12-05 10:51:05'),
(25, 'Гадна угаалга', 'ДУНД ЖИЙП', 30000, '2024-12-05 10:51:19'),
(26, 'Бүтэн угаалга', 'HARRIER & RX & RAV1', 45000, '2024-12-05 10:51:42'),
(27, 'Гадна угаалга', 'HARRIER & RX & RAV1', 30000, '2024-12-05 10:52:01'),
(28, 'Бүтэн угаалга', 'PRIUS 41 & KOMBI', 40000, '2024-12-05 10:52:16'),
(29, 'Гадна угаалга', 'PRIUS 41 & KOMBI', 30000, '2024-12-05 10:52:24'),
(30, 'Бүтэн угаалга', 'PORTER', 40000, '2024-12-05 10:52:36'),
(31, 'Гадна угаалга', 'PORTER', 25000, '2024-12-05 10:52:44'),
(32, 'Бүтэн угаалга', 'ЖИЖИГ МАШИН', 35000, '2024-12-05 10:52:56'),
(33, 'Гадна угаалга', 'ЖИЖИГ МАШИН', 25000, '2024-12-05 10:53:06'),
(34, 'Ченж угаалга', 'PORTER', 90000, '2024-12-12 05:23:25'),
(35, 'Гадна угаалга', 'TUNDRA & PICKUP', 400000, '2025-04-04 06:15:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Director','Manager','Employee') NOT NULL,
  `status` enum('Идэвхтэй','Идэвхгүй') NOT NULL DEFAULT 'Идэвхтэй',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `status`, `created_at`) VALUES
(1, 'Админ', 'admin@gmail.com', 12345678, '11', 'Admin', 'Идэвхтэй', '2024-12-04 12:20:48'),
(2, 'Менежер', 'manager@gmail.com', 98765432, '1', 'Manager', 'Идэвхтэй', '2024-12-04 12:20:48'),
(4, 'М. Батжаргал', 'b@gmail.com', 94217214, '1', 'Employee', 'Идэвхтэй', '2024-12-06 06:55:55'),
(5, 'Б. Санчирмаа', 's@gmail.com', 9, '1', 'Employee', 'Идэвхтэй', '2024-12-06 06:59:40'),
(6, 'М. Жанболот', 'J@gmail.com', 95444612, 'a', 'Employee', 'Идэвхтэй', '2024-12-06 18:52:37'),
(8, 'Менежер2', 'manager2@gmail.com', 1, '1', 'Manager', 'Идэвхтэй', '2025-05-19 07:11:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
