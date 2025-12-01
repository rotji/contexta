import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../constants';
import styles from '../styles/NavBar.module.css';
import { useAuth } from '../context/AuthContext';

/**
 * NavBar Component
 * Main navigation bar for the application
 */
const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
          {!user && (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <button
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '1.2rem',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
