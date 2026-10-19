import Button from "./Button";

const Navigation = ({ vistaActiva, setVistaActiva }) => {
  return (
    <nav className="navigation" aria-label="Vistas de TaskCampus">
      <Button
        label="📊 Resumen"
        variant={vistaActiva === "resumen" ? "primary" : "secondary"}
        onClick={() => setVistaActiva("resumen")}
      />
      <Button
        label="📋 Tareas"
        variant={vistaActiva === "tareas" ? "primary" : "secondary"}
        onClick={() => setVistaActiva("tareas")}
      />
      <Button
        label="➕ Nueva Tarea"
        variant={vistaActiva === "nueva" ? "primary" : "secondary"}
        onClick={() => setVistaActiva("nueva")}
      />
    </nav>
  );
};

export default Navigation;
