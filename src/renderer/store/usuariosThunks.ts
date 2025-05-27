import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../db/dbUsers'
import {
  setLoading,
  setError,
  setUsuarios,
  addUsuario,
  updateUsuario,
  removeUsuario,
} from './usuariosSlice'
import type { CreateUsuarioDto, UpdateUsuarioDto } from '../types/usuario.dto'

// Fetch
export const fetchUsuarios = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true))
    const data = await api.getUsuarios()
    dispatch(setUsuarios(data))
  } catch (err: any) {
    dispatch(setError(err.message))
  } finally {
    dispatch(setLoading(false))
  }
}

// Create
export const crearUsuario = (usuario: CreateUsuarioDto) => async (dispatch: any) => {
  const data = await api.createUsuario(usuario)
  dispatch(addUsuario(data))
}

// Update
export const editarUsuario = (id: number, data: UpdateUsuarioDto) => async (dispatch: any) => {
  const usuarioActualizado = await api.updateUsuario(id, data)
  dispatch(updateUsuario(usuarioActualizado))
}

// Delete
export const eliminarUsuario = (id: number) => async (dispatch: any) => {
  await api.deleteUsuario(id)
  dispatch(removeUsuario(id))
}
