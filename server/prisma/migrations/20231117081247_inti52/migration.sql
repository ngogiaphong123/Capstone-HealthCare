/*
  Warnings:

  - The primary key for the `DoctorEducation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The values [ASSIOCATE_PROFESSOR] on the enum `DoctorEducation_degree` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `DoctorEducation` DROP PRIMARY KEY,
    MODIFY `degree` ENUM('DOCTOR_OF_MEDICINE', 'RESIDENT_DOCTOR', 'FIRST_DEGREE_SPECIALIST', 'SECOND_DEGREE_SPECIALIST', 'MASTER', 'PHD', 'ASSOCIATE_PROFESSOR', 'PROFESSOR') NOT NULL,
    ADD PRIMARY KEY (`doctorId`, `medicalSchoolId`, `degree`, `year`, `specialtyId`);
