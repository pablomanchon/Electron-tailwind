import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchUsuarios, crearUsuario, eliminarUsuario } from '../store/usuariosThunks'
import type { CreateUsuarioDto } from '../types/usuario.dto'
import { toast } from 'react-toastify'
import { useModal } from '../providers/ModalProvider'
import { editarUsuario } from '../store/usuariosThunks'
import type { UpdateUsuarioDto } from '../types/usuario.dto'

export function useUsers() {
    const dispatch = useAppDispatch()
    const { usuarios, loading, error } = useAppSelector(state => state.usuarios)
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(fetchUsuarios())
    }, [dispatch])

    const refresh = () => dispatch(fetchUsuarios())

    const addUser = async (data: CreateUsuarioDto) => {
        try {
            await dispatch(crearUsuario(data))
            toast.success('Usuario creado correctamente')
            refresh()
            closeModal()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Error al crear usuario')
        }
    }

    const editUser = async (id: number, data: UpdateUsuarioDto) => {
        try {
            await dispatch(editarUsuario(id, data))
            toast.success('Usuario actualizado correctamente')
            refresh()
            closeModal()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Error al actualizar usuario')
        }
    }

    const deleteUser = async (id: number) => {
        try {
            await dispatch(eliminarUsuario(id))
            toast.success('Usuario eliminado correctamente')
            refresh()
        } catch (e: any) {
            toast.error(e.response?.data?.message || 'Error al eliminar usuario')
        }
    }

    const getById = (id: number) => {
        try {
            return usuarios.find((u) => u.id === id)
        } catch (error) {
            toast.error("Usuario no encontrado")
        }
    }


    return {
        users: usuarios,
        loading,
        error,
        addUser,
        editUser,
        deleteUser,
        getById,
        refresh,
    }
}

