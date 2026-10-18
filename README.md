# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Implementación de Tutoriales 08 y 09

### Tutorial 08: Renderizado Dinámico y Condicional
- Migración a listas dinámicas utilizando `.map()` con `key={tarea.id}` en `TaskList.jsx`.
- Implementación de filtrado por estado (`todas`, `pendientes`, `completadas`) a través de la variable derivada `tareasFiltradas`.
- Renderizado condicional para mostrar mensaje cuando no existen tareas bajo la categoría seleccionada.

### Tutorial 09: Formularios Controlados, Persistencia y Efectos
- Creación del componente `TaskForm.jsx` para ingreso de tareas mediante inputs controlados y validación contra campos vacíos.
- Persistencia automática de tareas en `localStorage` usando `useEffect`.
- Consumo asíncrono con `fetch` hacia JSONPlaceholder (`/todos?_limit=10`) para carga inicial y simulación de peticiones `POST`.
- Sincronización del título del navegador (`document.title`) con tareas pendientes y temporizador con función de limpieza (*cleanup*).