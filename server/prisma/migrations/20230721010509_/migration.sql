/*
  Warnings:

  - Made the column `portId` on table `Route` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_portId_fkey";

-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "portId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_portId_fkey" FOREIGN KEY ("portId") REFERENCES "Port"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
