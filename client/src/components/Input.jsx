import style from "./input.module.css";

function Input({ id, placeholder, type, onChange, value }) {
  return (
    <input
      className={style.input}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
