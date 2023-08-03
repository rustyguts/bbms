import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UpdatePortDto } from './dto/update-port.dto'

@Injectable()
export class PortsService {
  constructor(private prisma: PrismaService) {}

  async create(createPortDto: Prisma.PortCreateInput) {
    await this.prisma.port.create({
      data: createPortDto,
    })
    return 'Port created'
  }

  findAll() {
    return this.prisma.port.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} port`
  }

  update(id: number, updatePortDto: UpdatePortDto) {
    return `This action updates a #${id} port`
  }

  remove(id: number) {
    return `This action removes a #${id} port`
  }
}
