import { DateTime } from 'luxon';
import { Trip } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

const SPEED_MULTIPLIER = 100;

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

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
