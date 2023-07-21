/*
  Warnings:

  - You are about to drop the column `portId` on the `Route` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_portId_fkey";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "portId",
ADD COLUMN     "portOfArrivalId" TEXT,
ADD COLUMN     "portOfDepartureId" TEXT;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_portOfDepartureId_fkey" FOREIGN KEY ("portOfDepartureId") REFERENCES "Port"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_portOfArrivalId_fkey" FOREIGN KEY ("portOfArrivalId") REFERENCES "Port"("id") ON DELETE SET NULL ON UPDATE CASCADE;
