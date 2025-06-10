import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { crearCuenta, editarCuenta, eliminarCuenta, fetchCuentas } from '../store/ccThunks'
import type { CreateCuentaCorrienteDto, UpdateCuentaCorrienteDto } from '../types/cta.cte.dto'


export function useCuentasCorrientes() {
  const dispatch = useAppDispatch()
  const { cuentas, loading, error } = useAppSelector(state => state.cuentasCorrientes)

  useEffect(() => {
    dispatch(fetchCuentas())
  }, [dispatch])

  const refresh = () => {
    dispatch(fetchCuentas())
  }

  const addCuentaCorriente = async (data: CreateCuentaCorrienteDto) => {
    try {
      await dispatch(crearCuenta(data))
      toast.success('Cuenta corriente creada correctamente')
      refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error al crear cuenta corriente')
    }
  }

  const editCuentaCorriente = async (id: number, data: UpdateCuentaCorrienteDto) => {
    try {
      await dispatch(editarCuenta(id, data))
      toast.success('Cuenta corriente actualizada correctamente')
      refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error al actualizar cuenta corriente')
    }
  }

  const deleteCuentaCorriente = async (id: number) => {
    try {
      await dispatch(eliminarCuenta(id))
      toast.success('Cuenta corriente eliminada correctamente')
      refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error al eliminar cuenta corriente')
    }
  }

  const getById = (id: number) => {
    try {
      return cuentas.find(c => c.id === id)
    } catch {
      toast.error('Cuenta corriente no encontrada')
      return undefined
    }
  }

  return {
    cuentas,
    loading,
    error,
    refresh,
    addCuentaCorriente,
    editCuentaCorriente,
    deleteCuentaCorriente,
    getById,
  }
}
