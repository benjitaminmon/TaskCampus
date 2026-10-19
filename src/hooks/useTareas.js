// Importamos los hooks de React que necesitamos:
// - useState: para guardar datos que pueden cambiar (tareas, estados de carga y error)
// - useEffect: para ejecutar código automáticamente al montar el componente (cargar datos)
import { useState, useEffect } from "react";

// URL base de la API. La guardamos en una constante para no repetirla en cada fetch
// Si mañana cambia la URL, solo se modifica aquí
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Hook personalizado: es una función normal que empieza con "use"
// Encapsula TODA la lógica de tareas (estado + llamadas a la API)
// Los componentes que lo usen solo recibirán los datos y funciones, sin saber cómo funcionan
const useTareas = () => {

  // Estado que almacena el array de tareas. Empieza vacío
  const [tareas, setTareas] = useState([]);

  // Estado booleano: true mientras se están cargando datos de la API
  // Empieza en true porque la carga ocurre inmediatamente al montar
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error. null significa "sin error"
  const [error, setError] = useState(null);

  // useEffect con array vacío [] = se ejecuta UNA SOLA VEZ cuando el componente se monta
  // Es el lugar correcto para cargar datos iniciales desde una API
  useEffect(() => {

    // Definimos la función async adentro porque useEffect no puede ser async directamente
    const cargarTareas = async () => {
      try {
        // fetch hace una petición GET a la API
        // ?_limit=10 es un parámetro que le dice a JSONPlaceholder "dame solo 10 tareas"
        const res = await fetch(`${API_URL}?_limit=10`);

        // res.ok es true si el servidor respondió con código 200-299 (éxito)
        // Si no, lanzamos un error manualmente para que lo capture el catch
        if (!res.ok) throw new Error("Error al cargar las tareas");

        // Convertimos la respuesta de texto JSON a un objeto JavaScript
        const datos = await res.json();

        // La API devuelve { id, title, completed } pero en nuestra app usamos { id, titulo, completada }
        // map transforma cada objeto de la API al formato que necesitamos
        const tareasFormateadas = datos.map((t) => ({
          id: t.id,
          titulo: t.title,         // renombramos title → titulo
          completada: t.completed, // renombramos completed → completada
        }));

        // Guardamos las tareas formateadas en el estado
        setTareas(tareasFormateadas);

      } catch (err) {
        // Si algo falló (red caída, error HTTP, etc.), guardamos el mensaje de error
        // El componente podrá mostrar este mensaje al usuario
        setError(err.message);

      } finally {
        // finally se ejecuta SIEMPRE, haya habido error o no
        // Aquí apagamos el indicador de carga pase lo que pase
        setCargando(false);
      }
    };

    // Llamamos a la función que acabamos de definir
    cargarTareas();

  }, []); // [] = sin dependencias, solo se ejecuta al montar


  // POST — Crea una nueva tarea en la API y la agrega al estado local
  const crearTarea = async (titulo) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",                                   // Método HTTP para crear
        headers: { "Content-Type": "application/json" },  // Le decimos que enviamos JSON
        body: JSON.stringify({                            // Convertimos el objeto a texto JSON
          title: titulo,
          completed: false,
          userId: 1,
        }),
      });

      if (!res.ok) throw new Error("Error al crear la tarea");

      // La API responde con la tarea creada (pero JSONPlaceholder siempre devuelve id: 201)
      const nueva = await res.json();

      // Como el id de la API no es confiable (siempre 201), usamos Date.now()
      // que genera un número único basado en el tiempo actual (ej: 1715382600000)
      const tareaLocal = {
        id: Date.now(),
        titulo: nueva.title,
        completada: nueva.completed,
      };

      // Forma funcional de setTareas: prev es el array actual garantizado
      // Ponemos la nueva tarea AL INICIO del array con spread
      setTareas((prev) => [tareaLocal, ...prev]);

    } catch (err) {
      setError(err.message);
    }
  };

  // PUT — Actualiza campos específicos de una tarea existente
  // Recibe el id de la tarea y un objeto con los campos a cambiar (ej: { completada: true })
  const actualizarTarea = async (id, cambios) => {
    try {
      // La URL incluye el id para apuntar a una tarea específica: /todos/5
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios),
      });
      if (!res.ok) throw new Error("Error al actualizar la tarea");
      // Actualizamos el estado local sin llamar a la API de nuevo (más eficiente)
      // map recorre el array: si encuentra la tarea con ese id, la reemplaza por una NUEVA
      // { ...t } copia todas las propiedades actuales, { ...cambios } sobreescribe solo las que cambiaron
      // Las demás tareas (t.id !== id) se devuelven sin cambios
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...cambios } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE — Elimina una tarea de la API y la quita del estado local
  const eliminarTarea = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE", // No necesita body ni headers adicionales
      });

      if (!res.ok) throw new Error("Error al eliminar la tarea");

      // filter devuelve un nuevo array sin la tarea eliminada
      // Solo mantenemos las tareas cuyo id sea DIFERENTE al eliminado
      setTareas((prev) => prev.filter((t) => t.id !== id));

    } catch (err) {
      setError(err.message);
    }
  };
  // Retornamos todo lo que los componentes pueden necesitar:
  // - tareas: el array actual para mostrar en pantalla
  // - cargando: para mostrar un spinner o mensaje "Cargando..."
  // - error: para mostrar un mensaje si algo falló
  // - crearTarea, actualizarTarea, eliminarTarea: funciones para modificar los datos
  return { tareas, cargando, error, crearTarea, actualizarTarea, eliminarTarea };
};
export default useTareas;