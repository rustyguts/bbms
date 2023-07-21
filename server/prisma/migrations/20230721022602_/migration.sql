/*
  Warnings:

  - Made the column `portOfArrivalId` on table `Route` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portOfDepartureId` on table `Route` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_portOfArrivalId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_portOfDepartureId_fkey";

-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "portOfArrivalId" SET NOT NULL,
ALTER COLUMN "portOfDepartureId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_portOfDepartureId_fkey" FOREIGN KEY ("portOfDepartureId") REFERENCES "Port"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_portOfArrivalId_fkey" FOREIGN KEY ("portOfArrivalId") REFERENCES "Port"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
