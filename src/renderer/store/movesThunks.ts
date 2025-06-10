import * as api from '../db/dbMoves'
import {
    setLoading,
    setError,
    setMovimientos,
    addMovimiento,
    updateMovimiento,
    removeMovimiento,
} from './movesSlice'

import type { CreateMovimientoDto, UpdateMovimientoDto } from '../types/movimiento.dto'

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

export const crearMovimiento = (mov: CreateMovimientoDto) => async (dispatch: any) => {
    const data = await api.createMovimiento(mov)
    dispatch(addMovimiento(data))
}

export const editarMovimiento = (id: number, data: UpdateMovimientoDto) => async (dispatch: any) => {
    const actualizado = await api.updateMovimiento(id, data)
    dispatch(updateMovimiento(actualizado))
}

export const eliminarMovimiento = (id: number) => async (dispatch: any) => {
    await api.deleteMovimiento(id)
    dispatch(removeMovimiento(id))
}
