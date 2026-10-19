import Card from "../components/Card";
import TaskList from "../components/TaskList";

const TasksView = ({ tareas, onCompletar, onEliminar, onEditar, filtro, setFiltro, busqueda, setBusqueda, cargando, error }) => {
  return (
    <Card titulo="Mis tareas">
      <TaskList
        tareas={tareas}
        onCompletar={onCompletar}
        onEliminar={onEliminar}
        onEditar={onEditar}
        filtro={filtro}
        setFiltro={setFiltro}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        cargando={cargando}
        error={error}
      />
    </Card>
  );
};

export default TasksView;