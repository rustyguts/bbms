import axios from 'axios'
import { Port, Route, Ship, Trip } from '../types'

const API_URL = 'http://localhost:4000'

export async function getShips(): Promise<Ship[]> {
  try {
    const response = await axios(`${API_URL}/ships`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getShip(shipId: string): Promise<Ship> {
  try {
    const response = await axios(`${API_URL}/ships/${shipId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getTrips({
  queryKey,
}: {
  queryKey: string[]
}): Promise<Trip[]> {
  try {
    const [_, queryString] = queryKey
    const response = await axios(
      `${API_URL}/trips${queryString ? `?${queryString}` : ''}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getPorts(): Promise<Port[]> {
  try {
    const response = await axios(`${API_URL}/ports`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getRoutes(): Promise<Route[]> {
  try {
    const response = await axios(`${API_URL}/routes`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Mutations

export async function createTrip(input: {
  shipId: string
  destinationPortId: string
}): Promise<Trip> {
  try {
    const response = await axios.post(`${API_URL}/trips`, input)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
