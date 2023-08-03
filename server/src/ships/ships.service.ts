import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateShipDto } from './dto/create-ship.dto'
import { UpdateShipDto } from './dto/update-ship.dto'

@Injectable()
export class ShipsService {
  constructor(private prisma: PrismaService) {}

  async create(createShipDto: CreateShipDto) {
    await this.prisma.ship.create({
      data: {
        name: createShipDto.name,
      },
    })
    return 'Ship created'
  }

  async findAll() {
    const ships = await this.prisma.ship.findMany()
    return ships
  }

  async findOne(id: string) {
    const ship = await this.prisma.ship.findUnique({
      where: { id },
    })
    if (ship) return ship
    return null
  }

  update(id: number, updateShipDto: UpdateShipDto) {
    return `This action updates a #${id} ship`
  }

  remove(id: number) {
    return `This action removes a #${id} ship`
  }
}
