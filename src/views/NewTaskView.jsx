import Card from "../components/Card";
import TaskForm from "../components/TaskForm";

const NewTaskView = ({ onAgregar, creando }) => {
  return (
    <Card titulo="Agregar Nueva Tarea">
      <TaskForm onAgregar={onAgregar} creando={creando} />
    </Card>
  );
};

export default NewTaskView;