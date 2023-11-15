-- AlterTable
ALTER TABLE `HealthRecord` MODIFY `birthDate` DATETIME(3) NULL,
    MODIFY `bloodType` VARCHAR(191) NULL,
    MODIFY `bmi` DOUBLE NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    MODIFY `height` INTEGER NULL,
    MODIFY `weight` INTEGER NULL;
