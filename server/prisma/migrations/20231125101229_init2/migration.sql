-- AlterTable
ALTER TABLE `DoctorEducation` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `HealthRecordCondition` ADD COLUMN `from` DATETIME(3) NULL,
    ADD COLUMN `to` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Medicine` ADD COLUMN `capacity` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `bio` TEXT NULL,
    MODIFY `role` ENUM('PATIENT', 'DOCTOR', 'MANAGER') NOT NULL DEFAULT 'PATIENT';

-- CreateTable
CREATE TABLE `Manager` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
