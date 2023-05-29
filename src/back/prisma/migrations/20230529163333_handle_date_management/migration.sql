/*
  Warnings:

  - Added the required column `modifiedAt` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `sites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `sites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `sites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `sites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sites" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "interval" TEXT NOT NULL,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "status" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "types" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;
