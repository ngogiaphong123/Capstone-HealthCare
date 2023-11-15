/*
  Warnings:

  - Added the required column `experience` to the `DoctorSpecialty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DoctorSpecialty` ADD COLUMN `experience` INTEGER NOT NULL;
