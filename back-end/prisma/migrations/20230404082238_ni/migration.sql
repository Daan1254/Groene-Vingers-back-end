/*
  Warnings:

  - You are about to drop the column `cashierUuid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `cashier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_cashierUuid_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cashierUuid`,
    ADD COLUMN `pin` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `cashier`;
