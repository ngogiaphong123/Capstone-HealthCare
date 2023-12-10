/*
  Warnings:

  - The primary key for the `Prescription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Prescription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `MedicinePrescription` DROP FOREIGN KEY `MedicinePrescription_prescriptionId_fkey`;

-- AlterTable
ALTER TABLE `Prescription` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`appointmentId`);

-- AddForeignKey
ALTER TABLE `MedicinePrescription` ADD CONSTRAINT `MedicinePrescription_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `Prescription`(`appointmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
