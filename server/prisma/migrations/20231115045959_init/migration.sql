/*
  Warnings:

  - You are about to drop the column `school` on the `DoctorEducation` table. All the data in the column will be lost.
  - You are about to alter the column `degree` on the `DoctorEducation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to drop the column `doctorId` on the `HealthRecordCondition` table. All the data in the column will be lost.
  - You are about to drop the `_DoctorToSpecialty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicalSchoolId` to the `DoctorEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `HealthRecordCondition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `HealthRecordCondition` DROP FOREIGN KEY `HealthRecordCondition_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `_DoctorToSpecialty` DROP FOREIGN KEY `_DoctorToSpecialty_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DoctorToSpecialty` DROP FOREIGN KEY `_DoctorToSpecialty_B_fkey`;

-- AlterTable
ALTER TABLE `DoctorEducation` DROP COLUMN `school`,
    ADD COLUMN `medicalSchoolId` VARCHAR(191) NOT NULL,
    MODIFY `degree` ENUM('RESIDENT_TRAINING', 'SPECIALIZED_LEVEL_1', 'SPECIALIZED_LEVEL_2', 'MASTER', 'PHD') NOT NULL;

-- AlterTable
ALTER TABLE `HealthRecordCondition` DROP COLUMN `doctorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_DoctorToSpecialty`;

-- CreateTable
CREATE TABLE `MedicalSchool` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `abbr` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MedicalSchool_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HealthRecordCondition` ADD CONSTRAINT `HealthRecordCondition_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorEducation` ADD CONSTRAINT `DoctorEducation_medicalSchoolId_fkey` FOREIGN KEY (`medicalSchoolId`) REFERENCES `MedicalSchool`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
