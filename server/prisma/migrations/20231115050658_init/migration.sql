/*
  Warnings:

  - A unique constraint covering the columns `[name,abbr]` on the table `MedicalSchool` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `MedicalSchool_name_key` ON `MedicalSchool`;

-- CreateIndex
CREATE UNIQUE INDEX `MedicalSchool_name_abbr_key` ON `MedicalSchool`(`name`, `abbr`);
