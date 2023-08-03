import { Test, TestingModule } from '@nestjs/testing'
import { PortsController } from './ports.controller'
import { PortsService } from './ports.service'
import { PrismaService } from '../prisma.service'

describe('PortsController', () => {
  let controller: PortsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortsController],
      providers: [PortsService, PrismaService],
    }).compile()

    controller = module.get<PortsController>(PortsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
