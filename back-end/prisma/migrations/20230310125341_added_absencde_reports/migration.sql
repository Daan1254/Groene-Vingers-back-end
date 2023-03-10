-- DropIndex
DROP INDEX `AccessToken_userId_fkey` ON `accesstoken`;

-- DropIndex
DROP INDEX `ProductOnShoppingCart_shoppingCartId_fkey` ON `productonshoppingcart`;

-- CreateTable
CREATE TABLE `AbsenceReports` (
    `uuid` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AbsenceReports` ADD CONSTRAINT `AbsenceReports_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnShoppingCart` ADD CONSTRAINT `ProductOnShoppingCart_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
