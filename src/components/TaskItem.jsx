import { useState, useRef } from "react";
import Button from "./Button";
import Badge from "./Badge";
import { validarTitulo } from "../utils/validarTitulo";

const TaskItem = ({ tarea, enCurso, onCompletar, onEliminar, onEditar }) => {
  // Estados locales solo para la edición de ESTA tarea en particular
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(tarea.titulo);
  const [error, setError] = useState("");
  // Marca si la edición se cancela con Escape (no debe guardar)
  const cancelandoRef = useRef(false);

  // Activa el modo edición (RF06: doble clic)
  const handleDoubleClick = () => {
    if (enCurso) return;
    setIsEditing(true);
    setEditTitle(tarea.titulo);
    setError("");
  };

  const cerrarEdicion = () => {
    setIsEditing(false);
    setError("");
  };

  // Guarda los cambios
  const handleGuardar = async () => {
    // Validación compartida con el formulario (RF04)
    const errorValidacion = validarTitulo(editTitle);
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    const limpio = editTitle.trim();
    if (limpio === tarea.titulo) {
      cerrarEdicion(); // sin cambios: no se hace petición
      return;
    }

    // Solo se cierra si la operación funcionó; si falla, App muestra el error
    const ok = await onEditar(tarea.id, { titulo: limpio });
    if (ok) cerrarEdicion();
  };

  // Enter y Escape quitan el foco; onBlur decide si guardar o cancelar.
  // Así el guardado ocurre en un solo lugar y no se ejecuta dos veces.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      cancelandoRef.current = true;
      e.currentTarget.blur();
    }
  };

  const handleBlur = () => {
    if (cancelandoRef.current) {
      cancelandoRef.current = false;
      cerrarEdicion();
      return;
    }
    handleGuardar();
  };

  return (
    <li className="task-item">
      <div className="task-info">
        <Badge texto={tarea.completada ? "completada" : "pendiente"} />
        {tarea.idRemoto === null && (
          <Badge texto="local" titulo="Creada en esta sesión: la API simulada no la guarda" />
        )}

        {/* Renderizado condicional: ¿Input o Texto normal? */}
        {isEditing ? (
          <div className="task-edicion">
            <input
              type="text"
              className="task-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={enCurso}
              autoFocus
              aria-label="Editar título de la tarea"
            />
            {error && <p className="form-error">{error}</p>}
          </div>
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            title="Haz doble clic para editar"
            className={tarea.completada ? "task-titulo task-titulo--completada" : "task-titulo"}
          >
            {tarea.titulo}
          </span>
        )}
      </div>

      {/* RF12: botones deshabilitados mientras hay una operación en curso */}
      <div className="task-acciones">
        <Button
          label={enCurso ? "Guardando..." : tarea.completada ? "Desmarcar" : "Completar"}
          onClick={() => onCompletar(tarea.id)}
          variant={tarea.completada ? "success" : "primary"}
          disabled={enCurso || isEditing}
        />
        <Button
          label="Eliminar"
          onClick={() => onEliminar(tarea.id)}
          variant="danger"
          disabled={enCurso || isEditing}
        />
      </div>
    </li>
  );
};

export default TaskItem;