import { SocketGateway } from "../socket.gateway"

export function startServer() {
  setInterval(() => {
    // console.log("server tick")
    // On a server tick, we do things like calulate ship positions
    // Other events like 
  }, 1000)
}

// export function startTestTick(server) {
//   setInterval(() => {
//     // Calculate commodity prices every 60 seconds
//     server.emit("vessels", "vessel location updated!")
//   }, 1000)
// }
