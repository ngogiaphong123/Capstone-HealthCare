/*
  Warnings:

  - You are about to drop the column `image` on the `DoctorEducation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DoctorEducation` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `MedicalSchool` ADD COLUMN `image` VARCHAR(191) NULL;
