// src/api/usuario.api.ts
import axios from "axios";
import type { CreateUsuarioDto, UpdateUsuarioDto } from "../types/usuario.dto";

const API_URL = "http://localhost:3000/api/users";

export const getUsuarios = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getUsuarioById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createUsuario = async (data: CreateUsuarioDto) => {
  console.log(data)
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateUsuario = async (id: number, data: UpdateUsuarioDto) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteUsuario = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
