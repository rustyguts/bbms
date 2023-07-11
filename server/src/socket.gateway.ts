import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('join')
  handleMessage(@MessageBody() username: string): void {
    console.log(`user ${username} has joined`)
    this.server.emit('join', {
      status: 'connected',
      vessels: [
        {id: "1", name: "MV Paul R. Tregurtha", position: [47.445318825626096, -88.9763697854109]}
      ],
      harbors: [
        {id: "1", name: "Cleveland", size: "lg", position: [41.505161, -81.693445]},
        {id: "2", name: "Deluth", size: "lg", position: [46.76223086973586, -92.10418842401378]}
      ],
    })
  }

  @SubscribeMessage('vessels')
  async handleVesselMessage(@MessageBody() vesselMessage: any): Promise<void> {
    console.log("Recived vessel message", vesselMessage)

    switch (vesselMessage.type) {
      case 'move_to_harbor':
        await setTimeout(() => {
          this.server.emit('vessels', {
            type: "vessel_update",
            vessel: {id: "1", name: "MV Paul R. Tregurtha", position: vesselMessage.position}
          })
        }, 1000)

        await setTimeout(() => {
          this.server.emit('vessels', {
            type: "vessel_update",
            vessel: {id: "1", name: "MV Paul R. Tregurtha", position: vesselMessage}
          })
        }, 1000)

        await setTimeout(() => {
          this.server.emit('vessels', {
            type: "vessel_update",
            vessel: {id: "1", name: "MV Paul R. Tregurtha", position: vesselMessage}
          })
        }, 1000)

        break;
    
      default:
        console.warn("unknown vessel message")
        break;
    }

    // setInterval(() => {
    //   // Calculate commodity prices every 60 seconds
    //   this.server.emit("vessels", "vessel location updated!")
    // }, 1000)

    // this.server.emit('join', `${username} has successfully joined the server`)
  }
}
