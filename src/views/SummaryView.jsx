import Card from "../components/Card";
import TaskSummary from "../components/TaskSummary";

const SummaryView = ({ total, completadas, pendientes, mostrando, filtroActual, busqueda }) => {
  return (
    <Card titulo="Resumen de tareas">
      <TaskSummary
        total={total}
        completadas={completadas}
        pendientes={pendientes}
        mostrando={mostrando}
        filtroActual={filtroActual}
        busqueda={busqueda}
      />
    </Card>
  );
};

export default SummaryView;