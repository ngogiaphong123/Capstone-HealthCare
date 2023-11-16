/*
  Warnings:

  - The primary key for the `DoctorEducation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The values [RESIDENT_TRAINING,SPECIALIZED_LEVEL_1,SPECIALIZED_LEVEL_2] on the enum `DoctorEducation_degree` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `specialtyId` to the `DoctorEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DoctorEducation` DROP PRIMARY KEY,
    ADD COLUMN `specialtyId` VARCHAR(191) NOT NULL,
    MODIFY `degree` ENUM('DOCTOR_OF_MEDICINE', 'RESIDENT_DOCTOR', 'FIRST_DEGREE_SPECIALIST', 'SECOND_DEGREE_SPECIALIST', 'MASTER', 'PHD', 'ASSIOCATE_PROFESSOR', 'PROFESSOR') NOT NULL,
    ADD PRIMARY KEY (`doctorId`, `medicalSchoolId`, `degree`, `year`, `specialtyId`);

-- AddForeignKey
ALTER TABLE `DoctorEducation` ADD CONSTRAINT `DoctorEducation_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `Specialty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
