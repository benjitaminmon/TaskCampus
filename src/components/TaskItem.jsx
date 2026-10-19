import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

const TaskItem = ({ tarea, onCompletar, onEliminar, onEditar }) => {
  // Estados locales solo para la edición de ESTA tarea en particular
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(tarea.titulo);
  const [error, setError] = useState("");

  // Activa el modo edición (Exigencia RF06: Doble clic)
  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(tarea.titulo);
    setError("");
  };

  // Guarda los cambios
  const handleGuardar = () => {
    // Validación (Exigencia RF04: No guardar vacío y mostrar error)
    if (editTitle.trim() === "") {
      setError("El título no puede quedar vacío.");
      return; 
    }
    
    // Si el texto cambió realmente, llamamos a la API
    if (editTitle.trim() !== tarea.titulo) {
      onEditar(tarea.id, { titulo: editTitle.trim() });
    }
    
    setIsEditing(false);
    setError("");
  };

  // Maneja las teclas Enter y Escape (Exigencia RF06)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGuardar();
    } else if (e.key === "Escape") {
      // Si se arrepiente, vuelve a la normalidad sin guardar
      setIsEditing(false);
      setEditTitle(tarea.titulo);
      setError("");
    }
  };

  return (
    <li
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <Badge texto={tarea.completada ? "completada" : "pendiente"} />
        
        {/* Renderizado condicional: ¿Input o Texto normal? */}
        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", flex: 1, marginRight: "15px" }}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleGuardar}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{
                padding: "6px 8px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                outline: "none"
              }}
            />
            {error && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "4px" }}>{error}</span>}
          </div>
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            title="Haz doble clic para editar"
            style={{
              textDecoration: tarea.completada ? "line-through" : "none",
              color: tarea.completada ? "#94a3b8" : "inherit",
              cursor: "text",
              flex: 1
            }}
          >
            {tarea.titulo}
          </span>
        )}
      </div>

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
  );
};

export default TaskItem;