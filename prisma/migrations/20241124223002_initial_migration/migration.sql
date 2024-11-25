/*
  Warnings:

  - You are about to drop the column `constrasena` on the `registro` table. All the data in the column will be lost.
  - Added the required column `contrasena` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registro` DROP COLUMN `constrasena`,
    ADD COLUMN `contrasena` VARCHAR(191) NOT NULL;
