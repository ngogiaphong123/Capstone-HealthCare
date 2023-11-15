/*
  Warnings:

  - You are about to drop the column `severity` on the `Condition` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `HealthRecord` table. All the data in the column will be lost.
  - The primary key for the `HealthRecordCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `HealthRecordCondition` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodType` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bmi` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `composition` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sideEffects` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uses` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Condition` DROP COLUMN `severity`;

-- AlterTable
ALTER TABLE `HealthRecord` DROP COLUMN `title`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `bloodType` VARCHAR(191) NOT NULL,
    ADD COLUMN `bmi` DOUBLE NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    ADD COLUMN `height` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `HealthRecordCondition` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `note` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `severity` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    ADD PRIMARY KEY (`healthRecordId`, `conditionId`);

-- AlterTable
ALTER TABLE `Medicine` DROP COLUMN `description`,
    ADD COLUMN `composition` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `manufacturer` VARCHAR(191) NOT NULL,
    ADD COLUMN `sideEffects` VARCHAR(191) NOT NULL,
    ADD COLUMN `uses` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `DoctorEducation` (
    `id` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorEducation` ADD CONSTRAINT `DoctorEducation_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
