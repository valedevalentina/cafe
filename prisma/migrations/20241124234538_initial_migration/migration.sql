/*
  Warnings:

  - Added the required column `userId` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `venta` ADD COLUMN `userId` INTEGER NOT NULL;
