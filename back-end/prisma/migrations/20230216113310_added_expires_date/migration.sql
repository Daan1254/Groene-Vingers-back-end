/*
  Warnings:

  - Added the required column `expiresAt` to the `AccessToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AccessToken_userId_fkey` ON `accesstoken`;

-- AlterTable
ALTER TABLE `accesstoken` ADD COLUMN `expiresAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
