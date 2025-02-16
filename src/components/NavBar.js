import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/`}>◀ Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
