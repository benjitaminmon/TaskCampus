# TaskCampus - Gestión de Tareas Académicas

## Datos del Equipo
* **Integrantes:** 
  * Ivan Herrera
  * Benjamin Diaz
  * Benjamin Lagos
* **Repositorio Git público:** https://github.com/benjitaminmon/TaskCampus

## Entorno y Ejecución
* **Node.js:** v18.x o superior.
* **npm:** v9.x o superior.

### Instrucciones de instalación y ejecución
1. Clonar el repositorio.
2. Abrir una terminal en la raíz del proyecto.
3. Instalar las dependencias ejecutando: `npm install`
4. Iniciar el servidor de desarrollo local: `npm run dev`
5. Para compilar el proyecto para producción: `npm run build`

## Comparación: Proyecto Base vs Desarrollo Realizado
El proyecto base proporcionado consistía en una interfaz estática contenida principalmente en un único archivo, con datos fijos escritos directamente en JSX, botones sin funcionalidad real (solo alertas) y sin persistencia de estado. 

El desarrollo realizado transformó esta base en una aplicación React funcional y modular. Se implementó una arquitectura basada en la separación de responsabilidades (Servicios, Hooks, Componentes y Vistas). Se integró consumo de API mediante HTTP, gestión de estado local sin mutaciones, renderizado dinámico de listas mediante `map`, un sistema de navegación por renderizado condicional y operaciones CRUD completas con manejo de validaciones y estados de carga.

## Estructura y Vistas
La aplicación se dividió en las siguientes vistas principales, gestionadas desde `App.jsx`:
1. **SummaryView (Resumen):** Presenta métricas calculadas dinámicamente a partir del estado general de las tareas y el filtro activo.
2. **TasksView (Tareas):** Contiene la lista principal, el buscador por texto, los filtros por estado y las acciones para editar, completar y eliminar.
3. **NewTaskView (Nueva Tarea):** Contiene el formulario controlado para la creación de tareas, incluyendo validaciones de longitud y formato.

## Limitaciones de la API (JSONPlaceholder)
Este proyecto utiliza JSONPlaceholder como API simulada. Todas las operaciones HTTP (GET, POST, PUT/PATCH, DELETE) se realizan y comprueban correctamente. Sin embargo, por la naturaleza de JSONPlaceholder, las escrituras (POST, PUT, DELETE) devuelven una respuesta de éxito pero no alteran los datos en el servidor real. 

Por lo tanto, la carga inicial siempre traerá los mismos 10 registros. Las modificaciones realizadas durante la sesión se mantienen en el estado local de React para permitir la interacción del usuario, pero se perderán al recargar el navegador.

---

## Registro de Investigación y Pruebas

### 1. Navegación entre vistas
* **Explicación:** Se implementó navegación sin recargar la página ni usar dependencias externas (como React Router). Se utilizó un estado `vistaActiva` en `App.jsx` que determina qué componente de vista renderizar en pantalla.
* **Fuentes consultadas:** Documentación oficial de React (Renderizado condicional y Elevación del estado).
* **Archivos donde se aplicó:** `src/App.jsx`, `src/components/Navigation.jsx`.
* **Procedimiento de verificación:** 
  1. Ing