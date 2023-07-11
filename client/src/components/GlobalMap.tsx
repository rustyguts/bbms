import { useContext } from "react";
import { useStore } from "../lib/store";
import { FaAnchor } from 'react-icons/fa';
import { SocketContext } from "../context/socket";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";

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
          position: []
        })
      }}>Go to Cleveland</button>
      <button onClick={() => {
        socket.emit('vessels', {
          type: "move",
          shipId: "1",
          position: []
        })
      }}>Go to Deluth</button>
      <MapContainer center={[43.82642885999245, -84.3369578664335]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {store.vessels.map((v) => {
          return (
            <Marker position={v?.position || [0, 0]}>
              <Popup>
                {v.name}
              </Popup>
            </Marker>
          )
        })
        }
        {store.harbors.map((h) => {
          return (
            <Marker position={h?.position || [0, 0]}>
              <Popup>
                {h.name}
              </Popup>
            </Marker>
          )
        })
        }
      </MapContainer>
    </div>
  )
}


