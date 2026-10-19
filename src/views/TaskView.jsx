import Card from "../components/Card";
import TaskList from "../components/TaskList";

const TasksView = ({
  tareas,
  totalTareas,
  onCompletar,
  onEliminar,
  onEditar,
  filtro,
  setFiltro,
  busqueda,
  setBusqueda,
  idsEnCurso,
}) => {
  return (
    <Card titulo="Mis tareas">
      <TaskList
        tareas={tareas}
        totalTareas={totalTareas}
        onCompletar={onCompletar}
        onEliminar={onEliminar}
        onEditar={onEditar}
        filtro={filtro}
        setFiltro={setFiltro}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        idsEnCurso={idsEnCurso}
      />
    </Card>
  );
};

export default TasksView;