import { APP_NAME, ROUTES } from '../constants';
import './NavBar.module.css';

/**
 * NavBar Component
 * Main navigation bar for the application
 */
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href={ROUTES.HOME}>{APP_NAME}</a>
        </div>
        <ul className="navbar-menu">
          <li>
            <a href={ROUTES.HOME}>Home</a>
          </li>
          <li>
            <a href={ROUTES.ABOUT}>About</a>
          </li>
          <li>
            <a href={ROUTES.DASHBOARD}>Dashboard</a>
          </li>
          <li>
            <a href={ROUTES.SETTINGS}>Settings</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
