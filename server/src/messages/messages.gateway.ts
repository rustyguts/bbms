import {
  MessageBody,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody() joinRoomDto: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.join(client);
  }

  @SubscribeMessage('ping')
  async ping(@ConnectedSocket() client: Socket) {
    return this.messagesService.ping(client);
  }
}
