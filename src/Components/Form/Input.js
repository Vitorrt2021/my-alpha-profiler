import styles from "./Input.module.css";
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
    <div className={styles.input_container}>
      <label className={styles.input_label} htmlFor={name}>
        {text}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        onChange={handleOnChange}
        value={value}
        name={name}
        placeholder={placeholder}
      ></input>
      {error && <p className={styles.input_error}>{error}</p>}
    </div>
  );
}

export default Input;
