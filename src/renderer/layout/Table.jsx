import { useState } from "react";

const Table = ({ encabezados, datos, onFilaSeleccionada, onDobleClickFila }) => {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const manejarSeleccion = (index) => {
    setFilaSeleccionada(index);
    if (onFilaSeleccionada) {
      onFilaSeleccionada(datos[index].id);
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

  // Soporte para propiedades anidadas con "."
  const keys = clave.split('.');

  // Recorremos cada nivel para obtener el valor anidado
  let valor = fila;
  for (const key of keys) {
    if (valor == null) break; // Si no existe el nivel, paramos
    valor = valor[key];
  }

  // Formateo especial para fecha
  if (keys[keys.length - 1].toLowerCase() === "fecha") {
    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) return valor;
    return fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return valor;
};


  const obtenerTitulo = (encabezado) => {
    return typeof encabezado === "string" ? encabezado : encabezado.titulo;
  };

  return (
    <div className="w-full">
      <table className="w-full bg-sky-900 border-white text-white shadow-lg shadow-black">
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
    </div>

  );
};

export default Table;
