import { useState } from "react";
import Input from "../Form/Input";

const API_URL = "http://localhost:3004/users/register";

function SignUp() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    birth_date: "",
    password: "",
    confirm_password: "",
  });
  const [formErrors, setFormErrors] = useState();

  function handleChange(e) {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return false;
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "http://localhost:3004",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   credentials: "include",
    //   body: JSON.stringify(register),
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
    const { username, email, birth_date, password, confirm_password } =
      register;
    if (!username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid Email";
    }
    if (!birth_date) {
      errors.birth_date = "Birth Date is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirm_password) {
      errors.confirm_password = "Confirm password is required";
    } else if (password !== confirm_password) {
      errors.confirm_password = "password different from password confirmation";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
  }
  return (
    <div>
      <h1>SignUp</h1>

      <form onSubmit={submit}>
        <Input
          type="text"
          text="Username"
          name="username"
          handleOnChange={handleChange}
          placeholder="Username"
          error={formErrors?.username}
        />
        <Input
          type="email"
          text="Email"
          name="email"
          handleOnChange={handleChange}
          placeholder="Email"
          error={formErrors?.email}
        />

        <Input
          type="date"
          text="Birth Date"
          name="birth_date"
          handleOnChange={handleChange}
          error={formErrors?.birth_date}
        />

        <Input
          type="password"
          text="Password"
          name="password"
          handleOnChange={handleChange}
          placeholder="Password"
          error={formErrors?.password}
        />

        <Input
          type="password"
          text="Confirm Password"
          name="confirm_password"
          handleOnChange={handleChange}
          placeholder="Confirm Password"
          error={formErrors?.confirm_password}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default SignUp;
