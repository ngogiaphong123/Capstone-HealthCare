/*
  Warnings:

  - You are about to alter the column `height` on the `HealthRecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `weight` on the `HealthRecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `HealthRecord` MODIFY `height` DOUBLE NULL,
    MODIFY `weight` DOUBLE NULL;
