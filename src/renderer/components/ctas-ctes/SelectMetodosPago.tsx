import { useState } from "react"
import { MetodoPago } from "../../types/movimiento.dto"
import PrimaryButton from "../PrimaryButton"
import DangerBtn from "../DangerButton"

interface MetodoPagoDto {
  metodo: MetodoPago
  monto: string
}

interface Props {
  value: MetodoPagoDto[]
  onChange: (value: MetodoPagoDto[]) => void
}

export default function MetodosPagoInput({ value, onChange }: Props) {
  const [metodos, setMetodos] = useState<MetodoPagoDto[]>(value || [])

  const handleAdd = () => {
    setMetodos(prev => {
      const nuevos = [...prev, { metodo: MetodoPago.EFECTIVO, monto: "" }];
      onChange(nuevos);
      return nuevos;
    });
  };


  const handleRemove = (index: number) => {
    const nuevos = metodos.filter((_, i) => i !== index)
    setMetodos(nuevos)
    onChange(nuevos)
  }

  const handleChange = (index: number, key: keyof MetodoPagoDto, value: any) => {
    const nuevos = [...metodos]
    nuevos[index] = { ...nuevos[index], [key]: key === "monto" ? Number(value) : value }
    setMetodos(nuevos)
    onChange(nuevos)
  }

  return (
    <div>
      {metodos.map((mp, index) => (
        <div key={index} className="flex items-center gap-2">
          <select
            className="border px-2 py-1 rounded"
            value={mp.metodo}
            onChange={(e) => handleChange(index, "metodo", e.target.value)}
          >
            {Object.values(MetodoPago).map((metodo) => (
              <option key={metodo} value={metodo}>
                {metodo}
              </option>
            ))}
          </select>
          <input
  type="number"
  className="border px-2 py-1 rounded w-32"
  value={mp.monto}
  onChange={(e) => handleChange(index, "monto", e.target.value)}
  placeholder="Monto"
/>

          <DangerBtn functionClick={() => handleRemove(index)} title={"Quitar"} type={"button"} />
        </div>
      ))}
      <PrimaryButton functionClick={handleAdd} title={"Agregar Método de Pago"} type={"button"} />
    </div>
  )
}
