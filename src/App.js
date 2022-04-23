import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Layout/NavBar";
import Home from "./Components/Pages/Home";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import EditProfile from "./Components/Pages/EditProfile";
import ProtectedRoute from "./Components/Layout/ProtectedRoute";

function App() {
  const [token, setToken] = useState(true);

  useEffect(() => {
    if (document.cookie.indexOf("access_token") < 0) {
      setToken(false);
    } else {
      setToken(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
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
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
