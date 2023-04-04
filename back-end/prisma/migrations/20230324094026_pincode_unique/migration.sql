/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `Cashier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Cashier_cashierName_key` ON `cashier`;

-- CreateIndex
CREATE UNIQUE INDEX `Cashier_pin_key` ON `Cashier`(`pin`);
