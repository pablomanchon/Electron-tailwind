import Title from '../../../layout/Title'
import DynamicForm from '../../../layout/DynamicForm'
import MetodosPagoInput from '../SelectMetodosPago'
import { useMoves } from '../../../hooks/useMoves'

export default function FormMovimiento({ cuentaId, tipo }: { cuentaId: number, tipo: string }) {
  const { crear } = useMoves();

  return (
    <div>
      <Title>{tipo} DE DINERO</Title>
      <DynamicForm
        inputs={[
          {
            name: 'tipo',
            label: 'Tipo',
            type: 'text',
            required: true,
            value: tipo,
            hidden: true
          },
          {
            name: 'cuentaCorrienteId',
            label: '',
            type: 'text',
            required: true,
            value: cuentaId,
            hidden: true
          },
          { name: 'monto', label: 'Monto', type: 'number', required: true },
          { name: 'descripcion', label: 'Descripción', type: 'text', },
          {
            name: 'categoria', label: 'Categoría', type: 'select', options: [
              { label: "-", value: "" },
              { label: "Ajuste de saldo", value: "Ajuste de saldo" },
              { label: "Vino", value: "Vino" },
              { label: "Otro", value: "Otro" },
            ], required: true
          },

          {
            name: 'metodosPago',
            label: 'Métodos de Pago',
            type: 'component',
            required: true,
            Component: MetodosPagoInput,
          },
        ]}
        onSubmit={(data: any) => crear(data)}
        titleBtn="Crear Movimiento"
      />
    </div>
  )
}
