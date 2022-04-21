import { useState } from "react";
import Input from "../Form/Input";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3004/users/register";

function SignIn() {
  const navigate = useNavigate();
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
    navigate("/");
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "http://localhost:3004",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   credentials: "include",
    //   body: JSON.stringify(login),
    // };
    // fetch(API_URL, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));
  }
  function validate() {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const { email, password } = login;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid Email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password is too short";
    } else if (password.length > 40) {
      errors.password = "Password is too long";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
  }
  return (
    <div className="container">
      <div className="form_container">
        <h1 id="form_header">Sign in</h1>
        <form onSubmit={submit}>
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

          <input value="Sign in" className="input_submit" type="submit" />

          <p>
            Don't have an account? <Link to="/signup"> Register </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
