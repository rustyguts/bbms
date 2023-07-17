import convert from 'convert';
import * as turf from '@turf/turf';

import { DateTime } from 'luxon';
import { PrismaService } from '../prisma.service';
import { Cron, Interval } from '@nestjs/schedule';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { parseGeoJsonLineString } from '../common/parsers/geojson';
import { Trip } from '@prisma/client';

const SPEED_MULTIPLIER = 100;

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  @Cron('10 * * * * *')
  handleCron() {
    // Ship cron
    // console.log('Called when the current second is 10');
  }

  @Interval(5000)
  async handleInterval() {
    try {
      const underwayTrips = await this.prisma.trip.findMany({
        where: {
          status: 'UNDERWAY',
        },
        include: {
          ship: true,
          route: true,
        },
      });

      if (underwayTrips.length) {
        console.info(`processing ${underwayTrips.length} underway trips`);
      }

      for (const trip of underwayTrips) {
        const hoursElapsed = DateTime.now().diff(
          DateTime.fromJSDate(trip.createdAt),
          'hours',
        ).hours;

        const nauticalMilesTraveled =
          trip.speed * trip.speedMultiplier * hoursElapsed;

        const lineString = turf.lineString(
          parseGeoJsonLineString(trip.route.geojson).coordinates,
        );

        const point = turf.along(
          lineString,
          convert(nauticalMilesTraveled, 'nautical miles').to('kilometers'),
          { units: 'kilometers' },
        );

        await this.prisma.ship.update({
          where: {
            id: trip.shipId,
          },
          data: {
            position: [
              point.geometry.coordinates[1],
              point.geometry.coordinates[0],
            ],
          },
        });

        // if distance traveled is greater than route distance, then trip is complete
        if (nauticalMilesTraveled >= trip.route.distance) {
          await this.prisma.trip.update({
            where: {
              id: trip.id,
            },
            data: {
              status: 'MOORED',
            },
          });
        }
      }
    } catch (error) {
      console.error(`Error in TripsService.handleInterval: ${error}`);
    }
  }

  async create(createTripDto: CreateTripDto) {
    const route = await this.prisma.route.findUnique({
      where: {
        id: createTripDto.routeId,
      },
    });

    const trueSpeed = createTripDto.speed * SPEED_MULTIPLIER;
    const tripDurationInHours = route.distance / trueSpeed;

    const estimatedTimeOfArrival = DateTime.now().plus({
      hours: tripDurationInHours,
    });

    const underwayTrips = await this.prisma.trip.findMany({
      where: {
        shipId: createTripDto.shipId,
        status: 'UNDERWAY',
      },
    });

    if (underwayTrips.length > 0) {
      throw new BadRequestException('Ship is already underway');
    }

    const trip = await this.prisma.trip.create({
      data: {
        speed: createTripDto.speed,
        speedMultiplier: SPEED_MULTIPLIER,
        ship: {
          connect: {
            id: createTripDto.shipId,
          },
        },
        route: {
          connect: {
            id: createTripDto.routeId,
          },
        },
        eta: estimatedTimeOfArrival.toJSDate(),
      },
    });

    return trip;
  }

  async findAll(where: any): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany({
      where,
      include: { route: true },
    });
    return trips;
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}

// console.time('turf');
// const lineString = turf.lineString(route.features[0].geometry.coordinates);
// const totalDistance = kmToNauticalMiles(
//   turf.length(lineString, { units: 'kilometers' }),
// );
// console.log(
//   'Total distance:',
//   kmToNauticalMiles(totalDistance),
//   'nautical miles',
// );

// // calculate how long it would take at 12 knots
// const speed = 12 * 1; // 1x speed multiplier

// // calulate how much time has elapsed since the ship left port
// const journeyStartTime = '2023-07-13T02:42:48.615Z';
// const previousTimestamp = DateTime.fromISO(journeyStartTime);
// const minutesElapsed = DateTime.now().diff(
//   previousTimestamp,
//   'minutes',
// ).minutes;
// // console.log(`Minutes elapsed: ${minutesElapsed}`);

// // calculate where the ship is if it has been traveling for 20 minutes
// const minutesElapsedSinceDeparture = minutesElapsed;
// const nauticalMilesTraveled = speed * (minutesElapsedSinceDeparture / 60);
// const point = turf.along(
//   lineString,
//   nauticalMilesToKm(nauticalMilesTraveled),
//   { units: 'kilometers' },
// );
// // console.log('Ship is here:', point);
// console.timeEnd('turf');
