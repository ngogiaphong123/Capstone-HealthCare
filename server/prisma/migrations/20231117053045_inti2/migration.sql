-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_id_fkey`;

-- DropForeignKey
ALTER TABLE `DoctorEducation` DROP FOREIGN KEY `DoctorEducation_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `HealthRecord` DROP FOREIGN KEY `HealthRecord_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `HealthRecordCondition` DROP FOREIGN KEY `HealthRecordCondition_conditionId_fkey`;

-- DropForeignKey
ALTER TABLE `HealthRecordCondition` DROP FOREIGN KEY `HealthRecordCondition_healthRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `Patient` DROP FOREIGN KEY `Patient_id_fkey`;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthRecord` ADD CONSTRAINT `HealthRecord_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthRecordCondition` ADD CONSTRAINT `HealthRecordCondition_healthRecordId_fkey` FOREIGN KEY (`healthRecordId`) REFERENCES `HealthRecord`(`patientId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthRecordCondition` ADD CONSTRAINT `HealthRecordCondition_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `Condition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorEducation` ADD CONSTRAINT `DoctorEducation_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
