import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store' // Asegurate de tipar correctamente el dispatch
import type { CreateUsuarioDto } from '../../../main/dtos/usuario.dto'
import PrimaryButton from '../PrimaryButton'
import { crearUsuario } from '../../store/usuariosThunks'
import { toast } from 'react-toastify'
import BtnAddUser from '../Users/buttons/BtnAddUser'
import BtnDeleteUser from '../Users/buttons/BtnDeleteUser'
import { useState } from 'react'
import BtnUpdateUser from '../Users/buttons/BtnUpdateUser'

export default function PanelHome({ id }: { id: number }) {
  const dispatch = useDispatch<AppDispatch>() // Tipado correcto para dispatch con thunks

  const handleSubmit = async () => {
    const nuevoUsuario: CreateUsuarioDto = {
      nombre: 'Pablo',
      tipo: 'admin',
      telefono: '123456789',
      email: 'pablo@example.com',
    }

    dispatch(crearUsuario(nuevoUsuario))
      .then(() => {
        toast.success('Usuario creado correctamente')
      })
      .catch((e) => {
        console.log(e.response.data)
        toast.error(e.response.data.message)
      })
  }
  return (
    <div className='flex flex-col md:flex-row gap-2'>
      <BtnUpdateUser id={id} />
      <BtnAddUser />
      <BtnDeleteUser id={id} />
    </div>
  )
}
