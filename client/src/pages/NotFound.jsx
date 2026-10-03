import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="container main-content" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <Compass size={32} />
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto 2rem' }}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/stores" className="btn btn-primary">
        <Home size={18} />
        <span>Return to Stores Directory</span>
      </Link>
    </div>
  );
};
