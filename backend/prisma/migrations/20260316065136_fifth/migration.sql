/*
  Warnings:

  - You are about to drop the column `Time` on the `BedActivity` table. All the data in the column will be lost.
  - You are about to drop the column `Age` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `Users` table. All the data in the column will be lost.
  - Added the required column `age` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BedActivity" DROP COLUMN "Time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "Age",
DROP COLUMN "Gender",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;
