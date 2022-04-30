import { useLocation } from "react-router-dom";
import Message from "../Layout/Message";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Nav from "../Layout/NavBar";

const API_URL = "http://localhost:3003/user/current";

function Home({ setToken }) {
  const location = useLocation();

  const [userData, setUserData] = useState({birthdate : ""});

  const img = (userImg) => {if (userImg != null) return userImg; else return "https://www.seekpng.com/png/full/356-3562377_personal-user.png"}

  const date = (birth) => {
    const info = birth.split("T")[0].split("-");
    return info[2]+"/"+info[1]+"/"+info[0];
  }
  

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

  return (
    <div className={styles.container}>
      <div>
        {location.state?.message && (
          <Message message={location.state.message} type={location.state.type} />
        )}
      </div>
      <div className={styles.contend_container}>
        <h2>{userData.username}</h2>
        <img src={img (userData.user_img)} />
        <ul>
          <li><strong>Email:</strong> {userData.email}</li>
          <li><strong>Data de Nascimento:</strong> {date(userData.birthdate)}</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
