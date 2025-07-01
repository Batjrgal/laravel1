-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2025 at 11:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carwash1`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `vehicle_number` varchar(20) DEFAULT NULL,
  `payment` enum('Бэлэн','Данс','Карт') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `service_id`, `user_id`, `vehicle_number`, `payment`, `created_at`, `updated_at`) VALUES
(7, 21, 2, '9654УБА', 'Данс', '2025-06-26 22:34:26', '2025-06-26 22:34:26'),
(8, 22, 2, '4554УБА', 'Бэлэн', '2025-06-26 22:34:37', '2025-06-26 22:34:37'),
(9, 20, 2, '9654УБА', 'Бэлэн', '2025-06-27 06:52:57', '2025-06-27 06:52:57'),
(10, 21, 3, '9654УБА', 'Данс', '2025-06-27 08:12:19', '2025-06-27 08:12:19');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_06_27_000002_create_services_table', 2),
(6, '2024_06_27_000003_create_salary_table', 2),
(7, '2024_06_27_000001_create_jobs_table', 2),
(8, '2025_06_27_024034_add_phone_role_status_to_users_table', 3),
(9, '2025_06_27_050608_create_settings_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `total_price` int(10) UNSIGNED NOT NULL,
  `base_price` int(10) UNSIGNED NOT NULL,
  `salary_percentage` int(10) UNSIGNED NOT NULL,
  `status` enum('Олгосон','Олгоогүй') NOT NULL DEFAULT 'Олгоогүй',
  `updated_by` varchar(250) NOT NULL DEFAULT 'Олгоогүй',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `user_id`, `total_price`, `base_price`, `salary_percentage`, `status`, `updated_by`, `created_at`, `updated_at`) VALUES
(4, 2, 155000, 77500, 50, 'Олгосон', 'Batjargal Munkhuu', '2025-06-26 22:34:26', '2025-06-27 08:16:44'),
(5, 3, 35000, 17500, 50, 'Олгосон', 'Batjargal Munkhuu', '2025-06-27 08:12:19', '2025-06-27 08:16:44');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `car_type` varchar(50) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `car_type`, `price`, `created_at`, `updated_at`) VALUES
(20, 'Бүтэн угаалга', 'ALPHARD & VOXY & NOAH', 65000, '2024-12-05 02:49:11', '2025-06-27 08:30:43'),
(21, 'Гадна угаалга', 'ALPHARD & VOXY & NOAH', 35000, '2024-12-05 02:49:24', '2025-06-27 08:30:43'),
(22, 'Бүтэн угаалга', 'ТОМ ЖИЙП', 55000, '2024-12-05 02:49:45', '2025-06-27 08:30:43'),
(23, 'Гадна угаалга', 'ТОМ ЖИЙП', 35000, '2024-12-05 02:50:49', '2025-06-27 08:30:43'),
(24, 'Бүтэн угаалга', 'ДУНД ЖИЙП', 50000, '2024-12-05 02:51:05', '2025-06-27 08:30:43'),
(25, 'Гадна угаалга', 'ДУНД ЖИЙП', 30000, '2024-12-05 02:51:19', '2025-06-27 08:30:43'),
(26, 'Бүтэн угаалга', 'HARRIER & RX & RAV1', 45000, '2024-12-05 02:51:42', '2025-06-27 08:30:43'),
(27, 'Гадна угаалга', 'HARRIER & RX & RAV1', 30000, '2024-12-05 02:52:01', '2025-06-27 08:30:43'),
(28, 'Бүтэн угаалга', 'PRIUS 41 & KOMBI', 40000, '2024-12-05 02:52:16', '2025-06-27 08:30:43'),
(29, 'Гадна угаалга', 'PRIUS 41 & KOMBI', 30000, '2024-12-05 02:52:24', '2025-06-27 08:30:43'),
(30, 'Бүтэн угаалга', 'PORTER', 40000, '2024-12-05 02:52:36', '2025-06-27 08:30:43'),
(31, 'Гадна угаалга', 'PORTER', 25000, '2024-12-05 02:52:44', '2025-06-27 08:30:43'),
(32, 'Бүтэн угаалга', 'ЖИЖИГ МАШИН', 35000, '2024-12-05 02:52:56', '2025-06-27 08:30:43'),
(33, 'Гадна угаалга', 'ЖИЖИГ МАШИН', 25000, '2024-12-05 02:53:06', '2025-06-27 08:30:43'),
(34, 'Ченж угаалга', 'PORTER', 90000, '2024-12-11 21:23:25', '2025-06-27 08:30:43'),
(35, 'Гадна угаалга', 'TUNDRA & PICKUP', 40000, '2025-04-03 22:15:49', '2025-06-27 08:30:49');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `description`, `created_at`, `updated_at`) VALUES
(1, 'default_salary_percentage', '50', 'Default salary percentage for employees', '2025-06-26 21:10:16', '2025-06-26 21:10:16'),
(2, 'salary_percentage', '50', 'Global salary percentage for all employees', '2025-06-26 21:17:51', '2025-06-27 07:43:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `role` enum('Admin','Employee') DEFAULT 'Employee',
  `status` enum('Идэвхтэй','Идэвхгүй') NOT NULL DEFAULT 'Идэвхтэй',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `full_name`, `email`, `phone`, `role`, `status`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Batjargal Munkhuu', NULL, 'batk32474@gmail.com', 554, 'Admin', 'Идэвхтэй', NULL, '$2y$10$3/F3Edfm4xAyKWF8OkcOC.qWY.E1rgZZu1ehAxIYIzxyFMMcnZ9Ny', NULL, '2025-06-26 19:27:00', '2025-06-26 19:27:00'),
(2, 'User', NULL, 'user@gmail.com', 0, 'Employee', 'Идэвхтэй', NULL, '$2y$10$UB4HPq/TeYQ2ad.eRp5PHey4UHbG7NqW3FMffg1O5q6J6SPK1n9fW', NULL, '2025-06-26 19:53:33', '2025-06-26 19:53:33'),
(3, 'user2', NULL, 'user2@gmail.com', 0, 'Employee', 'Идэвхтэй', NULL, '$2y$10$PmETqifZVuzCjXMyQ4DhFuqa64aEXP4nVVMTQMCBfaffFbhmUfQwq', NULL, '2025-06-27 08:11:47', '2025-06-27 08:11:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_service_id_foreign` (`service_id`),
  ADD KEY `jobs_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salary_user_id_foreign` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
