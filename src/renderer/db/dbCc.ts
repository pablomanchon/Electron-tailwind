import axios from "axios"
import { BASE_URL } from "./db"
import type { CuentaCorrienteDto } from "../types/cta.cte.dto"

const CC_URL = `${BASE_URL}/Ccs`

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
