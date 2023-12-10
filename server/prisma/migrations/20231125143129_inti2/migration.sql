/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Prescription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Prescription` DROP FOREIGN KEY `Prescription_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `Prescription` DROP FOREIGN KEY `Prescription_patientId_fkey`;

-- AlterTable
ALTER TABLE `Prescription` DROP COLUMN `doctorId`,
    DROP COLUMN `patientId`;
