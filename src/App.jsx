import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import ActionButton from './components/ActionButton'

// Modelo de datos común para toda la app: { id, titulo, completada }
const TAREAS_INICIALES = [
  { id: 1, titulo: 'Aprender qué es React', completada: false },
  { id: 2, titulo: 'Crear proyecto con Vite', completada: true },
  { id: 3, titulo: 'Practicar JSX', completada: false },
]

function App() {
  // Estado: la colección de tareas vive en App y se comparte por props
  const [tareas, setTareas] = useState(TAREAS_INICIALES)

  // Dato derivado: se calcula desde el estado, no se guarda aparte
  const todasCompletadas = tareas.every((tarea) => tarea.completada)

  // Alterna pendiente/completada creando un array y un objeto NUEVOS
  function alternarTarea(id) {
    setTareas((previas) =>
      previas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    )
  }

  function completarTodas() {
    setTareas((previas) =>
      previas.map((tarea) => ({ ...tarea, completada: true }))
    )
  }

  return (
    <main className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      <TaskSummary tareas={tareas} />
      <TaskList
        title="Listado de tareas de hoy"
        tareas={tareas}
        onToggle={alternarTarea}
      />
      <ActionButton
        label="Marcar todas como completadas"
        onAction={completarTodas}
        disabled={todasCompletadas}
      />
    </main>
  )
}

export default App