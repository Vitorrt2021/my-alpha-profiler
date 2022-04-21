import "./Input.css";
function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  error,
}) {
  return (
    <div>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        id={name}
        onChange={handleOnChange}
        value={value}
        name={name}
        placeholder={placeholder}
      ></input>
      {error && <p className="input_error">{error}</p>}
    </div>
  );
}

export default Input;
