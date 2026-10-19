// TaskSummary: solo muestra los números que recibe por props.
// Todos los valores se calculan en App (estado derivado); aquí no se guarda ni recalcula nada.
const TaskSummary = ({
  total,
  completadas,
  pendientes,
  mostrando,
  filtroActual,
  busqueda = "",
}) => {
  // Texto que explica qué está contando "Mostrando": el filtro y, si existe, la búsqueda
  const detalle = busqueda.trim()
    ? `${filtroActual}, "${busqueda.trim()}"`
    : filtroActual;

  return (
    <div className="summary-grid">
      <div className="summary-item">
        <span className="summary-numero summary-numero--total">{total}</span>
        <span className="summary-label">Total</span>
      </div>
      <div className="summary-item">
        <span className="summary-numero summary-numero--completadas">{completadas}</span>
        <span className="summary-label">Completadas</span>
      </div>
      <div className="summary-item">
        <span className="summary-numero summary-numero--pendientes">{pendientes}</span>
        <span className="summary-label">Pendientes</span>
      </div>
      <div className="summary-item">
        <span className="summary-numero summary-numero--mostrando">{mostrando}</span>
        <span className="summary-label">Mostrando ({detalle})</span>
      </div>
    </div>
  );
};

export default TaskSummary;
