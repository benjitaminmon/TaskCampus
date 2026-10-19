import { useState, useEffect } from "react";
import {
  getTareas,
  postTarea,
  patchTarea,
  deleteTarea,
} from "../services/tareasService";

// ---------------------------------------------------------------
// Identificadores (investigación "Identificadores y API simulada")
// - id: identificador LOCAL de la interfaz. Es único y estable; se usa como key
//   y para elegir qué tarea modificar o eliminar.
// - idRemoto: identificador de la tarea en JSONPlaceholder. Las tareas creadas
//   en la sesión no tienen uno real (la API responde siempre id 201), así que
//   se guarda null.
// ---------------------------------------------------------------
let contadorLocal = 0;
const crearIdLocal = () => `local-${Date.now()}-${++contadorLocal}`;

const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  // Errores separados: si falla una operación, la lista no desaparece
  const [errorCarga, setErrorCarga] = useState(null);
  const [errorOperacion, setErrorOperacion] = useState(null);
  // Operaciones en curso (RF12): mientras duran, sus controles se deshabilitan
  const [creando, setCreando] = useState(false);
  const [idsEnCurso, setIdsEnCurso] = useState([]);

  // Actualización funcional: el nuevo valor se calcula desde el anterior (prev)
  const marcarEnCurso = (id) => setIdsEnCurso((prev) => [...prev, id]);
  const desmarcarEnCurso = (id) =>
    setIdsEnCurso((prev) => prev.filter((idActual) => idActual !== id));

  // GET inicial: se ejecuta una sola vez al montar
  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await getTareas(10);
        setTareas(
          datos.map((t) => ({
            id: `api-${t.id}`, // identificador local
            idRemoto: t.id,    // identificador en la API
            titulo: t.title,
            completada: t.completed,
          }))
        );
      } catch (err) {
        setErrorCarga(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // POST: devuelve true o false para que el formulario sepa si limpiar el campo
  const crearTarea = async (titulo) => {
    setCreando(true);
    setErrorOperacion(null);
    try {
      const respuesta = await postTarea(titulo);
      const nueva = {
        id: crearIdLocal(),
        idRemoto: null, // la API no guarda la tarea: no tiene id remoto real
        titulo: respuesta.title,
        completada: respuesta.completed,
      };
      setTareas((prev) => [nueva, ...prev]);
      return true;
    } catch (err) {
      setErrorOperacion(err.message);
      return false;
    } finally {
      setCreando(false);
    }
  };

  // PATCH: sirve para cambiar el estado ({ completada }) o el título ({ titulo })
  const actualizarTarea = async (id, cambios) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return false;
    marcarEnCurso(id);
    setErrorOperacion(null);
    try {
      // Solo las tareas obtenidas por GET existen en la API.
      // Las creadas en la sesión se actualizan solo en el estado local.
      if (tarea.idRemoto !== null) {
        await patchTarea(tarea.idRemoto, cambios);
      }
      // El estado cambia solo si la operación terminó bien
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...cambios } : t))
      );
      return true;
    } catch (err) {
      setErrorOperacion(`"${tarea.titulo}": ${err.message}`);
      return false;
    } finally {
      desmarcarEnCurso(id);
    }
  };

  // Atajo para la edición en línea del título
  const editarTitulo = (id, nuevoTitulo) =>
    actualizarTarea(id, { titulo: nuevoTitulo });

  // DELETE
  const eliminarTarea = async (id) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return false;
    marcarEnCurso(id);
    setErrorOperacion(null);
    try {
      if (tarea.idRemoto !== null) {
        await deleteTarea(tarea.idRemoto);
      }
      setTareas((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      setErrorOperacion(`"${tarea.titulo}": ${err.message}`);
      return false;
    } finally {
      desmarcarEnCurso(id);
    }
  };

  const limpiarErrorOperacion = () => setErrorOperacion(null);

  return {
    tareas,
    cargando,
    errorCarga,
    errorOperacion,
    limpiarErrorOperacion,
    creando,
    idsEnCurso,
    crearTarea,
    actualizarTarea,
    editarTitulo,
    eliminarTarea,
  };
};

export default useTareas;