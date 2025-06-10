import { useCuentasCorrientes } from '../../hooks/useCc'
import Table from '../../layout/Table'
import TableAndSearch from '../TableAndSearch'

const encabezados = [
    "ID",
    { titulo: "Fecha", clave: "fecha" },
    { titulo: "Saldo", clave: "saldo" },
    { titulo: "Método", clave: "usuario.nombre" },
]

interface MovimientosTableProps {
    onSelectFile?: (id: number) => void
    onDoubleClick?: (id: number) => void
    search?: boolean
}

export default function TableCc({ onSelectFile, onDoubleClick, search }: MovimientosTableProps) {
    const { loading, error, cuentas } = useCuentasCorrientes();
    if (loading) {
        return <p className="text-center py-4">Cargando movimientos...</p>
    }

    if (error) {
        return <p className="text-red-500 text-center py-4">{error}</p>
    }

    return (
        <>
            {search ? (
                <TableAndSearch
                    datos={cuentas}
                    onDobleClickFila={onDoubleClick}
                    onFilaSeleccionada={onSelectFile}
                    encabezados={encabezados}
                    searchFilters={['id', 'saldo']}
                />
            ) : (
                <Table
                    datos={cuentas}
                    onDobleClickFila={onDoubleClick}
                    onFilaSeleccionada={onSelectFile}
                    encabezados={encabezados}
                />
            )}
        </>
    )
}
