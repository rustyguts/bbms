import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.port.deleteMany();
  await prisma.ship.deleteMany();
  await prisma.route.deleteMany();
  await prisma.trip.deleteMany();

  const ports = [
    {
      id: 'deluth',
      name: 'Deluth Superior',
      position: [46.76937275943973, -92.1096765066726],
    },
    {
      id: 'thunder-bay',
      name: 'Thunder Bay',
      position: [48.380895, -89.247682],
    },
  ];

  await prisma.port.createMany({
    data: [
      {
        id: '',
        name: 'Deluth Superior',
        position: [46.76937275943973, -92.1096765066726],
      },
      {
        name: 'Thunder Bay',
        position: [48.380895, -89.247682],
      },
    ],
  });

  await prisma.ship.createMany({
    data: [
      {
        name: 'Paul R. Tregurtha',
        position: [46.76937275943973, -92.1096765066726],
      },
    ],
  });

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
        portOfDepartureId: ports[0].id,
        portOfArrivalId: ports[1].id,
        distance: 162.2249923673924,
      },
      {
        name: 'Deluth Superior <> Thunder Bay',
        geojson: JSON.parse(
          fs
            .readFileSync(
              './prisma/seed_data/deluth_superior_thunder_bay.geojson',
            )
            .toString(),
        ),
        portOfDepartureId: ports[1].id,
        portOfArrivalId: ports[0].id,
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
