import axios from 'axios';

const API_URL = 'http://localhost:4000';

export async function getShips() {
  try {
    const response = await axios(`${API_URL}/ships`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getPorts() {
  try {
    const response = await axios(`${API_URL}/ports`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}
