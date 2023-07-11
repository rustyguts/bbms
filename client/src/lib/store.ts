import { create } from 'zustand'

interface Harbor {
  id: string
  name: string
  position: [number, number]
}

interface Vessel {
  id: string
  name: string
  position: [number, number]
}

type Store = {
  vessels: Vessel[],
  harbors: Harbor[],
  status: string
  updateVessel: (state: any) => void
  initialize: (state: any) => void
  setStatus: (status: string) => void
}

export const useStore = create<Store>()((set) => ({
  vessels: [],
  harbors: [],
  status: 'disconnected',
  updateVessel: (updatedVessel: any) => set((state) => ({ ...state, vessels: state.vessels.map((vessel) => vessel.id === updatedVessel.id ? updatedVessel : vessel)})),
  initialize: (initialState: any) => set((state) => ({ ...state, ...initialState})),
  setStatus: (status: string) => set((state) => ({ ...state, status, })),
}))
