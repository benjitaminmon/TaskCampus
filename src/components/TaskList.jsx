import TaskItem from "./TaskItem";
import Button from "./Button";

// <-- NUEVO: Recibe busqueda y setBusqueda en las props
const TaskList = ({ tareas, onCompletar, onEliminar, onEditar, filtro, setFiltro, busqueda, setBusqueda, cargando, error }) => {
  
  if (cargando) return <p style={{ textAlign: "center", color: "#64748b" }}>⏳ Cargando tareas...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#dc2626" }}>⚠️ Error: {error}</p>;

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="🔍 Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "0.95rem",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

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
            onEditar={onEditar}
          />
        ))}
      </ul>

      {tareas.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8", marginTop: "20px" }}>
          🎉 No hay tareas en esta categoría o búsqueda.
        </p>
      )}
    </div>
  );
};

export default TaskList;