-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `notes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Condition` ADD COLUMN `severity` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW';

-- AlterTable
ALTER TABLE `HealthRecord` ADD COLUMN `title` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Medicine` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MedicinePrescription` ADD COLUMN `dosage` VARCHAR(191) NULL;
