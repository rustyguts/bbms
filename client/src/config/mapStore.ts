import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Store {
  routesVisible: boolean
  toggleRoutesVisible: () => void
}

export const useMapStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        routesVisible: false,
        toggleRoutesVisible: () =>
          set((s) => ({ routesVisible: !s.routesVisible })),
      }),
      {
        name: 'map_store',
      }
    )
  )
)
