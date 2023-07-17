import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.port.deleteMany();
  await prisma.ship.deleteMany();
  await prisma.route.deleteMany();
  await prisma.trip.deleteMany();

  await prisma.port.createMany({
    data: [
      {
        name: 'Deluth Superior',
        position: [46.783333, -92.106389],
      },
      {
        name: 'Thunder Bay',
        position: [48.380895, -89.247682],
      },
      {
        name: 'Marquette',
        position: [46.543611, -87.395278],
      },
      {
        name: 'Green Bay',
        position: [44.513333, -88.015833],
      },
      {
        name: 'Chicago',
        position: [41.881944, -87.627778],
      },
      {
        name: 'Detroit',
        position: [42.331389, -83.045833],
      },
      {
        name: 'Cleveland',
        position: [41.482222, -81.669722],
      },
      {
        name: 'Buffalo',
        position: [42.886389, -78.878611],
      },
      {
        name: 'Toronto',
        position: [43.65, -79.383333],
      },
      {
        name: 'Montreal',
        position: [45.508889, -73.561667],
      },
      {
        name: 'Soo St. Marie',
        position: [46.495278, -84.345278],
      },
    ],
  });

  await prisma.ship.createMany({
    data: [
      {
        name: 'Paul R. Tregurtha',
        position: [46.783333, -92.106389],
      },
    ],
  });

  // const lineString = turf.lineString(route.features[0].geometry.coordinates);
  // const totalDistance = kmToNauticalMiles(
  //   turf.length(lineString, { units: 'kilometers' }),
  // );
  // console.log(
  //   'Total distance:',
  //   kmToNauticalMiles(totalDistance),
  //   'nautical miles',
  // );

  await prisma.route.createMany({
    data: [
      {
        name: 'Thunder Bay <> Deluth Superior',
        geojson: JSON.parse(
          fs
            .readFileSync(
              './prisma/seed_data/thunder_bay_deluth_superior.geojson',
            )
            .toString(),
        ),
        distance: 162.2249923673924,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
