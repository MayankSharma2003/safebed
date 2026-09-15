/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `matId` on the `Users` table. All the data in the column will be lost.
  - The `id` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `AlertLogs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `BedActivity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AlertLogs" DROP CONSTRAINT "AlertLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "BedActivity" DROP CONSTRAINT "BedActivity_userId_fkey";

-- AlterTable
ALTER TABLE "AlertLogs" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BedActivity" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "matId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Esp" (
    "id" TEXT NOT NULL,
    "matId" TEXT NOT NULL,

    CONSTRAINT "Esp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Esp_to_user_mapping" (
    "espId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Esp_to_user_mapping_pkey" PRIMARY KEY ("espId")
);

-- AddForeignKey
ALTER TABLE "Esp_to_user_mapping" ADD CONSTRAINT "Esp_to_user_mapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Esp_to_user_mapping" ADD CONSTRAINT "Esp_to_user_mapping_espId_fkey" FOREIGN KEY ("espId") REFERENCES "Esp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertLogs" ADD CONSTRAINT "AlertLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedActivity" ADD CONSTRAINT "BedActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
