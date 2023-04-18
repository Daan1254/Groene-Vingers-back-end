-- DropIndex
DROP INDEX `AbsenceReports_userUuid_fkey` ON `absencereports`;

-- DropIndex
DROP INDEX `AccessToken_userUuid_fkey` ON `accesstoken`;

-- DropIndex
DROP INDEX `ProductOnShoppingCart_shoppingCartId_fkey` ON `productonshoppingcart`;

-- CreateTable
CREATE TABLE `Settings` (
    `application` VARCHAR(191) NOT NULL,
    `categoriesEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Settings_application_key`(`application`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AbsenceReports` ADD CONSTRAINT `AbsenceReports_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnShoppingCart` ADD CONSTRAINT `ProductOnShoppingCart_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
