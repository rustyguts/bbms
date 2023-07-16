import * as turf from '@turf/turf';

import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';

import { route } from '../data/layer';
import { PrismaService } from '../prisma.service';
import { Cron, Interval } from '@nestjs/schedule';

function kmToNauticalMiles(km) {
  return km / 1.852;
}

function nauticalMilesToKm(nm) {
  return nm * 1.852;
}

@Injectable()
export class ShipsService {
  constructor(private prisma: PrismaService) {}

  @Cron('10 * * * * *')
  handleCron() {
    // Ship cron
    // console.log('Called when the current second is 10');
  }

  @Interval(1000)
  handleInterval() {
    // Ship tick rate
    // console.log('Called every second');
  }

  async create(createShipDto: CreateShipDto) {
    await this.prisma.ship.create({
      data: {
        name: createShipDto.name,
      },
    });
    return 'Ship created';
  }

  async findAll() {
    console.time('turf');
    const lineString = turf.lineString(route.features[0].geometry.coordinates);
    const totalDistance = kmToNauticalMiles(
      turf.length(lineString, { units: 'kilometers' }),
    );
    console.log(
      'Total distance:',
      kmToNauticalMiles(totalDistance),
      'nautical miles',
    );

    // calculate how long it would take at 12 knots
    const speed = 12 * 1; // 1x speed multiplier

    // calulate how much time has elapsed since the ship left port
    const journeyStartTime = '2023-07-13T02:42:48.615Z';
    const previousTimestamp = DateTime.fromISO(journeyStartTime);
    const minutesElapsed = DateTime.now().diff(
      previousTimestamp,
      'minutes',
    ).minutes;
    // console.log(`Minutes elapsed: ${minutesElapsed}`);

    // calculate where the ship is if it has been traveling for 20 minutes
    const minutesElapsedSinceDeparture = minutesElapsed;
    const nauticalMilesTraveled = speed * (minutesElapsedSinceDeparture / 60);
    const point = turf.along(
      lineString,
      nauticalMilesToKm(nauticalMilesTraveled),
      { units: 'kilometers' },
    );
    // console.log('Ship is here:', point);
    console.timeEnd('turf');

    const ships = await this.prisma.ship.findMany({
      include: {
        route: true,
        trips: true,
      },
    });

    return ships.map((s) => {
      return {
        id: s.id,
        name: s.name,
        position: [
          point.geometry.coordinates[1], // Lat,
          point.geometry.coordinates[0], // Lng
        ],
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ship`;
  }

  update(id: number, updateShipDto: UpdateShipDto) {
    return `This action updates a #${id} ship`;
  }

  remove(id: number) {
    return `This action removes a #${id} ship`;
  }
}
