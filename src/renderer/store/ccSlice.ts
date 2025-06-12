import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CuentaCorrienteDto } from '../types/cta.cte.dto'

interface CuentaCorrienteState {
  cuentas: CuentaCorrienteDto[]
  loading: boolean
  error: string | null
}

const initialState: CuentaCorrienteState = {
  cuentas: [],
  loading: false,
  error: null,
}

const cuentaCorrienteSlice = createSlice({
  name: 'cuentasCorrientes',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setCuentas(state, action: PayloadAction<CuentaCorrienteDto[]>) {
      state.cuentas = action.payload
    },
    addCuenta(state, action: PayloadAction<CuentaCorrienteDto>) {
      state.cuentas.push(action.payload)
    },
    updateCuentaInState(state, action: PayloadAction<CuentaCorrienteDto>) {
      const index = state.cuentas.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.cuentas[index] = action.payload
      }
    },
    removeCuenta(state, action: PayloadAction<number>) {
      state.cuentas = state.cuentas.filter(c => c.id !== action.payload)
    }
  },
})


export const {
  setLoading,
  setError,
  setCuentas,
  addCuenta,
  updateCuentaInState,
  removeCuenta,
} = cuentaCorrienteSlice.actions


export default cuentaCorrienteSlice.reducer
