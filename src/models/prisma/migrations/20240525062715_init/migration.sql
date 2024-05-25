-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `affiliation` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_userId_key`(`userId`),
    UNIQUE INDEX `users_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `survey_responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `breakfastDay1` BOOLEAN NOT NULL,
    `lunchDay1` BOOLEAN NOT NULL,
    `dinnerDay1` BOOLEAN NOT NULL,
    `breakfastDay2` BOOLEAN NOT NULL,
    `lunchDay2` BOOLEAN NOT NULL,
    `dinnerDay2` BOOLEAN NOT NULL,
    `breakfastDay3` BOOLEAN NOT NULL,
    `lunchDay3` BOOLEAN NOT NULL,
    `transportType` VARCHAR(191) NOT NULL,
    `carPlate` VARCHAR(191) NULL,
    `ssn` VARCHAR(191) NOT NULL,
    `insurance` BOOLEAN NOT NULL,

    UNIQUE INDEX `survey_responses_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `retreat_infos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `feePaid` BOOLEAN NOT NULL,
    `onsiteRegistration` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `survey_responses` ADD CONSTRAINT `survey_responses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `retreat_infos` ADD CONSTRAINT `retreat_infos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
