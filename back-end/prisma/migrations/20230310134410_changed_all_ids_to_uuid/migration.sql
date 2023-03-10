/*
  Warnings:

  - You are about to drop the column `userId` on the `absencereports` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `accesstoken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `shoppingcart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userUuid]` on the table `ShoppingCart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUuid` to the `AbsenceReports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `AccessToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `ShoppingCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AbsenceReports_userId_fkey` ON `absencereports`;

-- DropIndex
DROP INDEX `AccessToken_userId_fkey` ON `accesstoken`;

-- DropIndex
DROP INDEX `ProductOnShoppingCart_shoppingCartId_fkey` ON `productonshoppingcart`;

-- DropIndex
DROP INDEX `ShoppingCart_userId_key` ON `shoppingcart`;

-- AlterTable
ALTER TABLE `absencereports` DROP COLUMN `userId`,
    ADD COLUMN `userUuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `accesstoken` DROP COLUMN `userId`,
    ADD COLUMN `userUuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shoppingcart` DROP COLUMN `userId`,
    ADD COLUMN `userUuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ShoppingCart_userUuid_key` ON `ShoppingCart`(`userUuid`);

-- AddForeignKey
ALTER TABLE `AbsenceReports` ADD CONSTRAINT `AbsenceReports_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnShoppingCart` ADD CONSTRAINT `ProductOnShoppingCart_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
