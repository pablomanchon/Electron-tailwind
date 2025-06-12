import axios from "axios"
import { BASE_URL } from "./db"
import type { CuentaCorrienteDto } from "../types/cta.cte.dto"

const CC_URL = `${BASE_URL}/ccs`

// Obtener todas las cuentas corrientes
export const findAllCuentasCorrientes = async (): Promise<CuentaCorrienteDto[]> => {
  try {
    const res = await axios.get(CC_URL)
    return res.data
  } catch (error) {
    throw error
  }
}

// Obtener una cuenta corriente por ID
export const findCuentaCorrienteById = async (id: number): Promise<CuentaCorrienteDto> => {
  try {
    const res = await axios.get(`${CC_URL}/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// Crear una nueva cuenta corriente
export const createCuentaCorriente = async (data: Partial<CuentaCorrienteDto>): Promise<CuentaCorrienteDto> => {
  try {
    const res = await axios.post(CC_URL, data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Actualizar una cuenta corriente existente
export const updateCuentaCorriente = async (
  id: number,
  data: Partial<CuentaCorrienteDto>
): Promise<CuentaCorrienteDto> => {
  try {
    const res = await axios.put(`${CC_URL}/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Eliminar lógicamente una cuenta corriente
export const deleteCuentaCorriente = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${CC_URL}/${id}`)
  } catch (error) {
    throw error
  }
}
