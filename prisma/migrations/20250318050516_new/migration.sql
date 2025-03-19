-- DropForeignKey
ALTER TABLE `evententity` DROP FOREIGN KEY `EventEntity_userId_fkey`;

-- DropIndex
DROP INDEX `EventEntity_userId_fkey` ON `evententity`;

-- AlterTable
ALTER TABLE `evententity` ADD COLUMN `agencyId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `EventEntity` ADD CONSTRAINT `EventEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventEntity` ADD CONSTRAINT `EventEntity_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
