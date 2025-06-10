import Title from '../../../layout/Title'
import DynamicForm from '../../../layout/DynamicForm'
import MetodosPagoInput from '../SelectMetodosPago'
import { useCuentasCorrientes } from '../../../hooks/useCc'
import { addMovimiento } from '../../../store/movesSlice'

export default function FormMovimiento({ cuentaId }: { cuentaId: number }) {
  const { } = useCuentasCorrientes()

  return (
    <div>
      <Title>Nuevo Movimiento</Title>
      <DynamicForm
        inputs={[
          {
            name: 'tipo',
            label: 'Tipo',
            type: 'select',
            required: true,
            options: [
              { label: '-', value: '' },
              { label: 'Entrada', value: 'entrada' },
              { label: 'Salida', value: 'salida' },
            ],
          },
          { name: 'monto', label: 'Monto', type: 'number', required: true },
          { name: 'descripcion', label: 'Descripción', type: 'text' },
          { name: 'categoriaId', label: 'Categoría (ID)', type: 'number' },

          {
            name: 'metodosPago',
            label: 'Métodos de Pago',
            type: 'component',
            required: true,
            Component: MetodosPagoInput,
          },
        ]}
        onSubmit={(data: any) => addMovimiento(data)}
        titleBtn="Crear Movimiento"
      />
    </div>
  )
}
