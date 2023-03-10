/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `AccessToken_userId_fkey` ON `accesstoken`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `indisposed` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `image`;

-- DropTable
DROP TABLE `product`;

-- CreateTable
CREATE TABLE `ShoppingCart` (
    `uuid` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShoppingCart_userId_key`(`userId`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOnShoppingCart` (
    `uuid` VARCHAR(191) NOT NULL,
    `shoppingCartId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnShoppingCart` ADD CONSTRAINT `ProductOnShoppingCart_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
