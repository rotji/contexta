import { APP_NAME, APP_DESCRIPTION } from '../constants';
import styles from './Home.module.css';

/**
 * Home Page Component
 * Landing page for Contexta application
 */
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <h1 className={styles.homeTitle}>{APP_NAME}</h1>
        <p className={styles.homeDescription}>{APP_DESCRIPTION}</p>
        <button className={styles.homeButton}>
          Start a Conversation
        </button>
      </div>
    </div>
  );
};

export default Home;
