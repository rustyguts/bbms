import { useStore } from "../lib/store";
import { SocketContext } from "../context/socket";
import { useCallback, useContext, useEffect } from "react";

export default function SocketManager() {
  const store = useStore()
  const socket = useContext(SocketContext);

  const handleJoinMessage = useCallback((joinMessage: any) => {
    console.log("join message", joinMessage)
    store.initialize(joinMessage)
  }, [])

  const handleVesselMessage = useCallback((vesselMessage: any) => {
    console.log(`vessel message`, vesselMessage)
    store.updateVessel(vesselMessage.vessel)
  }, [])

  useEffect(() => {
    socket.emit("join", "brendan");
    socket.on('join', handleJoinMessage)
    socket.on('vessels', handleVesselMessage)

    return () => {
      socket.off("join", handleJoinMessage);
      socket.off("vessels", handleVesselMessage);
    };
  }, [socket])

  return (
    <div>
      {JSON.stringify(store)}
      {/* connection status: {`${joined ? "connected" : "disconnected"}`} */}
    </div>
  )
}
