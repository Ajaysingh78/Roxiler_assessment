import React, { useState } from 'react';
import { Modal } from './Modal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

export const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { changePassword } = useAuth();
  const { success, error: toastError } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation checklist
  const hasLength = newPassword.length >= 8 && newPassword.length <= 16;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const isFormValid = hasLength && hasUppercase && hasSpecial && passwordsMatch && currentPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isFormValid) {
      setErrorMsg('Please satisfy all password requirements');
      return;
    }

    try {
      setSubmitting(true);
      await changePassword(currentPassword, newPassword);
      success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err) {
      const msg = err.errors?.currentPassword || err.errors?.newPassword || err.message || 'Failed to update password';
      setErrorMsg(msg);
      toastError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit}>
        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="currentPassword">
            Current Password
          </label>
          <div className="input-wrapper">
            <Lock size={16} className="form-input-icon" />
            <input
              id="currentPassword"
              type={showCurrent ? 'text' : 'password'}
              className="form-input form-input-with-icon"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowCurrent(!showCurrent)}
              aria-label="Toggle password visibility"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="newPassword">
            New Password
          </label>
          <div className="input-wrapper">
            <Lock size={16} className="form-input-icon" />
            <input
              id="newPassword"
              type={showNew ? 'text' : 'password'}
              className="form-input form-input-with-icon"
              placeholder="Enter 8-16 char password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              maxLength={16}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowNew(!showNew)}
              aria-label="Toggle password visibility"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="password-requirements">
            <div className={`requirement-item ${hasLength ? 'met' : ''}`}>
              <Check size={14} color={hasLength ? 'var(--color-success)' : 'var(--text-dim)'} />
              <span>8 to 16 characters ({newPassword.length}/16)</span>
            </div>
            <div className={`requirement-item ${hasUppercase ? 'met' : ''}`}>
              <Check size={14} color={hasUppercase ? 'var(--color-success)' : 'var(--text-dim)'} />
              <span>At least one uppercase letter (A-Z)</span>
            </div>
            <div className={`requirement-item ${hasSpecial ? 'met' : ''}`}>
              <Check size={14} color={hasSpecial ? 'var(--color-success)' : 'var(--text-dim)'} />
              <span>At least one special character (!@#$%^&*)</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <div className="input-wrapper">
            <Lock size={16} className="form-input-icon" />
            <input
              id="confirmPassword"
              type="password"
              className="form-input form-input-with-icon"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength={16}
              required
            />
          </div>
          {confirmPassword && !passwordsMatch && (
            <div className="form-error">Passwords do not match</div>
          )}
        </div>

        <div className="modal-footer" style={{ padding: '1rem 0 0', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={!isFormValid || submitting}>
            {submitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
