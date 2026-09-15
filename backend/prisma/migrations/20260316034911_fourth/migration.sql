/*
  Warnings:

  - You are about to drop the column `bed` on the `AlertLogs` table. All the data in the column will be lost.
  - You are about to drop the column `building` on the `AlertLogs` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `AlertLogs` table. All the data in the column will be lost.
  - You are about to drop the column `floor` on the `AlertLogs` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `AlertLogs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AlertLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertLogs" DROP COLUMN "bed",
DROP COLUMN "building",
DROP COLUMN "deviceId",
DROP COLUMN "floor",
DROP COLUMN "room",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Gender" TEXT NOT NULL,
    "matId" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "bed" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BedActivity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BedActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlertLogs" ADD CONSTRAINT "AlertLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedActivity" ADD CONSTRAINT "BedActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
