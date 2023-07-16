import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from '@prisma/client';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  async findAll(): Promise<Route[]> {
    const routes = await this.prisma.route.findMany();
    return routes;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
