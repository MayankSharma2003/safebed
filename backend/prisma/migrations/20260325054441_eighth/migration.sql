/*
  Warnings:

  - The primary key for the `Esp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Esp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Esp_to_user_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `espId` to the `Esp` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `espId` on the `Esp_to_user_mapping` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Esp_to_user_mapping" DROP CONSTRAINT "Esp_to_user_mapping_espId_fkey";

-- AlterTable
ALTER TABLE "Esp" DROP CONSTRAINT "Esp_pkey",
ADD COLUMN     "espId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Esp_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Esp_to_user_mapping" DROP CONSTRAINT "Esp_to_user_mapping_pkey",
DROP COLUMN "espId",
ADD COLUMN     "espId" INTEGER NOT NULL,
ADD CONSTRAINT "Esp_to_user_mapping_pkey" PRIMARY KEY ("espId");

-- AddForeignKey
ALTER TABLE "Esp_to_user_mapping" ADD CONSTRAINT "Esp_to_user_mapping_espId_fkey" FOREIGN KEY ("espId") REFERENCES "Esp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
