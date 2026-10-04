import React from 'react';
import { Store } from 'lucide-react';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            <Store size={15} />
          </div>
          <span style={{ fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>Roxiler</span>
          <span>&copy; {new Date().getFullYear()} Roxiler Systems Inc. All rights reserved.</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem' }}>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success)',
                boxShadow: '0 0 8px var(--color-success)'
              }}
            ></span>
            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Operational</span>
          </div>
          <span style={{ color: 'var(--border-medium)' }}>•</span>
          <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>Security Center</span>
        </div>
      </div>
    </footer>
  );
};
