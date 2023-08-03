import { Test, TestingModule } from '@nestjs/testing'
import { ShipsController } from './ships.controller'
import { ShipsService } from './ships.service'
import { PrismaService } from '../prisma.service'

describe('ShipsController', () => {
  let controller: ShipsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipsController],
      providers: [ShipsService, PrismaService],
    }).compile()

    controller = module.get<ShipsController>(ShipsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
