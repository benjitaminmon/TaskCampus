import { useState } from "react";

const TaskSummary = () => {
  const [completadas, setCompletadas] = useState(0);

  const marcarCompletada = () => {
    setCompletadas(completadas + 1);
  };

  return (
    <div>
      <p>
        Tareas completadas: <strong>{completadas}</strong>
      </p>
      <button onClick={marcarCompletada} className="task-button">
        Marcar como completada
      </button>
    </div>
  );
};

export default TaskSummary;