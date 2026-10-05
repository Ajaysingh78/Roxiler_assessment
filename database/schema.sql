-- ==========================================================
-- Roxiler Systems Store Rating Platform
-- Database: MySQL 8.0
-- Charset: utf8mb4, Collation: utf8mb4_unicode_ci
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `roxiler_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `roxiler_db`;

-- 1. Users Table
-- Supports roles: 'ADMIN', 'USER', 'STORE_OWNER'
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `address` VARCHAR(400) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'USER',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  INDEX `users_role_idx` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Stores Table
-- Owned optionally by a User with role 'STORE_OWNER'
CREATE TABLE IF NOT EXISTS `stores` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `address` VARCHAR(400) NOT NULL,
  `ownerId` VARCHAR(36) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `stores_email_key` (`email`),
  INDEX `stores_ownerId_idx` (`ownerId`),
  CONSTRAINT `stores_ownerId_fkey` FOREIGN KEY (`ownerId`) 
    REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Ratings Table
-- Normal Users submit ratings strictly between 1 and 5
CREATE TABLE IF NOT EXISTS `ratings` (
  `id` VARCHAR(36) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `storeId` VARCHAR(36) NOT NULL,
  `rating` INT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ratings_userId_storeId_key` (`userId`, `storeId`),
  INDEX `ratings_storeId_idx` (`storeId`),
  CONSTRAINT `ratings_userId_fkey` FOREIGN KEY (`userId`) 
    REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_storeId_fkey` FOREIGN KEY (`storeId`) 
    REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
