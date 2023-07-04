/*
  Warnings:

  - The values [CANCELLED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `orderId` INTEGER NULL AUTO_INCREMENT,
    MODIFY `status` ENUM('PROCESSING', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PROCESSING';
