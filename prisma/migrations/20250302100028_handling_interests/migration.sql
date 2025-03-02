/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "InterestSelect" AS ENUM ('MODEL', 'MODEL_FREELANCE', 'PHOTOGRAPH', 'PHOTOGRAPH_FREELANCE', 'MODE_LOVER');

-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "type" "InterestSelect" NOT NULL DEFAULT 'MODE_LOVER';

-- CreateIndex
CREATE UNIQUE INDEX "Interest_type_key" ON "Interest"("type");
