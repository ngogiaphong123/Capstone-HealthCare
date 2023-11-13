/*
  Warnings:

  - A unique constraint covering the columns `[avatarPublicId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatarPublicId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_avatarPublicId_key` ON `User`(`avatarPublicId`);
