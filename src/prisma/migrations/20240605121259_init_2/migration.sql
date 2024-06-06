/*
  Warnings:

  - You are about to drop the column `affiliation` on the `users` table. All the data in the column will be lost.
  - Added the required column `group` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `affiliation`,
    ADD COLUMN `group` VARCHAR(191) NOT NULL;
