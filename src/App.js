import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import EditProfile from "./Components/Pages/EditProfile";
import NavBar from "./Components/Layout/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
