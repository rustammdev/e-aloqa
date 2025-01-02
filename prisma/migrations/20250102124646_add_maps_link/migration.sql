/*
  Warnings:

  - Added the required column `maps_link` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "maps_link" TEXT NOT NULL;
