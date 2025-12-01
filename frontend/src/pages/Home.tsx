import { APP_NAME, APP_DESCRIPTION, ROUTES } from '../constants';
import styles from '../styles/Home.module.css';

/**
 * Home Page Component
 * Landing page for Contexta application
 */

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <h1 className={styles.homeTitle}>{APP_NAME}</h1>
        <p className={styles.homeDescription}>{APP_DESCRIPTION}</p>
        <button
          className={styles.homeButton}
          onClick={() => navigate(ROUTES.CONVERSATION)}
        >
          Start a Conversation
        </button>
      </div>
    </div>
  );
};

export default Home;
