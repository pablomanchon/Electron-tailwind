// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import usuariosReducer from './usuariosSlice'

export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    // otros reducers...
  },
})

// TypeScript infiere ReturnType de store.getState()
export type RootState = ReturnType<typeof store.getState>

// Exportá también el tipo de dispatch
export type AppDispatch = typeof store.dispatch
