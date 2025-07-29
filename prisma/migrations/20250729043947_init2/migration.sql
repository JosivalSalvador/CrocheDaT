/*
  Warnings:

  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photos` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionTime` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `material` VARCHAR(100) NOT NULL,
    ADD COLUMN `photos` JSON NOT NULL,
    ADD COLUMN `productionTime` VARCHAR(50) NOT NULL;
