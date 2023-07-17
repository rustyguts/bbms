/*
  Warnings:

  - You are about to drop the column `routeId` on the `Ship` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NavigationalStatus" AS ENUM ('MOORED', 'UNDERWAY');

-- DropForeignKey
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_routeId_fkey";

-- AlterTable
ALTER TABLE "Ship" DROP COLUMN "routeId";

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "etd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "NavigationalStatus" NOT NULL DEFAULT 'UNDERWAY',
ALTER COLUMN "speed" SET DEFAULT 10;
