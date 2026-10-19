import TaskItem from "./TaskItem";
import Button from "./Button";

const TaskList = ({
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
    <div>
      <input
        type="search"
        className="task-input task-busqueda"
        placeholder="🔍 Buscar por título..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        aria-label="Buscar tareas por título"
      />

      <div className="task-filtros">
        <Button
          label="📋 Todas"
          onClick={() => setFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="⏳ Pendientes"
          onClick={() => setFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="✅ Completadas"
          onClick={() => setFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>

      <ul className="task-list">
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.id}
            tarea={tarea}
            enCurso={idsEnCurso.includes(tarea.id)}
            onCompletar={onCompletar}
            onEliminar={onEliminar}
            onEditar={onEditar}
          />
        ))}
      </ul>

      {/* Mensajes de lista vacía diferenciados (RF11) */}
      {totalTareas === 0 && (
        <p className="estado-vacio">Aún no hay tareas. Crea una en "Nueva Tarea".</p>
      )}
      {totalTareas > 0 && tareas.length === 0 && (
        <p className="estado-vacio">🎉 No hay tareas en esta categoría o búsqueda.</p>
      )}
    </div>
  );
};

export default TaskList;