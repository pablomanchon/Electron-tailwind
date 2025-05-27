import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UsuarioDto } from '../types/usuario.dto'

interface UsuarioState {
  usuarios: UsuarioDto[]
  loading: boolean
  error: string | null
}

const initialState: UsuarioState = {
  usuarios: [],
  loading: false,
  error: null,
}

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setUsuarios(state, action: PayloadAction<UsuarioDto[]>) {
      state.usuarios = action.payload
    },
    addUsuario(state, action: PayloadAction<UsuarioDto>) {
      state.usuarios.push(action.payload)
    },
    updateUsuario(state, action: PayloadAction<UsuarioDto>) {
      const index = state.usuarios.findIndex(u => u.id === action.payload.id)
      if (index !== -1) state.usuarios[index] = action.payload
    },
    removeUsuario(state, action: PayloadAction<number>) {
      state.usuarios = state.usuarios.filter(u => u.id !== action.payload)
    },
  },
})

export const {
  setLoading,
  setError,
  setUsuarios,
  addUsuario,
  updateUsuario,
  removeUsuario,
} = usuariosSlice.actions

export default usuariosSlice.reducer
