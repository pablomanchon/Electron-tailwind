import * as api from '../db/dbCc'
import {
  setLoading,
  setError,
  setCuentas,
  addCuenta,
  updateCuentaInState,
  removeCuenta
} from './ccSlice'

// Obtener todas las cuentas
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

// Crear una nueva cuenta
export const createCuenta = (cuenta: any) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const nuevaCuenta = await api.createCuentaCorriente(cuenta)
    dispatch(addCuenta(nuevaCuenta))
    dispatch(setError(null))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al crear cuenta'))
  } finally {
    dispatch(setLoading(false))
  }
}

// Actualizar cuenta
export const updateCuenta = (id: number, cuenta: any) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const cuentaActualizada = await api.updateCuentaCorriente(id, cuenta)
    dispatch(updateCuentaInState(cuentaActualizada))
    dispatch(setError(null))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al actualizar cuenta'))
  } finally {
    dispatch(setLoading(false))
  }
}

// Eliminar cuenta (soft delete)
export const deleteCuenta = (id: number) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    await api.deleteCuentaCorriente(id)
    dispatch(removeCuenta(id))
    dispatch(setError(null))
  } catch (err: any) {
    console.error(err)
    dispatch(setError(err.message || 'Error al eliminar cuenta'))
  } finally {
    dispatch(setLoading(false))
  }
}
