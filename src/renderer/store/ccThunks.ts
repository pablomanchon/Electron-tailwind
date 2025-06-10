import * as api from '../db/dbCc' // <-- asegurate que este archivo contenga las funciones API necesarias
import type { CreateCuentaCorrienteDto } from '../types/cta.cte.dto'
import {
  setLoading,
  setError,
  setCuentas,
  addCuenta,
  updateCuenta,
  removeCuenta,
} from './ccSlice'

// Obtener todas
export const fetchCuentas = () => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const data = await api.findAllCuentasCorrientes()
    dispatch(setCuentas(data))
    dispatch(setError(null))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al obtener cuentas'))
  } finally {
    dispatch(setLoading(false))
  }
}

// Crear una nueva
export const crearCuenta = (cuenta: CreateCuentaCorrienteDto) => async (dispatch: any) => {
  try {
    const data = await api.createCuentaCorriente(cuenta)
    dispatch(addCuenta(data))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al crear cuenta'))
  }
}

// Actualizar
export const editarCuenta = (id: number, data: UpdateCuentaCorrienteDto) => async (dispatch: any) => {
  try {
    const actualizada = await api.updateCuentaCorriente(id, data)
    dispatch(updateCuenta(actualizada))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al actualizar cuenta'))
  }
}

// Eliminar (lógico)
export const eliminarCuenta = (id: number) => async (dispatch: any) => {
  try {
    await api.deleteCuentaCorriente(id)
    dispatch(removeCuenta(id))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al eliminar cuenta'))
  }
}
