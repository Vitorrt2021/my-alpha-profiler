import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/edit">Edit</Link>
        </li>
      </ul>
    </>
  );
}

export default NavBar;
