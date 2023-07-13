import axios from 'axios';
import { Port, Ship } from '../types';

const API_URL = 'http://localhost:4000';

export async function getShips(): Promise<Ship[]> {
  try {
    const response = await axios(`${API_URL}/ships`);
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPorts(): Promise<Port[]> {
  try {
    const response = await axios(`${API_URL}/ports`);
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}
