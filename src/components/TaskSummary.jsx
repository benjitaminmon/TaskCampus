function TaskSummary({ tareas = [] }) {
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <section className="card">
      <h2 className="section-title">Resumen de Tareas</h2>
      <p>Total de tareas: {total}</p>
      <p>Tareas completadas: {completadas}</p>
      <p>Tareas pendientes: {pendientes}</p>
    </section>
  );
}

export default TaskSummary;