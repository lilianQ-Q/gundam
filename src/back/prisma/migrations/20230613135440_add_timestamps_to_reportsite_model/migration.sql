/*
  Warnings:

  - Added the required column `modifiedAt` to the `ReportSite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportSite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;
