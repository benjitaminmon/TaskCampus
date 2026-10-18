# TaskCampus

Aplicación web desarrollada con **React + Vite (JavaScript)** para gestionar tareas académicas: consultar, crear, cambiar de estado, editar, eliminar y filtrar tareas.

## Integrantes

- Iván Herrera
- Benjamín Diaz
- Benjamín Lagos

## Requisitos

| Herramienta | Versión utilizada |
|---|---|
| Node.js | v24.21.0 |
| npm | 11.19.0 |

## Instalación

```bash
git clone https://github.com/benjitaminmon/TaskCampus.git
cd TaskCampus
npm install
```

> `node_modules` no se incluye en el repositorio; se genera con `npm install` a partir de `package.json` y `package-lock.json`.

## Ejecución en desarrollo

```bash
npm run dev
```

Abrir en el navegador la URL que indica la consola (por defecto `http://localhost:5173`).

## Compilación

```bash
npm run build     # genera la versión de producción en dist/
npm run preview   # sirve localmente la versión compilada
npm run lint      # revisa el código con ESLint
```

## Estructura del proyecto

```
src/
├── main.jsx            Punto de entrada: monta <App /> en el div#root de index.html
├── App.jsx             Componente principal: coordina datos, acciones y vistas
├── App.css             Estilos de la aplicación
├── index.css           Estilos globales
├── components/         Componentes de presentación (Header, TaskList, TaskSummary, ...)
├── views/              Vistas: Resumen, Tareas y Nueva tarea
├── hooks/              useTareas: estado y operaciones de tareas
└── services/           tareasService: peticiones HTTP a la API
```

## Modelo de datos

Todas las tareas usan la misma representación en todos los componentes:

```js
{ id: 1, titulo: 'Aprender qué es React', completada: false }
```

> JSONPlaceholder devuelve `title` y `completed`; el servicio debe convertirlos a `titulo` y `completada`.

## Comparación entre la base recibida y el desarrollo

| Elemento | Base recibida | Desarrollo realizado |
|---|---|---|
| Tareas | Arreglo de textos fijo dentro de `TaskList` | Objetos `{ id, titulo, completada }` guardados en estado (`useState`) en `App` |
| `TaskList` | Tres `<li>` escritos a mano; botones con `alert`; ignoraba la prop `title` | Lista generada con `map` y `key={tarea.id}`; botón que alterna pendiente/completada; usa la prop `title` |
| `TaskSummary` | Mostraba un total fijo (`total={3}`) | Calcula total, pendientes y completadas desde las tareas |
| `ActionButton` | Ejecutaba un `alert` | Acción real configurable por props (`label`, `onAction`, `disabled`): marcar todas como completadas |
| Actualización del estado | No existía estado | Actualizaciones inmutables con la forma funcional `setTareas(previas => ...)` |
| Estilos | Contenedor, tarjetas, lista y botones | Estilos para tarea completada, resumen y botón deshabilitado, todos en `App.css` |

_Pendiente: completar con API, CRUD, filtros, modal y navegación._

## Vistas

_Pendiente._

## Limitaciones de la API

_Pendiente: JSONPlaceholder simula las escrituras; los cambios se mantienen solo durante la sesión y no persisten al recargar._

## Investigación

_Pendiente: navegación entre vistas, estado derivado, actualización funcional del estado e identificadores locales vs. remotos (explicación, fuentes, archivos y verificación)._

## Registro de pruebas

| Caso probado | Pasos | Resultado esperado | Resultado obtenido | Evidencia |
|---|---|---|---|---|
| Carga inicial | Ejecutar `npm run dev` y abrir la app | Se muestran 3 tareas; resumen: total 3, pendientes 2, completadas 1 | Correcto | `App.jsx`, `TaskSummary.jsx` |
| Alternar estado | Clic en "Completar" y luego en "Marcar pendiente" | La tarea se tacha y se destacha; el resumen se actualiza | Correcto | `alternarTarea` en `App.jsx` |
| Completar todas | Clic en "Marcar todas como completadas" | Todas tachadas, completadas 3, botón deshabilitado | Correcto | `completarTodas` en `App.jsx` |
| Compilación | `npm run lint` y `npm run build` | Sin errores | Correcto | Consola |