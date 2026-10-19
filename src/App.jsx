import { useState, useEffect } from "react";
import useTareas from "./hooks/useTareas";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";
import Button from "./components/Button";
import SummaryView from "./views/SummaryView";
import TasksView from "./views/TaskView";
import NewTaskView from "./views/NewTaskView";
import "./App.css";

const App = () => {
  const {
    tareas,
    cargando,
    errorCarga,
    errorOperacion,
    limpiarErrorOperacion,
    creando,
    idsEnCurso,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  } = useTareas();

  const [vistaActiva, setVistaActiva] = useState("resumen");
  const [tareaAEliminar, setTareaAEliminar] = useState(null);
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Estado derivado: se calcula desde tareas, filtro y búsqueda (no se guarda)
  const pendientesCount = tareas.filter((t) => !t.completada).length;
  const completadasCount = tareas.filter((t) => t.completada).length;

  const tareasFiltradas = tareas.filter((t) => {
    let coincideEstado = true;
    if (filtro === "pendientes") coincideEstado = !t.completada;
    if (filtro === "completadas") coincideEstado = t.completada;

    const coincideTexto = t.titulo
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());

    return coincideEstado && coincideTexto;
  });

  useEffect(() => {
    document.title = `TaskCampus (${pendientesCount} pendientes)`;
  }, [pendientesCount]);

  // crearTarea devuelve true/false: solo se cambia de vista si la creación funcionó
  const handleAgregar = async (titulo) => {
    const ok = await crearTarea(titulo);
    if (ok) {
      setVistaActiva("tareas");
    }
    return ok;
  };

  const handleCompletar = (idLocal) => {
    const tarea = tareas.find((t) => t.id === idLocal);
    if (tarea) {
      actualizarTarea(idLocal, { completada: !tarea.completada });
    }
  };

  // Se cierra el modal antes de eliminar: así no se puede confirmar dos veces.
  // Mientras la petición termina, los botones de esa tarea quedan deshabilitados.
  const handleEliminar = () => {
    const id = tareaAEliminar;
    setTareaAEliminar(null);
    eliminarTarea(id);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />

      <Navigation vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

      {/* Error de una operación: se informa sin ocultar la lista */}
      {errorOperacion && (
        <div className="estado-error estado-error--operacion" role="alert">
          <span>⚠️ {errorOperacion}</span>
          <Button label="Cerrar" variant="secondary" onClick={limpiarErrorOperacion} />
        </div>
      )}

      {/* Carga inicial y error de carga: visibles en cualquier vista */}
      {cargando && <p className="estado-carga">⏳ Cargando tareas...</p>}
      {!cargando && errorCarga && (
        <p className="estado-error">⚠️ No se pudieron cargar las tareas: {errorCarga}</p>
      )}

      {!cargando && !errorCarga && (
        <>
          {vistaActiva === "resumen" && (
            <SummaryView
              total={tareas.length}
              completadas={completadasCount}
              pendientes={pendientesCount}
              mostrando={tareasFiltradas.length}
              filtroActual={filtro}
              busqueda={busqueda}
            />
          )}

          {vistaActiva === "tareas" && (
            <TasksView
              tareas={tareasFiltradas}
              totalTareas={tareas.length}
              filtro={filtro}
              setFiltro={setFiltro}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              idsEnCurso={idsEnCurso}
              onCompletar={handleCompletar}
              onEliminar={setTareaAEliminar}
              onEditar={actualizarTarea}
            />
          )}

          {vistaActiva === "nueva" && (
            <NewTaskView onAgregar={handleAgregar} creando={creando} />
          )}
        </>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirmar={handleEliminar}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  );
};

export default App;