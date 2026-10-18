import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import "./App.css";

// Ya NO usamos useTareas directamente porque necesitamos
// combinar localStorage + API en una sola lógica controlada
const App = () => {
  // Estado principal con lazy initialization:
  // 1. Busca en localStorage
  // 2. Si no hay nada guardado -> arranca vacío (la API llenará después)
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("taskcampus-tareas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  // Estado de carga: true mientras pedimos datos a la API
  const [cargando, setCargando] = useState(false);
  // Estado de error: guarda mensaje si la API falla
  const [error, setError] = useState(null);

  // EFECTO 1: Si localStorage está vacío, carga desde la API
  // Solo se ejecuta una vez al montar (array vacío [])
  useEffect(() => {
    const hayDatosLocales = localStorage.getItem("taskcampus-tareas");

    // Si ya hay datos en localStorage no necesitamos ir a la API
    if (hayDatosLocales) return;

    // Si no hay datos locales -> pedimos a JSONPlaceholder
    const cargarDesdeAPI = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        // Adaptamos el formato de la API al formato de TaskCampus
        const tareasAdaptadas = data.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed,
        }));

        setTareas(tareasAdaptadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDesdeAPI();
  }, []);

  // EFECTO 2: Guarda en localStorage cada vez que tareas cambia
  useEffect(() => {
    localStorage.setItem("taskcampus-tareas", JSON.stringify(tareas));
  }, [tareas]);

  // EFECTO 3: Actualiza el título del navegador con pendientes
  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  // EFECTO 4: Intervalo de actividad con cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TaskCampus activo");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // FUNCIÓN 1: Agregar tarea localmente + notificar al servidor
  const agregarTarea = async (titulo) => {
    // Primero la agrega al estado local (se ve instantáneo en pantalla)
    const nuevaTarea = { id: Date.now(), titulo, completada: false };
    setTareas([...tareas, nuevaTarea]);

    // Luego notifica al servidor (JSONPlaceholder no guarda realmente,
    // pero simula la respuesta como si lo hiciera)
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
      });
      const data = await response.json();
      console.log("Tarea creada en servidor:", data);
    } catch (err) {
      console.error("Error al crear tarea en servidor:", err);
    }
  };

  // FUNCIÓN 2: Marcar tarea como completada
  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: true }
          : tarea
      )
    );
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />

      {/* Muestra el total de tareas en el resumen */}
      <TaskSummary total={tareas.length} />

      {/* Formulario: al enviar llama a agregarTarea con el título */}
      <TaskForm onAgregar={agregarTarea} />

      {/* Lista: recibe tareas para mostrar y onCompletar para el botón */}
      <TaskList tareas={tareas} onCompletar={completarTarea} cargando={cargando} error={error} />
    </div>
  );
};

export default App;