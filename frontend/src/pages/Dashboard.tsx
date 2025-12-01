
import { useEffect, useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { api } from '../services/api';

/**
 * Dashboard Page Component
 * Shows conversation history and insights
 */

const Dashboard = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConvos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getConversations();
        setConversations(data);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    };
    fetchConvos();
  }, []);

  const totalConversations = conversations.length;
  const totalAiResponses = conversations.filter(c => c.aiResponse && c.aiResponse.length > 0).length;
  const totalSummaries = conversations.length; // Placeholder, can be refined
  // For MVP, total time is not tracked, so show 0

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
            <p className={styles.statNumber}>{totalConversations}</p>
          </div>
          <div className={styles.dashboardCard}>
            <h3>⏱️ Total Time</h3>
            <p className={styles.statNumber}>0 min</p>
          </div>
          <div className={styles.dashboardCard}>
            <h3>💬 AI Responses</h3>
            <p className={styles.statNumber}>{totalAiResponses}</p>
          </div>
          <div className={styles.dashboardCard}>
            <h3>📝 Summaries</h3>
            <p className={styles.statNumber}>{totalSummaries}</p>
          </div>
        </div>

        <div className={styles.recentConversations}>
          <h2>Recent Conversations</h2>
          {loading ? (
            <p className={styles.emptyState}>Loading...</p>
          ) : error ? (
            <p className={styles.emptyState} style={{ color: '#ef4444' }}>{error}</p>
          ) : conversations.length === 0 ? (
            <p className={styles.emptyState}>No conversations yet. Start your first conversation!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {conversations.map((c, idx) => (
                <li key={c.id || idx} style={{
                  background: '#f1f5f9',
                  borderRadius: 10,
                  marginBottom: 16,
                  padding: '1rem 1.25rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: 4 }}>
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : 'Unknown date'}
                  </div>
                  <div style={{ color: '#334155', marginBottom: 6 }}>
                    <strong>Transcript:</strong> {c.transcript?.slice(0, 120)}{c.transcript && c.transcript.length > 120 ? '...' : ''}
                  </div>
                  {c.aiResponse && (
                    <div style={{ color: '#64748b', marginBottom: 4 }}>
                      <strong>AI:</strong> {c.aiResponse?.slice(0, 120)}{c.aiResponse && c.aiResponse.length > 120 ? '...' : ''}
                    </div>
                  )}
                  {c.nuancedOptions && c.nuancedOptions.length > 0 && (
                    <div style={{ color: '#64748b', fontSize: '0.97rem' }}>
                      <strong>Nuanced Options:</strong> {c.nuancedOptions.length}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
