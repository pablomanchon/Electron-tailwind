import { useEffect } from 'react'
import { fetchUsuarios } from '../../store/usuariosThunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Table from '../../layout/Table'

const encabezados = ["ID", "Nombre", { titulo: "Rol", clave: "tipo" }, "Email"]

interface UsersTableProps {
  onSelectFile?: (id: number) => void
  onDoubleClick?: (id: number) => void
}

export default function UsersTable({ onSelectFile, onDoubleClick }: UsersTableProps) {
  const dispatch = useAppDispatch()
  const { usuarios, loading, error } = useAppSelector(state => state.usuarios)

  useEffect(() => {
    dispatch(fetchUsuarios())
  }, [dispatch])

  if (loading) {
    return <p className="text-center py-4">Cargando usuarios...</p>
  }

  if (error) {
    return <p className="text-red-500 text-center py-4">{error}</p>
  }

  return (
    <Table
      datos={usuarios}
      onDobleClickFila={onDoubleClick}
      onFilaSeleccionada={onSelectFile}
      encabezados={encabezados}
    />
  )
}
