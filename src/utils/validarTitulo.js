// Regla de validación única para crear (TaskForm) y editar (TaskItem) un título.
// Devuelve un mensaje de error, o "" si el título es válido.
export const MIN_CARACTERES = 3;

export const validarTitulo = (titulo) => {
  const limpio = titulo.trim();
  if (limpio === "") {
    return "El título no puede estar vacío ni tener solo espacios.";
  }
  if (limpio.length < MIN_CARACTERES) {
    return `El título debe tener al menos ${MIN_CARACTERES} caracteres.`;
  }
  return "";
};