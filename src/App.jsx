import { useState, useEffect } from "react";
import useTareas from "./hooks/useTareas";
import Card from "./components/Card";
import Header from "./components/Header";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
  const {
    tareas,
    cargando,
    error,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  } = useTareas();

  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  // NUEVO: estado de filtro levantado a App (lifting state up)
  const [filtro, setFiltro] = useState("todas");

  // NUEVO: lista filtrada derivada en App (no es otro useState)
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "completadas") return t.completada;
    if (filtro === "pendientes") return !t.completada;
    return true;
  });

  // Actualiza el título del navegador con las tareas pendientes
  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  // Temporizador con cleanup para evitar memory leaks
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TaskCampus activo");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAgregarTarea = (titulo) => {
    crearTarea(titulo);
  };

  const handleToggleCompletada = (id, completadaActual) => {
    actualizarTarea(id, { completada: !completadaActual });
  };

  const handleConfirmarEliminacion = () => {
    eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />

      <Card titulo="Resumen de tareas">
        <TaskSummary
          total={tareas.length}
          completadas={tareas.filter((t) => t.completada).length}
          pendientes={tareas.filter((t) => !t.completada).length}
          // NUEVO: datos derivados del filtro
          mostrando={tareasFiltradas.length}
          filtroActual={filtro}
        />
      </Card>

      <TaskForm onAgregar={handleAgregarTarea} />

      {cargando && <p className="estado-carga">⏳ Cargando tareas...</p>}
      {error && <p className="estado-error">⚠️ Error: {error}</p>}

      {!cargando && !error && (
        <Card titulo="Mis tareas">
          <TaskList
            // Ahora la lista ya viene filtrada desde App
            tareas={tareasFiltradas}
            // Filtro y setter levantados a App
            filtro={filtro}
            onCambiarFiltro={setFiltro}
            // Toggle levantado a App
            onToggle={handleToggleCompletada}
            onEliminar={setTareaAEliminar}
          />
        </Card>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  );
};

export default App;