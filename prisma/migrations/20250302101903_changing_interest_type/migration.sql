/*
  Warnings:

  - You are about to drop the column `type` on the `Interest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[interest_type]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Interest_type_key";

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "type",
ADD COLUMN     "interest_type" "InterestSelect" NOT NULL DEFAULT 'MODE_LOVER';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "is_work_model" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Interest_interest_type_key" ON "Interest"("interest_type");
