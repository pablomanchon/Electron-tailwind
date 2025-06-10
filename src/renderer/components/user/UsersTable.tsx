import { useUsers } from '../../hooks/useUsers'
import Table from '../../layout/Table'
import TableAndSearch from '../TableAndSearch'

const encabezados = ["ID", "Nombre", { titulo: "Rol", clave: "tipo" }, "Email"]

interface UsersTableProps {
  onSelectFile?: (id: number) => void
  onDoubleClick?: (id: number) => void
  search?: boolean
}

export default function UsersTable({ onSelectFile, onDoubleClick, search }: UsersTableProps) {
  const { users, loading, error } = useUsers()

  if (loading) {
    return <p className="text-center py-4">Cargando usuarios...</p>
  }

  if (error) {
    return <p className="text-red-500 text-center py-4">{error}</p>
  }

  return (
    <>
      {
        search ?
          <TableAndSearch
            datos={users}
            onDobleClickFila={onDoubleClick}
            onFilaSeleccionada={onSelectFile}
            encabezados={encabezados}
            searchFilters={['id', 'nombre', 'tipo', 'email']}
          />
          :
          <Table
            datos={users}
            onDobleClickFila={onDoubleClick}
            onFilaSeleccionada={onSelectFile}
            encabezados={encabezados}
          />
      }
    </>
  )
}
