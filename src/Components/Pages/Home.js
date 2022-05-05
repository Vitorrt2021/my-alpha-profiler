import { useLocation } from "react-router-dom";
import Message from "../Layout/Message";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Nav from "../Layout/NavBar";

const API_URL = "https://my-alpha-profiler-backend.herokuapp.com/user/current";

function Home({ setToken }) {
  const location = useLocation();

  const [userData, setUserData] = useState({ birthdate: "" });

  const img = (userImg) => {
    if (userImg != null) return userImg;
    else
      return "https://www.seekpng.com/png/full/356-3562377_personal-user.png";
  };

  const date = (birth) => {
    const info = birth.split("T")[0].split("-");
    return info[2] + "/" + info[1] + "/" + info[0];
  };

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

  return React.createElement(
    "div",
    { class: styles.container },
    React.createElement(
      "div",
      null,
      location.state?.message &&
        React.createElement(
          <Message />,
          { message: location.state.message, type: location.state.type },
          " "
        ),
      React.createElement(
        "div",
        { class: styles.contend_container },
        React.createElement("h2", null, userData.username),
        React.createElement("img", { src: img(userData.user_image) }),
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            null,
            React.createElement("strong", null, "Email:"),
            userData.email
          ),
          React.createElement(
            "li",
            null,
            React.createElement("strong", null, "Birth date:"),
            date(userData.birthdate)
          )
        )
      )
    )
  );
}
export default Home;
