import { Prisma } from '@prisma/client'
import { PortsService } from './ports.service'
import { UpdatePortDto } from './dto/update-port.dto'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'

@Controller('ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @Post()
  create(@Body() createPortDto: Prisma.PortCreateInput) {
    return this.portsService.create(createPortDto)
  }

  @Get()
  findAll() {
    return this.portsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortDto: UpdatePortDto) {
    return this.portsService.update(+id, updatePortDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portsService.remove(+id)
  }
}
