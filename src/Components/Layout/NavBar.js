import { Link } from "react-router-dom";

function deleteCookie(name) {
  document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function NavBar({ setToken }) {
  function logout() {
    setToken(false);
    deleteCookie("access_token");
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/edit">Edit</Link>
        </li>

        <li>
          <a href="#" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </>
  );
}

export default NavBar;
