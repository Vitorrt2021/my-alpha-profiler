import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Layout/NavBar";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Pages/Home";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import EditProfile from "./Components/Pages/EditProfile";
import ProtectedRoute from "./Components/Layout/ProtectedRoute";

function getCookie(name) {
  let cookie = {};

  document.cookie.split(";").forEach(function (el) {
    let [k, v] = el.split("=");
    cookie[k.trim()] = v;
  });

  return cookie[name];
}

function App() {
  const [token, setToken] = useState(true);

  useEffect(() => {
    if (document.cookie.indexOf("access_token") < 0) {
      setToken(false);
    } else {
      setToken(getCookie("access_token"));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <NavBar setToken={setToken} />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn setToken={setToken} />} />
        <Route
          path="edit"
          element={
            <ProtectedRoute token={token}>
              <NavBar setToken={setToken} />

              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
