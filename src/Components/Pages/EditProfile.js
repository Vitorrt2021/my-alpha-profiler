import styles from "./EditProfile.module.css";
import NavBar from "../Layout/NavBar";
import { useEffect, useState } from "react";
import Input from "../Form/Input";
const API_URL = "https://my-alpha-profiler-backend.herokuapp.com/user/current";

function EditProfile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3004",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
    };
    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3004",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify(userData),
    };
    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>EditProfile</h1>
      <form onSubmit={submit}>
        <Input
          type="email"
          text="Email"
          name="email"
          handleOnChange={handleChange}
          value={userData.email}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default EditProfile;
