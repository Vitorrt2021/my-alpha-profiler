import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import {useState} from "react";

function deleteCookie(name) {
  document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function NavBar({ setToken, namePage }) {
  const [classClicked, setClass] = useState(namePage);

  function logout() {
    setToken(false);
    deleteCookie("access_token");
  }

  return (
    <>
      <ul className={styles.ul}>
        <li>
          <Link onClick={() => setClass({homeClass: true, editClass: false})} 
          className={
            classClicked.homeClass? styles.active:""
          } 
          to="/">Home</Link>
        </li>

        <li>
          <Link onClick={() => setClass({homeClass: false, editClass: true})} 
          className={
            classClicked.editClass? styles.active:""
          } 
          to="/edit">Edit</Link>
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
