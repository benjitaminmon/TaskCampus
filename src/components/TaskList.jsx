import Button from "./Button";
import Badge from "./Badge";

const TaskList = ({ tareas, onCompletar, onEliminar, filtro, setFiltro, cargando, error }) => {
  
  // Renderizado condicional para estado de carga (RF11)
  if (cargando) {
    return <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>⏳ Cargando tareas...</p>;
  }

  // Renderizado condicional para estado de error (RF11)
  if (error) {
    return <p style={{ textAlign: "center", color: "#dc2626", padding: "20px" }}>⚠️ Error: {error}</p>;
  }

  return (
    <div>
      {/* Botones de filtro que actualizan el estado en App.jsx */}
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

      {/* Lista de tareas */}
      <ul className="task-list" style={{ listStyle: "none", padding: 0 }}>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="task-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffffff",
              border: "1px solid #dbeafe",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "10px",
            }}
          >
            {/* Zona Izquierda: Título y Badge */}
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "#94a3b8" : "inherit",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <Badge texto={tarea.completada ? "completada" : "pendiente"} />
              {tarea.titulo}
            </span>

            {/* Zona Derecha: Botones de Acción */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
              <Button
                label={tarea.completada ? "Desmarcar" : "Completar"}
                onClick={() => onCompletar(tarea.id)}
                variant={tarea.completada ? "success" : "primary"}
              />
              <Button
                label="Eliminar"
                onClick={() => onEliminar(tarea.id)}
                variant="danger"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Renderizado condicional si no hay resultados para el filtro activo (RF11) */}
      {tareas.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8", marginTop: "20px" }}>
          🎉 No hay tareas en esta categoría.
        </p>
      )}
    </div>
  );
};

export default TaskList;