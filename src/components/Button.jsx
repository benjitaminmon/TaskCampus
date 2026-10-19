// Button reutilizable (Tutorial 10).
// "type" vale "button" por defecto para que un botón dentro de un formulario
// no lo envíe por accidente; el botón de envío lo indica con type="submit".
const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;