/*
  Warnings:

  - You are about to drop the column `active` on the `appointment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `AbsenceReports_userUuid_fkey` ON `absencereports`;

-- DropIndex
DROP INDEX `AccessToken_userUuid_fkey` ON `accesstoken`;

-- DropIndex
DROP INDEX `Appointment_userUuid_fkey` ON `appointment`;

-- DropIndex
DROP INDEX `ProductOnCategory_categoryUuid_fkey` ON `productoncategory`;

-- DropIndex
DROP INDEX `ProductOnShoppingCart_shoppingCartId_fkey` ON `productonshoppingcart`;

-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `active`;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnCategory` ADD CONSTRAINT `ProductOnCategory_categoryUuid_fkey` FOREIGN KEY (`categoryUuid`) REFERENCES `Category`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbsenceReports` ADD CONSTRAINT `AbsenceReports_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnShoppingCart` ADD CONSTRAINT `ProductOnShoppingCart_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
