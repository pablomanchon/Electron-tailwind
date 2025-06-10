import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { MovimientoDto } from '../types/movimiento.dto'

interface MovimientoState {
    movimientos: MovimientoDto[]
    loading: boolean
    error: string | null
}

const initialState: MovimientoState = {
    movimientos: [],
    loading: false,
    error: null,
}

const movimientosSlice = createSlice({
    name: 'movimientos',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setMovimientos(state, action: PayloadAction<MovimientoDto[]>) {
            state.movimientos = action.payload
        },
        addMovimiento(state, action: PayloadAction<MovimientoDto>) {
            state.movimientos.push(action.payload)
        },
        updateMovimiento(state, action: PayloadAction<MovimientoDto>) {
            const index = state.movimientos.findIndex(m => m.id === action.payload.id)
            if (index !== -1) state.movimientos[index] = action.payload
        },
        removeMovimiento(state, action: PayloadAction<number>) {
            state.movimientos = state.movimientos.filter(m => m.id !== action.payload)
        },
    },
})

export const {
    setLoading,
    setError,
    setMovimientos,
    addMovimiento,
    updateMovimiento,
    removeMovimiento,
} = movimientosSlice.actions

export default movimientosSlice.reducer
