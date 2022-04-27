import { useState } from "react";
import Input from "../Form/Input";
import Message from "../Layout/Message";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./SignIn.module.css";

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
    if (!validate()) return false;

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
  function validate() {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /[0-9]/;

    const { email, password } = login;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid Email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password is too short";
    } else if (password.length > 40) {
      errors.password = "Password is too long";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Password must contain at least one number";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
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
