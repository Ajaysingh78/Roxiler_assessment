import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChangePasswordModal } from './ChangePasswordModal';
import {
  Store,
  Shield,
  LayoutDashboard,
  KeyRound,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Star
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, theme, toggleTheme, isAdmin, isOwner } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getRoleBadge = (role) => {
    if (role === 'ADMIN') return <span className="badge badge-admin">Admin</span>;
    if (role === 'STORE_OWNER') return <span className="badge badge-owner">Owner</span>;
    return <span className="badge badge-user">User</span>;
  };

  return (
    <>
      <header
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(8px)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px'
          }}
        >
          {/* Logo & Brand */}
          <Link
            to={user ? (isAdmin ? '/admin' : isOwner ? '/owner' : '/stores') : '/stores'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--text-main)',
              fontWeight: 800,
              fontSize: '1.25rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 10px var(--color-primary-glow)'
              }}
            >
              <Store size={22} />
            </div>
            <span>
              ROXILER <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>PORTAL</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            className="desktop-nav"
          >
            {user && (
              <>
                <Link
                  to="/stores"
                  className={`btn ${isActive('/stores') ? 'btn-secondary' : 'btn-outline'}`}
                  style={{ border: 'none' }}
                >
                  <Store size={18} />
                  <span>Stores</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`btn ${isActive('/admin') ? 'btn-secondary' : 'btn-outline'}`}
                    style={{ border: 'none' }}
                  >
                    <Shield size={18} />
                    <span>Admin Panel</span>
                  </Link>
                )}

                {isOwner && (
                  <Link
                    to="/owner"
                    className={`btn ${isActive('/owner') ? 'btn-secondary' : 'btn-outline'}`}
                    style={{ border: 'none' }}
                  >
                    <LayoutDashboard size={18} />
                    <span>My Store</span>
                  </Link>
                )}
              </>
            )}

            {!user && (
              <Link
                to="/stores"
                className={`btn ${isActive('/stores') ? 'btn-secondary' : 'btn-outline'}`}
                style={{ border: 'none' }}
              >
                <Store size={18} />
                <span>Stores</span>
              </Link>
            )}
          </nav>

          {/* Right Action Area */}
          <div style={{ display: 'flex', alignItem: 'center', gap: '0.75rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-icon"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem'
                  }}
                  className="user-profile-badge"
                >
                  <User size={16} color="var(--color-primary)" />
                  <span
                    style={{
                      maxWidth: '140px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 600
                    }}
                    title={user.name}
                  >
                    {user.name.split(' ')[0]}
                  </span>
                  {getRoleBadge(user.role)}
                </div>

                <button
                  onClick={() => setPasswordModalOpen(true)}
                  className="btn btn-secondary btn-sm"
                  title="Change Password"
                >
                  <KeyRound size={15} />
                  <span className="hide-mobile">Password</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: 'var(--border-medium)', color: 'var(--text-muted)' }}
                  title="Log out"
                >
                  <LogOut size={15} />
                  <span className="hide-mobile">Logout</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </>
  );
};
