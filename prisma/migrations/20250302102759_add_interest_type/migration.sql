/*
  Warnings:

  - The `interest_type` column on the `Interest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "interest_type",
ADD COLUMN     "interest_type" TEXT NOT NULL DEFAULT 'MODEL_LOVER';

-- DropEnum
DROP TYPE "InterestSelect";
