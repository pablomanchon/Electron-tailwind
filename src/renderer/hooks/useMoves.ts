import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  fetchMovimientos,
  crearMovimiento,
  editarMovimiento,
  eliminarMovimiento,
} from '../store/movesThunks'
import type { CreateMovimientoDto, UpdateMovimientoDto } from '../types/movimiento.dto'
import type { RootState } from '../store/store'
import { toast } from 'react-toastify'
import { useModal } from '../providers/ModalProvider'
import { isPriceOkay } from '../utils/MoveUtils'

export function useMoves() {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const { movimientos, loading, error } = useSelector((state: RootState) => state.moves)

  const cargarMovimientos = useCallback(() => {
    dispatch<any>(fetchMovimientos())
  }, [dispatch])

  const crear = useCallback(async (data: CreateMovimientoDto) => {
    try {
      if (!isPriceOkay(data)) throw new Error("El monto y la suma de los metodos de pago no coinciden");
      await dispatch<any>(crearMovimiento(data))
      toast.success('Movimiento creado correctamente')
      closeModal()
    } catch (err: any) {
      toast.error('Error al crear el movimiento: ' + err.message)
    }
  }, [dispatch])

  const editar = useCallback(async (id: number, data: UpdateMovimientoDto) => {
    try {
      if (!isPriceOkay(data)) throw new Error("El monto y la suma de los metodos de pago no coinciden");
      await dispatch<any>(editarMovimiento({ id, data }))
      toast.success('Movimiento editado correctamente')
      closeModal()
    } catch (err: any) {
      console.error(err)
      toast.error('Error al editar el movimiento: ' + err.message)
    }
  }, [dispatch])

  const eliminar = useCallback(async (id: number) => {
    try {
      await dispatch<any>(eliminarMovimiento(id))
      toast.success('Movimiento eliminado correctamente')
      closeModal()
    } catch (err: any) {
      console.error(err)
      toast.error('Error al eliminar el movimiento')
    }
  }, [dispatch])

  return {
    movimientos,
    loading,
    error,
    cargarMovimientos,
    crear,
    editar,
    eliminar,
  }
}
