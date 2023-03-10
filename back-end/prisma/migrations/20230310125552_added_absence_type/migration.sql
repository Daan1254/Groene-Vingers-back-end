/*
  Warnings:

  - Added the required column `type` to the `AbsenceReports` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AbsenceReports_userId_fkey` ON `absencereports`;

-- DropIndex
DROP INDEX `AccessToken_userId_fkey` ON `accesstoken`;

-- DropIndex
DROP INDEX `ProductOnShoppingCart_shoppingCartId_fkey` ON `productonshoppingcart`;

-- AlterTable
ALTER TABLE `absencereports` ADD COLUMN `type` ENUM('SICK', 'VACATION', 'OTHER') NOT NULL;

-- AddForeignKey
ALTER TABLE `AbsenceReports` ADD CONSTRAINT `AbsenceReports_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnShoppingCart` ADD CONSTRAINT `ProductOnShoppingCart_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
