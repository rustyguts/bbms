import convert from 'convert';
import * as turf from '@turf/turf';

import { DateTime } from 'luxon';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TripsService } from '../trips/trips.service';
import { parseGeoJsonLineString } from '../common/parsers/geojson';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService, private trips: TripsService) {}

  async calulateShipPositions(client: Socket) {
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

        client.emit('shipPosition', {
          shipId: trip.shipId,
          position: [
            point.geometry.coordinates[1],
            point.geometry.coordinates[0],
          ],
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

          // This is when a trip is completed
          // We can start a new trip here
          await this.trips.create({
            speed: trip.speed,
            shipId: trip.shipId,
            routeId: trip.routeId,
          });
        }
      }
    } catch (error) {
      console.error(`Error in TripsService.handleInterval: ${error}`);
    }
  }

  join(client: Socket) {
    console.log(`${client.id} joined the server!`);
    client.emit('join', 'you have joined the server!');

    const interval = setInterval(async () => {
      // console.log('sending message', client.id);
      await this.calulateShipPositions(client);
    }, 100);

    client.on('disconnect', () => {
      console.log(`${client.id} disconnected!}`);
      clearInterval(interval);
    });
  }

  ping(client: Socket) {
    client.emit('ping', 'pong');
  }
}
