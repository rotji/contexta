import { APP_NAME, APP_DESCRIPTION } from '../constants';
import styles from '../styles/About.module.css';

/**
 * About Page Component
 * Information about the Contexta platform
 */
const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}>About {APP_NAME}</h1>
        <p className={styles.aboutDescription}>{APP_DESCRIPTION}</p>
        
        <section className={styles.aboutSection}>
          <h2>What We Do</h2>
          <p>
            Contexta listens to live conversations through your browser, understands the context in real-time,
            and provides intelligent insights when asked. Think of it as having a smart assistant that actually
            understands what you're discussing.
          </p>
        </section>

        <section className={styles.aboutSection}>
          <h2>Key Features</h2>
          <ul className={styles.featuresList}>
            <li>🎤 Real-time conversation listening and transcription</li>
            <li>🧠 AI-powered context understanding</li>
            <li>💬 Voice and text responses</li>
            <li>📊 Conversation summaries and insights</li>
            <li>🔒 Privacy-first design</li>
            <li>🌐 Web-based, no installation required</li>
          </ul>
        </section>

        <section className={styles.aboutSection}>
          <h2>Use Cases</h2>
          <p>Perfect for business meetings, brainstorming sessions, study groups, and any collaborative discussions.</p>
        </section>
      </div>
    </div>
  );
};

export default About;
