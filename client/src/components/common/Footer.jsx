import React from 'react';
import { Store, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '2rem 0',
        marginTop: 'auto'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Store size={18} color="var(--color-primary)" />
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Roxiler Systems</span>
          <span>&copy; {new Date().getFullYear()} Store Rating & Feedback Platform</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} color="var(--color-success)" />
            <span>Role-Based Access Control</span>
          </div>
          <div>Strict Validation Standards</div>
        </div>
      </div>
    </footer>
  );
};
