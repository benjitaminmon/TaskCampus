// Badge: etiqueta de estado (Tutorial 10).
// Los colores ahora viven en App.css (clases .badge-*) en lugar de estilos inline.
// "titulo" es opcional: muestra un texto de ayuda al pasar el mouse.
const Badge = ({ texto, titulo }) => {
  return (
    <span className={`badge badge-${texto}`} title={titulo}>
      {texto}
    </span>
  );
};

export default Badge;
