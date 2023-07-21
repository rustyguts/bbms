import { DateTime } from 'luxon';
import { Trip } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  getSpeedMultiplier(): number {
    return 100;
  }

  getEta(speed: number, distance: number): Date {
    const trueSpeed = speed * this.getSpeedMultiplier();
    const tripDurationInHours = distance / trueSpeed;

    return DateTime.now()
      .plus({
        hours: tripDurationInHours,
      })
      .toJSDate();
  }

  async getUnderwayTrips(shipId: string): Promise<Trip[]> {
    const underwayTrips = await this.prisma.trip.findMany({
      where: {
        shipId: shipId,
        status: 'UNDERWAY',
      },
    });

    return underwayTrips;
  }

  async create(createTripDto: CreateTripDto) {
    const underwayTrips = await this.getUnderwayTrips(createTripDto.shipId);
    if (underwayTrips.length > 0) {
      throw new BadRequestException('Ship is already underway');
    }

    const ship = await this.prisma.ship.findUnique({
      where: {
        id: createTripDto.shipId,
      },
    });

    // TODO :: Add check that enforces that ships only start trips from the port that they are currently in

    const route = await this.prisma.route
      .findFirstOrThrow({
        where: {
          portOfArrivalId: createTripDto.arrivalPortId,
          portOfDepartureId: createTripDto.departurePortId,
        },
        include: {
          portOfArrival: true,
          portOfDeparture: true,
        },
      })
      .catch(() => {
        throw new BadRequestException('Route does not exist');
      });

    const trip = await this.prisma.trip.create({
      data: {
        speed: createTripDto.speed,
        speedMultiplier: this.getSpeedMultiplier(),
        ship: {
          connect: {
            id: ship.id,
          },
        },
        route: {
          connect: {
            id: route.id,
          },
        },
        eta: this.getEta(createTripDto.speed, route.distance),
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
