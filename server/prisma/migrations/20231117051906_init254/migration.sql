/*
  Warnings:

  - You are about to drop the column `userId` on the `HealthRecordCondition` table. All the data in the column will be lost.
  - Added the required column `lastUpdatedById` to the `HealthRecordCondition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `HealthRecordCondition` DROP FOREIGN KEY `HealthRecordCondition_userId_fkey`;

-- AlterTable
ALTER TABLE `HealthRecordCondition` DROP COLUMN `userId`,
    ADD COLUMN `lastUpdatedById` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `HealthRecordCondition` ADD CONSTRAINT `HealthRecordCondition_lastUpdatedById_fkey` FOREIGN KEY (`lastUpdatedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
