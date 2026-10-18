function ActionButton({ label, onAction, disabled = false }) {
  return (
    <section className="card">
      <h2 className="section-title">Acciones</h2>
      <button onClick={onAction} className="task-button" disabled={disabled}>
        {label}
      </button>
    </section>
  )
}

export default ActionButton