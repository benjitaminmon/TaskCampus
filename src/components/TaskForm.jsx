import { useState } from "react";
import Button from "./Button";
import { validarTitulo } from "../utils/validarTitulo";

const TaskForm = ({ onAgregar, creando }) => {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación compartida con la edición (RF04)
    const errorValidacion = validarTitulo(titulo);
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    setError("");

    // El campo se limpia solo si la creación funcionó
    const ok = await onAgregar(titulo.trim());
    if (ok) {
      setTitulo("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe el título de la tarea..."
          className="task-input"
          disabled={creando}
        />
        {/* RF12: deshabilitado mientras se crea la tarea */}
        <Button
          type="submit"
          label={creando ? "Agregando..." : "Agregar"}
          variant="primary"
          disabled={creando}
        />
      </form>

      {/* Mensaje de error condicional */}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TaskForm;