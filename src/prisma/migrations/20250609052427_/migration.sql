/*
  Warnings:

  - You are about to drop the `chat_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chat_log` DROP FOREIGN KEY `chat_log_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `chat_log` DROP FOREIGN KEY `chat_log_senderId_fkey`;

-- DropTable
DROP TABLE `chat_log`;

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    INDEX `Chat_roomId_idx`(`roomId`),
    INDEX `Chat_senderId_idx`(`senderId`),
    UNIQUE INDEX `Chat_senderId_roomId_message_timestamp_key`(`senderId`, `roomId`, `message`, `timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `CarpoolRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
