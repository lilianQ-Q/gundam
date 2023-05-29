/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ReportToSite" DROP CONSTRAINT "_ReportToSite_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReportToSite" DROP CONSTRAINT "_ReportToSite_B_fkey";

-- DropForeignKey
ALTER TABLE "_ReportToTag" DROP CONSTRAINT "_ReportToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReportToTag" DROP CONSTRAINT "_ReportToTag_B_fkey";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Site";

-- DropTable
DROP TABLE "Status";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "sites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToSite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToSite_AB_unique" ON "_GroupToSite"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToSite_B_index" ON "_GroupToSite"("B");

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReportToSite" ADD CONSTRAINT "_ReportToSite_A_fkey" FOREIGN KEY ("A") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReportToSite" ADD CONSTRAINT "_ReportToSite_B_fkey" FOREIGN KEY ("B") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReportToTag" ADD CONSTRAINT "_ReportToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReportToTag" ADD CONSTRAINT "_ReportToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSite" ADD CONSTRAINT "_GroupToSite_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSite" ADD CONSTRAINT "_GroupToSite_B_fkey" FOREIGN KEY ("B") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
