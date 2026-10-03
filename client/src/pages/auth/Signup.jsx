import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  User,
  Mail,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  UserPlus,
  Check,
  AlertCircle
} from 'lucide-react';

export const Signup = () => {
  const { signup } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validation Checks matching Roxiler Specs
  const nameLen = formData.name.trim().length;
  const isNameValid = nameLen >= 20 && nameLen <= 60;

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim());

  const passLen = formData.password.length;
  const isPassLengthValid = passLen >= 8 && passLen <= 16;
  const isPassUpperValid = /[A-Z]/.test(formData.password);
  const isPassSpecialValid = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const isPasswordValid = isPassLengthValid && isPassUpperValid && isPassSpecialValid;

  const addrLen = formData.address.trim().length;
  const isAddressValid = addrLen > 0 && addrLen <= 400;

  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isAddressValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!isNameValid) {
      newErrors.name = 'Name must be between 20 and 60 characters';
    }
    if (!isEmailValid) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!isAddressValid) {
      newErrors.address = 'Address is required and must not exceed 400 characters';
    }
    if (!isPasswordValid) {
      newErrors.password = 'Password does not meet the security criteria';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await signup(formData);
      success('Account created successfully! Welcome to Roxiler.');
      navigate('/stores');
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        toastError(err.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const getCounterClass = (current, min, max) => {
    if (current === 0) return '';
    if (min && current < min) return 'invalid';
    if (max && current > max) return 'invalid';
    return 'valid';
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '540px' }}>
        <div className="auth-header">
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#fff',
              boxShadow: '0 6px 16px var(--color-primary-glow)'
            }}
          >
            <UserPlus size={24} />
          </div>
          <h1>Create an Account</h1>
          <p>Register as a Normal User to discover and rate stores</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <span>Full Name</span>
              <span className={`form-label-counter ${getCounterClass(nameLen, 20, 60)}`}>
                {nameLen}/60 (Min 20)
              </span>
            </label>
            <div className="input-wrapper">
              <User size={16} className="form-input-icon" />
              <input
                id="name"
                name="name"
                type="text"
                className={`form-input form-input-with-icon ${errors.name ? 'has-error' : isNameValid ? 'is-valid' : ''}`}
                placeholder="e.g. Alexandra Turner Montgomery"
                value={formData.name}
                onChange={handleChange}
                maxLength={60}
                required
              />
            </div>
            {errors.name && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.name}
              </div>
            )}
            <div className="form-helper">Must be between 20 and 60 characters long.</div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <span>Email Address</span>
            </label>
            <div className="input-wrapper">
              <Mail size={16} className="form-input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input form-input-with-icon ${errors.email ? 'has-error' : formData.email && isEmailValid ? 'is-valid' : ''}`}
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.email}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              <span>Physical Address</span>
              <span className={`form-label-counter ${getCounterClass(addrLen, 1, 400)}`}>
                {addrLen}/400 chars
              </span>
            </label>
            <div className="input-wrapper">
              <textarea
                id="address"
                name="address"
                className={`form-textarea ${errors.address ? 'has-error' : isAddressValid ? 'is-valid' : ''}`}
                placeholder="Enter complete physical address (e.g. 124 Elm Street, Apt 3B, Boston, MA 02108)"
                value={formData.address}
                onChange={handleChange}
                maxLength={400}
                rows={3}
                required
              />
            </div>
            {errors.address && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.address}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              <span>Password</span>
              <span className={`form-label-counter ${getCounterClass(passLen, 8, 16)}`}>
                {passLen}/16 chars
              </span>
            </label>
            <div className="input-wrapper">
              <Lock size={16} className="form-input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input form-input-with-icon ${errors.password ? 'has-error' : isPasswordValid ? 'is-valid' : ''}`}
                placeholder="Enter 8-16 char password"
                value={formData.password}
                onChange={handleChange}
                maxLength={16}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Live Requirements Checklist */}
            <div className="password-requirements">
              <div className={`requirement-item ${isPassLengthValid ? 'met' : ''}`}>
                <Check size={14} color={isPassLengthValid ? 'var(--color-success)' : 'var(--text-dim)'} />
                <span>8 to 16 characters ({passLen}/16)</span>
              </div>
              <div className={`requirement-item ${isPassUpperValid ? 'met' : ''}`}>
                <Check size={14} color={isPassUpperValid ? 'var(--color-success)' : 'var(--text-dim)'} />
                <span>At least one uppercase letter (A-Z)</span>
              </div>
              <div className={`requirement-item ${isPassSpecialValid ? 'met' : ''}`}>
                <Check size={14} color={isPassSpecialValid ? 'var(--color-success)' : 'var(--text-dim)'} />
                <span>At least one special character (!@#$%^&*)</span>
              </div>
            </div>

            {errors.password && (
              <div className="form-error">
                <AlertCircle size={14} /> {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!isFormValid || loading}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
