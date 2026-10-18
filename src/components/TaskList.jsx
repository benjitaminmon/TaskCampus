import Button from "./Button";
import Badge from "./Badge";
import { useState } from "react";

const TaskList = ({ tareas, onCompletar, onEliminar }) => {
  const [filtro, setFiltro] = useState("todas");

  // Filtra según el botón activo
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  return (
    <div>
      {/* Botones de filtro */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <Button
          label="📋 Todas"
          onClick={() => setFiltro("todas")}
          variant="primary"
        />
        <Button
          label="⏳ Pendientes"
          onClick={() => setFiltro("pendientes")}
          variant="primary"
        />
        <Button
          label="✅ Completadas"
          onClick={() => setFiltro("completadas")}
          variant="primary"
        />
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareasFiltradas.map((tarea) => (
          <li
            key={tarea.id}
            className="task-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Título tachado si está completada */}
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "#94a3b8" : "inherit",
              }}
            >
              <Badge texto={tarea.completada ? "completada" : "pendiente"} />
              &nbsp;&nbsp;&nbsp;
              {tarea.titulo}
            </span>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {/* Ícono si completada, botón si pendiente */}
              {tarea.completada ? (
                <span>✅</span>
              ) : (
                <Button
                  label="Completar"
                  onClick={() => onCompletar(tarea.id)}
                  variant="primary"
                />
              )}
              {/* Este botón activa el modal */}
              <Button
                label="Eliminar"
                onClick={() => onEliminar(tarea.id)}
                variant="danger"
              />
            </div>
          </li>
        ))}
      </ul>

      {tareasFiltradas.length === 0 && (
        <p>No hay tareas en esta categoría.</p>
      )}
    </div>
  );
};

export default TaskList;