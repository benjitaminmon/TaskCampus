// Importamos useState para manejar el estado local del formulario
import { useState } from "react";
// 🔹 NUEVO: usamos el componente reutilizable Button en lugar de <button> nativo
import Button from "./Button";
// TaskForm recibe una función onAgregar desde App.jsx
// que se ejecutará cuando el usuario envíe una tarea válida
const TaskForm = ({ onAgregar }) => {
  // Estado que almacena lo que el usuario escribe en el input
  // Inicia vacío y se actualiza con cada tecla que el usuario presiona
  const [titulo, setTitulo] = useState("");
  // Estado para mostrar mensajes de error al usuario
  // Inicia vacío (sin error) y se actualiza si la validación falla
  const [error, setError] = useState("");
  // Función que se ejecuta cuando el usuario envía el formulario
  // Recibe el evento "e" del formulario
  const handleSubmit = (e) => {
    // Evita que el formulario recargue la página (comportamiento por defecto del HTML)
    e.preventDefault();
    // CAMBIO: fortalecemos la validación
    // Antes: solo verificar que no estuviera vacío.
    // Ahora: además exigimos al menos 3 caracteres útiles.
    if (titulo.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return; // Sale de la función sin agregar nada
    }
    // Si la validación pasó, llamamos a onAgregar con el título limpio (sin espacios extremos)
    // Esta función viene de App.jsx y agrega la tarea al array de tareas
    onAgregar(titulo.trim());
    // Limpiamos el input para que quede vacío después de agregar
    setTitulo("");
    // Limpiamos cualquier mensaje de error que pudiera existir
    setError("");
  };

  return (
    // CAMBIO: en lugar de usar <form className="card"> directamente,
    // seguimos la estructura del segundo código:
    // div.card → título → form.task-form
    <div className="card">
      <h2 className="section-title">Agregar Nueva Tarea</h2>
      {/* onSubmit conecta el formulario con nuestra función handleSubmit */}
      <form onSubmit={handleSubmit} className="task-form">
        {/* Input controlado: su valor SIEMPRE refleja el estado "titulo"
            onChange actualiza el estado con cada tecla que el usuario presiona */}
        {/* CAMBIO: usamos clases CSS ('task-input') en lugar de estilos inline
            para centralizar el diseño en App.css */}
        <input
          type="text"
          value={titulo} // React controla el valor del input
          onChange={(e) => setTitulo(e.target.value)} // e.target.value es lo que el usuario escribió
          placeholder="Escribe el título de la tarea..."
          className="task-input"/>
        {/* CAMBIO: reemplazamos el <button> nativo por el componente Button reutilizable
            y dejamos que type="submit" lo maneje el propio form */}
        <Button label="Agregar" variant="primary" />
      </form>

      {/* Renderizado condicional: el mensaje de error solo aparece si "error" no está vacío
          Antes: estilo inline en rojo; ahora usamos la clase 'form-error' para mantener consistente
          el diseño */}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TaskForm;