import { APP_NAME, APP_DESCRIPTION } from '../constants';
import './Home.module.css';

/**
 * Home Page Component
 * Landing page for Contexta application
 */
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">{APP_NAME}</h1>
        <p className="home-description">{APP_DESCRIPTION}</p>
        <button className="home-button">
          Start a Conversation
        </button>
      </div>
    </div>
  );
};

export default Home;
