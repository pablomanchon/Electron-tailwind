import axios from 'axios';
import type { CreateMovimientoDto, MovimientoDto, UpdateMovimientoDto } from '../types/movimiento.dto';

const API_URL = 'http://localhost:3000/api/moves';

export const getMovimientos = async () => {
  const res = await axios.get(`${API_URL}`)
  return res.data;
};

export const getMovimientoById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createMovimiento = async (data: CreateMovimientoDto) => {
  const res = await axios.post(`${API_URL}`, data);
  return res.data;
};

export const updateMovimiento = async (id: number, data: UpdateMovimientoDto) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteMovimiento = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
