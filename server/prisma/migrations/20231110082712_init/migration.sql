-- AlterTable
ALTER TABLE `User` MODIFY `accessToken` TEXT NULL,
    MODIFY `address` TEXT NULL,
    MODIFY `avatar` TEXT NOT NULL,
    MODIFY `refreshToken` TEXT NULL;
