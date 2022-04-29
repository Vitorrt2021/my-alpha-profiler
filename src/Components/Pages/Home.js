import { useLocation } from "react-router-dom";
import Message from "../Layout/Message";
import { useEffect, useState } from "react";
import Nav from "../Layout/NavBar";

const API_URL = "http://localhost:3003/user/current";

function Home({ setToken }) {
  const location = useLocation();

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

  return (
    <div>
      <h1>Home</h1>
      {location.state?.message && (
        <Message message={location.state.message} type={location.state.type} />
      )}
      <h2>{userData.username}</h2>
      {/* Inserir imagem */}
      <ul>
        <li><strong>Email:</strong> {userData.email}</li>
        <li><strong>Data de Nascimento:</strong> {userData.data}</li>
      </ul>
    </div>
  );
}

export default Home;
