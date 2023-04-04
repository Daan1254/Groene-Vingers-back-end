/*
  Warnings:

  - A unique constraint covering the columns `[cashierName]` on the table `Cashier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cashier_cashierName_key` ON `Cashier`(`cashierName`);
