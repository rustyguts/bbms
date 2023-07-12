import { useQuery } from "@tanstack/react-query";
import { getPorts, getShips } from "../api/api";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function GlobalMap() {
  const shipsQuery = useQuery({ queryKey: ['ships'], queryFn: getShips })
  const portsQuery = useQuery({ queryKey: ['ports'], queryFn: getPorts })

  return (
    <div>
      <div>Global Map</div>
      <MapContainer center={[43.82642885999245, -84.3369578664335]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shipsQuery?.data?.map((s: any) => {
          return (
            <Marker position={s?.position || [0, 0]}>
              <Popup>
                {s.name}
              </Popup>
            </Marker>
          )
        })
        }
        {portsQuery?.data?.map((p: any) => {
          return (
            <Marker position={p?.position || [0, 0]}>
              <Popup>
                {p.name}
              </Popup>
            </Marker>
          )
        })
        }
      </MapContainer>
    </div>
  )
}


