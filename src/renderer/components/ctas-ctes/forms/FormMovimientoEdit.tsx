import { useEffect } from "react"
import DynamicForm from "../../../layout/DynamicForm"
import Title from "../../../layout/Title"
import { useCc } from "../../../hooks/useCc"

interface Props {
  id: number
}

export default function FormMovimientoEdit({ id }: Props) {
  /* const { getById, editMovimiento, refresh } = use()

  const movimiento = getById(id)

  useEffect(() => {
    if (!movimiento) refresh()
  }, [movimiento, refresh])

  if (!movimiento) {
    return <p className="text-center py-4">Cargando movimiento...</p>
  }

  return (
    <div>
      <Title>Editar Movimiento</Title>
      <DynamicForm
        inputs={[
          {
            name: "tipo",
            label: "Tipo",
            type: "select",
            required: true,
            value: movimiento.tipo,
            options: [
              { label: "-", value: "" },
              { label: "Entrada", value: "entrada" },
              { label: "Salida", value: "salida" },
            ],
          },
          {
            name: "monto",
            label: "Monto",
            type: "number",
            required: true,
            value: movimiento.monto,
          },
          {
            name: "descripcion",
            label: "Descripción",
            type: "text",
            value: movimiento.descripcion || "",
          },
          {
            name: "fecha",
            label: "Fecha",
            type: "date",
            required: true,
            value: movimiento.fecha,
          },
          {
            name: "categoriaId",
            label: "Categoría (ID)",
            type: "number",
            value: movimiento.categoriaId || "",
          },
          {
            name: "usuarioId",
            label: "Usuario (ID)",
            type: "number",
            required: true,
            value: movimiento.usuarioId,
          },
          {
            name: "metodosPago",
            label: "Métodos de Pago (JSON)",
            type: "textarea",
            required: true,
            value: JSON.stringify(movimiento.metodosPago || [], null, 2),
          },
        ]}
        onSubmit={(data: any) => editMovimiento(id, data)}
        titleBtn="Guardar cambios"
      />
    </div>
  ) */
}
