import { Injectable } from '@nestjs/common';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';

@Injectable()
export class PortsService {
  create(createPortDto: CreatePortDto) {
    return 'This action adds a new port';
  }

  findAll() {
    return [
      {
        id: '1',
        name: 'Deluth',
        position: [46.76223086973586,-92.10418842401378],
      },
      {
        id: '2',
        name: 'Cleveland',
        position: [41.505161,-81.693445],
      },
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} port`;
  }

  update(id: number, updatePortDto: UpdatePortDto) {
    return `This action updates a #${id} port`;
  }

  remove(id: number) {
    return `This action removes a #${id} port`;
  }
}
