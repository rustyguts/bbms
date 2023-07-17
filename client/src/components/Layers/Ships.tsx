import ShipEntity from "../Ships/Ship";

import { getShips } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

export default function ShipLayers() {
  const shipsQuery = useQuery({ queryKey: ['ships'], queryFn: getShips, refetchInterval: 1000 })

  return (
    <>
      {shipsQuery?.data?.map((s) => {
        return <ShipEntity key={s.id} ship={s} />
      })}
    </>
  )
}
