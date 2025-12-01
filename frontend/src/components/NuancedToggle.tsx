import React from 'react';

type NuancedToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

const NuancedToggle: React.FC<NuancedToggleProps> = ({ enabled, onToggle }) => (
  <button
    type="button"
    aria-pressed={enabled}
    onClick={onToggle}
    className={`nuanced-toggle${enabled ? ' enabled' : ''}`}
    style={{
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      border: '1px solid #0074d9',
      background: enabled ? '#0074d9' : '#fff',
      color: enabled ? '#fff' : '#0074d9',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background 0.2s, color 0.2s',
      margin: '0 0.5rem',
    }}
  >
    Nuanced
  </button>
);

export default NuancedToggle;
