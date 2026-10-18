function TaskList({ title, tareas, onToggle }) {
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>
      <ul className="task-list">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="task-item">
            <span
              className={
                tarea.completada ? 'task-title task-title--completed' : 'task-title'
              }
            >
              {tarea.titulo}
            </span>
            <button
              className={tarea.completada ? 'task-button-secondary' : 'task-button'}
              onClick={() => onToggle(tarea.id)}
            >
              {tarea.completada ? 'Marcar pendiente' : 'Completar'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TaskList