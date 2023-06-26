/*
  Warnings:

  - You are about to drop the column `statusId` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the `_ReportToSite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReportToSite" DROP CONSTRAINT "_ReportToSite_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReportToSite" DROP CONSTRAINT "_ReportToSite_B_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_statusId_fkey";

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "statusId";

-- DropTable
DROP TABLE "_ReportToSite";

-- CreateTable
CREATE TABLE "ReportSite" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "siteId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "ReportSite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportSite" ADD CONSTRAINT "ReportSite_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportSite" ADD CONSTRAINT "ReportSite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportSite" ADD CONSTRAINT "ReportSite_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
