import { useLocation } from "react-router-dom";
import Message from "../Layout/Message";
import Nav from "../Layout/NavBar";
function Home({ setToken }) {
  const location = useLocation();

  return (
    <div>
      <h1>Home</h1>
      {location.state?.message && (
        <Message message={location.state.message} type={location.state.type} />
      )}
    </div>
  );
}

export default Home;
