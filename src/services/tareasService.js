// Capa de comunicación HTTP (Tutorial 12, Parte 2).
// Es el único archivo que conoce la URL y el formato de la API.
// La API usa { title, completed } y la app usa { titulo, completada }: aquí se traduce.
const API_URL = "https://jsonplaceholder.typicode.com/todos";
const HEADERS_JSON = { "Content-Type": "application/json" };

// Convierte los cambios de la app ({ titulo, completada }) a los campos de la API
const aFormatoApi = (cambios) => {
  const datos = {};
  if (cambios.titulo !== undefined) datos.title = cambios.titulo;
  if (cambios.completada !== undefined) datos.completed = cambios.completada;
  return datos;
};

// GET: lectura de las primeras "limite" tareas
export const getTareas = async (limite = 10) => {
  const res = await fetch(`${API_URL}?_limit=${limite}`);
  if (!res.ok) throw new Error(`No se pudieron obtener las tareas (HTTP ${res.status})`);
  return await res.json();
};

// POST: creación
export const postTarea = async (titulo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS_JSON,
    body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
  });
  if (!res.ok) throw new Error(`No se pudo crear la tarea (HTTP ${res.status})`);
  return await res.json();
};

// PATCH: actualiza solo los campos enviados (estado o título)
export const patchTarea = async (idRemoto, cambios) => {
  const res = await fetch(`${API_URL}/${idRemoto}`, {
    method: "PATCH",
    headers: HEADERS_JSON,
    body: JSON.stringify(aFormatoApi(cambios)),
  });
  if (!res.ok) throw new Error(`No se pudo actualizar la tarea (HTTP ${res.status})`);
  return await res.json();
};

// DELETE: eliminación
export const deleteTarea = async (idRemoto) => {
  const res = await fetch(`${API_URL}/${idRemoto}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`No se pudo eliminar la tarea (HTTP ${res.status})`);
};