import { useState, useEffect } from "react";
import useTareas from "./hooks/useTareas";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";
import SummaryView from "./views/SummaryView";
import TasksView from "./views/TaskView";
import NewTaskView from "./views/NewTaskView";
import "./App.css";

const App = () => {
  // Hook personalizado (CRUD y llamadas a API)
  const {
    tareas,
    cargando,
    operando,
    error,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  } = useTareas();

  // INVESTIGACIÓN 1: Estado para la navegación entre vistas
  const [vistaActiva, setVistaActiva] = useState("resumen");

  // Estado para el modal de eliminación
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  // INVESTIGACIÓN 2: Estado derivado (Filtros levantados a App)
  const [filtro, setFiltro] = useState("todas");

  // Cálculos derivados automáticos (no usan useState extra)
  const pendientesCount = tareas.filter((t) => !t.completada).length;
  const completadasCount = tareas.filter((t) => t.completada).length;

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  // Actualizar el título de la pestaña del navegador
  useEffect(() => {
    document.title = `TaskCampus (${pendientesCount} pendientes)`;
  }, [pendientesCount]);

  // Handlers para las acciones
  const handleAgregar = async (titulo) => {
    const resultado = await crearTarea(titulo);
    if (resultado.exito) {
      setVistaActiva("tareas"); // Redirige a la lista tras agregar con éxito
    }
  };

  const handleCompletar = (idLocal) => {
    const tarea = tareas.find((t) => t.id === idLocal);
    if (tarea) {
      actualizarTarea(idLocal, { completada: !tarea.completada });
    }
  };

  const handleEliminar = async () => {
    await eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />
      
      {/* Barra de navegación siempre visible */}
      <Navigation vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

      {/* RENDERIZADO CONDICIONAL DE LAS VISTAS */}
      {vistaActiva === "resumen" && (
        <SummaryView
          total={tareas.length}
          completadas={completadasCount}
          pendientes={pendientesCount}
          mostrando={tareasFiltradas.length}
          filtroActual={filtro}
        />
      )}

      {vistaActiva === "tareas" && (
        <TasksView
          tareas={tareasFiltradas}
          filtro={filtro}
          setFiltro={setFiltro}
          onCompletar={handleCompletar}
          onEliminar={setTareaAEliminar}
          onEditar={actualizarTarea}
          cargando={cargando}
          error={error}
        />
      )}

      {vistaActiva === "nueva" && (
        <NewTaskView onAgregar={handleAgregar} />
      )}

      {/* Modal de confirmación global */}
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