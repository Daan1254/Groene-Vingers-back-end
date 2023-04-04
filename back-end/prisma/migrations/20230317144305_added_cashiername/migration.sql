/*
  Warnings:

  - You are about to drop the column `userUuid` on the `cashier` table. All the data in the column will be lost.
  - Added the required column `cashierName` to the `Cashier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cashier` DROP FOREIGN KEY `Cashier_userUuid_fkey`;

-- AlterTable
ALTER TABLE `cashier` DROP COLUMN `userUuid`,
    ADD COLUMN `cashierName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `cashierUuid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cashierUuid_fkey` FOREIGN KEY (`cashierUuid`) REFERENCES `Cashier`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
