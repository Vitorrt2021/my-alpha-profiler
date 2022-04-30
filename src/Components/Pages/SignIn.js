import { useState } from "react";
import Input from "../Form/Input";
import Message from "../Layout/Message";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./SignIn.module.css";
import ValidateLogin from "../../Utils/ValidateLogin";

const API_URL = "http://localhost:3003/session/login";

function SignIn({ setToken }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState();

  function handleChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    const errors = ValidateLogin(login);
    setFormErrors(errors);
    if (Object.values(errors).length !== 0) return false;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3003",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify(login),
    };
    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          const errors = {};
          errors.login = data.error;
          setFormErrors(errors);
          return false;
        }
        setToken(true);
        navigate("/", {
          state: { message: "Successfully logged in", type: "success" },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.form_header}>Sign in</h1>
        {location.state?.message && (
          <Message
            message={location.state.message}
            type={location.state.type}
          />
        )}
        <form className={styles.form} onSubmit={submit}>
          <Input
            type="email"
            text="Email"
            name="email"
            handleOnChange={handleChange}
            placeholder="Email"
            error={formErrors?.email}
          />

          <Input
            type="password"
            text="Password"
            name="password"
            handleOnChange={handleChange}
            placeholder="Password"
            error={formErrors?.password}
          />

          <input
            value="Sign in"
            className={styles.input_submit}
            type="submit"
          />
          <p className={styles.input_error}>{formErrors?.login}</p>
          <p>
            Don't have an account? <Link to="/signup"> Register </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
