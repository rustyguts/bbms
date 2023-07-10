import { useContext } from "react";
import { useStore } from "../lib/store";
import { SocketContext } from "../context/socket";

export default function GlobalMap() {
  const store = useStore()
  const socket = useContext(SocketContext);

  return (
    <div>
      <div>Global Map</div>
      <button onClick={() => {
        socket.emit('vessels', {
          type: "move_to_harbor",
          shipId: "1",
          to: '1'
        })
      }}>Go to Cleveland</button>
      <button onClick={() => {
        socket.emit('vessels', {
          type: "move_to_harbor",
          shipId: "1",
          to: '2'
        })
      }}>Go to Deluth</button>
      {store.harbors.map((h) => {
        return (
          <div>
            <h2>
              {h.name}
            </h2>
            <div>
              <h3>Ships in port</h3>
              {store.vessels.filter((v) => v.location === h.id).map((v) => {
                return (
                  <div>
                    {v.name}
                  </div>
                )
              })
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}
