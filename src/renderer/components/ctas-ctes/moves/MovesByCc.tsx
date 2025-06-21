import { useEffect, useState } from 'react';
import { getMovimientosByCcIdAndDate } from '../../../db/dbMoves';
import { toast } from 'react-toastify';
import Table from '../../../layout/Table';
import Title from '../../../layout/Title';
import PrimaryButton from '../../PrimaryButton';

const encabezados = [
  { titulo: "Fecha", clave: "fecha" },
  { titulo: "Descripción", clave: "descripcion" },
  { titulo: "Monto", clave: "monto" },
  { titulo: "Tipo", clave: "tipo" },
  { titulo: "Categoría", clave: "categoria" },
];

export default function MovesByCc({ id }: { id: number }) {
  const [moves, setMoves] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date());

  const cargarMovimientos = async () => {
    try {
      const data = await getMovimientosByCcIdAndDate(id, fechaActual);
      console.log(data)
      setMoves(data);
    } catch (error: any) {
      toast.error(error.message || 'Error al obtener movimientos');
    }
  };

  useEffect(() => {
    cargarMovimientos();
  }, [fechaActual]);

  const cambiarDia = (delta: number) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(nuevaFecha.getDate() + delta);
    setFechaActual(nuevaFecha);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        cambiarDia(1);
      } else if (e.key === "ArrowLeft") {
        cambiarDia(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fechaActual]);

  return (
    <div className="flex flex-col gap-2">
      <Title>Movimientos del {fechaActual.toLocaleDateString('es-AR')}</Title>

      <div className='h-96 overflow-auto'>
        {
          moves.length === 0 ?
            <h5>No hay movimientos para la fecha {fechaActual.toLocaleDateString()}</h5>
            :
            <Table
              encabezados={encabezados}
              datos={moves}
              formatoFecha="hora" onDobleClickFila={(id: any) => console.log("Doble click en movimiento", id)}
              onFilaSeleccionada={(id: any) => console.log(id)}
            />
        }
      </div>

      <div className="flex gap-2 font-bold w-full items-center justify-center">
        <PrimaryButton functionClick={() => cambiarDia(-1)} title={"<"} />
        <PrimaryButton functionClick={() => cambiarDia(1)} title={">"} />
      </div>
    </div>
  );
}
