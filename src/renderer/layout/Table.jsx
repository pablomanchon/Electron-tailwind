import { useState } from "react";

const Table = ({ encabezados, datos, onFilaSeleccionada, onDobleClickFila }) => {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const manejarSeleccion = (index) => {
    setFilaSeleccionada(index);
    if (onFilaSeleccionada) {
      onFilaSeleccionada(datos[index]);
    }
  };

  const manejarDobleClick = (index) => {
    if (onDobleClickFila) {
      onDobleClickFila(datos[index].id);
    }
  };

  const formatearFecha = (valor) => {
    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) return valor;
    return fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const obtenerValor = (fila, encabezado) => {
    let clave = "";
    if (typeof encabezado === "string") {
      clave = encabezado.toLowerCase();
    } else if (typeof encabezado === "object" && encabezado.clave) {
      clave = encabezado.clave;
    }

    const valor = fila[clave];

    if (clave.toLowerCase() === "fecha") {
      return formatearFecha(valor);
    }

    return valor;
  };

  const obtenerTitulo = (encabezado) => {
    return typeof encabezado === "string" ? encabezado : encabezado.titulo;
  };

  return (
    <table className="w-full border-collapse border bg-blue-900 border-white text-white shadow-lg shadow-black">
      <thead className="border-white border-2">
        <tr>
          {encabezados.map((encabezado, index) => (
            <th key={index} className="border-white border-2 m-2 p-2">
              {obtenerTitulo(encabezado)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, index) => (
          <tr
            key={index}
            onClick={() => manejarSeleccion(index)}
            onDoubleClick={() => manejarDobleClick(index)}
            className={`cursor-pointer hover:bg-cyan-700 ${filaSeleccionada === index
              ? "bg-cyan-600"
              : index % 2 === 0
                ? "bg-gray-950"
                : "bg-gray-800"
              }`}
          >
            {encabezados.map((encabezado, i) => (
              <td key={i} className="px-2 border-x-2 text-center">
                {obtenerValor(fila, encabezado)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
