/*
  Warnings:

  - You are about to drop the column `type` on the `Condition` table. All the data in the column will be lost.
  - Added the required column `type` to the `HealthRecordCondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Condition` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `HealthRecordCondition` ADD COLUMN `type` ENUM('DISEASE', 'ALLERGY', 'SYMPTOM', 'PAST_SURGERY', 'FAMILY_HISTORY', 'OTHER') NOT NULL;
