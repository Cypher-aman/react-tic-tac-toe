import "./button.css";

const Button = function ({ children, color, size, onClick }) {
  return (
    <button
      onClick={onClick}
      class={`button-19 ${color} ${size}`}
      role="button"
    >
      {children}
    </button>
  );
};

export default Button;
