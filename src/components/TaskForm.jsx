import { useState } from "react";
import Button from "./Button";

const TaskForm = ({ onAgregar }) => {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación (RF04)
    if (titulo.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres útiles.");
      return;
    }
    
    onAgregar(titulo.trim());
    setTitulo("");
    setError("");
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
        />
        <Button label="Agregar" variant="primary" />
      </form>
      
      {/* Mensaje de error condicional */}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TaskForm;