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
  const {
    tareas,
    cargando,
    operando,
    error,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  } = useTareas();

  const [vistaActiva, setVistaActiva] = useState("resumen");
  const [tareaAEliminar, setTareaAEliminar] = useState(null);
  const [filtro, setFiltro] = useState("todas");
  
  const [busqueda, setBusqueda] = useState(""); 

  const pendientesCount = tareas.filter((t) => !t.completada).length;
  const completadasCount = tareas.filter((t) => t.completada).length;

  const tareasFiltradas = tareas.filter((t) => {
    let coincideEstado = true;
    if (filtro === "pendientes") coincideEstado = !t.completada;
    if (filtro === "completadas") coincideEstado = t.completada;

    const coincideTexto = t.titulo.toLowerCase().includes(busqueda.toLowerCase());

    return coincideEstado && coincideTexto;
  });

  useEffect(() => {
    document.title = `TaskCampus (${pendientesCount} pendientes)`;
  }, [pendientesCount]);

  const handleAgregar = async (titulo) => {
    const resultado = await crearTarea(titulo);
    if (resultado.exito) {
      setVistaActiva("tareas"); 
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
      
      <Navigation vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

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
          busqueda={busqueda}
          setBusqueda={setBusqueda}
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