import Card from "../components/Card";
import TaskForm from "../components/TaskForm";

const NewTaskView = ({ onAgregar }) => {
  return (
    <Card titulo="Agregar Nueva Tarea">
      <TaskForm onAgregar={onAgregar} />
    </Card>
  );
};

export default NewTaskView;