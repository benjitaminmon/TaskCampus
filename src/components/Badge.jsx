const colorMap = {
  pendiente: "#f59e0b",
  completada: "#16a34a",
  en_progreso: "#2563eb",
};

const Badge = ({ texto }) => {
  const color = colorMap[texto] || "#6b7280";
  return (
    <span
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: 600,
      }}
    >
      {texto}
    </span>
  );
};

export default Badge;