-- DropForeignKey
ALTER TABLE "ModelEntity" DROP CONSTRAINT "ModelEntity_userId_fkey";

-- AlterTable
ALTER TABLE "ModelEntity" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ModelEntity" ADD CONSTRAINT "ModelEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
