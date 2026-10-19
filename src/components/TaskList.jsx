import TaskItem from "./TaskItem"; // <-- Importamos el nuevo componente
import Button from "./Button";

const TaskList = ({ tareas, onCompletar, onEliminar, onEditar, filtro, setFiltro, cargando, error }) => {
  
  if (cargando) return <p style={{ textAlign: "center", color: "#64748b" }}>⏳ Cargando tareas...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#dc2626" }}>⚠️ Error: {error}</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
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

      <ul className="task-list" style={{ listStyle: "none", padding: 0 }}>
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.id}
            tarea={tarea}
            onCompletar={onCompletar}
            onEliminar={onEliminar}
            onEditar={onEditar} // <-- Pasamos la función de edición
          />
        ))}
      </ul>

      {tareas.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8", marginTop: "20px" }}>
          🎉 No hay tareas en esta categoría.
        </p>
      )}
    </div>
  );
};

export default TaskList;