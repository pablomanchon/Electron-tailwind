// src/store/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Hook personalizado tipado para dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Hook tipado para useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
