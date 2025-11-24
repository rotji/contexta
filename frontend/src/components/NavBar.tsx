import { Link } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../constants';
import styles from './NavBar.module.css';

/**
 * NavBar Component
 * Main navigation bar for the application
 */
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarBrand}>
          <Link to={ROUTES.HOME}>{APP_NAME}</Link>
        </div>
        <ul className={styles.navbarMenu}>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT}>About</Link>
          </li>
          <li>
            <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          </li>
          <li>
            <Link to={ROUTES.SETTINGS}>Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
