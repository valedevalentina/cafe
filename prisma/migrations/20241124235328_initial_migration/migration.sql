/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Registro` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Registro_email_key` ON `Registro`(`email`);
