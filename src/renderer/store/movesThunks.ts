import * as api from '../db/dbMoves'
import {
    setLoading,
    setError,
    setMovimientos,
} from './movesSlice'

import type { CreateMovimientoDto, UpdateMovimientoDto } from '../types/movimiento.dto'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchCuentas } from './ccThunks'

export const fetchMovimientos = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const data = await api.getMovimientos()
        dispatch(setMovimientos(data))
    } catch (err: any) {
        console.log(err)
        dispatch(setError(err.message))
    } finally {
        dispatch(setLoading(false))
    }
}

export const crearMovimiento = createAsyncThunk(
  'movimientos/crear',
  async (data: CreateMovimientoDto, { dispatch }) => {
    const response = await api.createMovimiento(data);

    // ⚠️ Asegurate de que `response.data` incluya la cuentaId
    const movimiento = response.data

    // Opción A: volver a cargar todas las cuentas
    dispatch(fetchCuentas())

    // Opción B: si el backend devuelve el nuevo saldo, actualizar solo esa cuenta:
    // dispatch(updateCuenta(movimiento.cuentaId, { saldo: movimiento.nuevoSaldo }))

    return movimiento
  }
)

export const editarMovimiento = createAsyncThunk(
  'movimientos/editar',
  async ({ id, data }: { id: number; data: UpdateMovimientoDto }) => {
    const actualizado = await api.updateMovimiento(id, data)
    return actualizado
  }
)

export const eliminarMovimiento = createAsyncThunk(
  'movimientos/eliminar',
  async (id: number) => {
    await api.deleteMovimiento(id)
    return id
  }
)

