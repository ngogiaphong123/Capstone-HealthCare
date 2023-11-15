/*
  Warnings:

  - You are about to drop the column `specialtyId` on the `Doctor` table. All the data in the column will be lost.
  - The primary key for the `DoctorSpecialty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DoctorSpecialty` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DoctorSpecialty` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `DoctorSpecialty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `DoctorSpecialty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_specialtyId_fkey`;

-- DropIndex
DROP INDEX `DoctorSpecialty_name_key` ON `DoctorSpecialty`;

-- AlterTable
ALTER TABLE `Doctor` DROP COLUMN `specialtyId`;

-- AlterTable
ALTER TABLE `DoctorSpecialty` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `doctorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `specialtyId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`doctorId`, `specialtyId`);

-- CreateTable
CREATE TABLE `Specialty` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Specialty_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DoctorToSpecialty` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DoctorToSpecialty_AB_unique`(`A`, `B`),
    INDEX `_DoctorToSpecialty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorSpecialty` ADD CONSTRAINT `DoctorSpecialty_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorSpecialty` ADD CONSTRAINT `DoctorSpecialty_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `Specialty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DoctorToSpecialty` ADD CONSTRAINT `_DoctorToSpecialty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DoctorToSpecialty` ADD CONSTRAINT `_DoctorToSpecialty_B_fkey` FOREIGN KEY (`B`) REFERENCES `Specialty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
