function TaskSummary({ tareas }) {
  // Contadores derivados: siempre coinciden con la lista
  const total = tareas.length
  const completadas = tareas.filter((tarea) => tarea.completada).length
  const pendientes = total - completadas

  return (
    <section className="card">
      <h2 className="section-title">Resumen</h2>
      <ul className="summary-list">
        <li>Total: <strong>{total}</strong></li>
        <li>Pendientes: <strong>{pendientes}</strong></li>
        <li>Completadas: <strong>{completadas}</strong></li>
      </ul>
    </section>
  )
}

export default TaskSummary