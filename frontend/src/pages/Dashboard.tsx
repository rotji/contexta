import styles from './Dashboard.module.css';

/**
 * Dashboard Page Component
 * Shows conversation history and insights
 */
const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        <p className={styles.dashboardDescription}>
          Your conversation history and insights will appear here.
        </p>
        
        <div className={styles.dashboardGrid}>
          <div className={styles.dashboardCard}>
            <h3>📊 Total Conversations</h3>
            <p className={styles.statNumber}>0</p>
          </div>
          
          <div className={styles.dashboardCard}>
            <h3>⏱️ Total Time</h3>
            <p className={styles.statNumber}>0 min</p>
          </div>
          
          <div className={styles.dashboardCard}>
            <h3>💬 AI Responses</h3>
            <p className={styles.statNumber}>0</p>
          </div>
          
          <div className={styles.dashboardCard}>
            <h3>📝 Summaries</h3>
            <p className={styles.statNumber}>0</p>
          </div>
        </div>

        <div className={styles.recentConversations}>
          <h2>Recent Conversations</h2>
          <p className={styles.emptyState}>No conversations yet. Start your first conversation!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
