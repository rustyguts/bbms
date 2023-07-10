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
        {id: "1", name: "MV Paul R. Tregurtha", location: "2"}
      ],
      harbors: [
        {id: "1", name: "Cleveland", size: "lg"},
        {id: "2", name: "Deluth", size: "lg"}
      ],
    })
  }

  @SubscribeMessage('vessels')
  handleVesselMessage(@MessageBody() vesselMessage: any): void {
    console.log("Recived vessel message", vesselMessage)

    switch (vesselMessage.type) {
      case 'move_to_harbor':
        setTimeout(() => {
          this.server.emit('vessels', {
            type: "vessel_update",
            vessel: {id: "1", name: "MV Paul R. Tregurtha", location: vesselMessage.to}
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
