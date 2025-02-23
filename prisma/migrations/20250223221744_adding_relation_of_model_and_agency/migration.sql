/*
  Warnings:

  - Added the required column `agencyId` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "agencyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
