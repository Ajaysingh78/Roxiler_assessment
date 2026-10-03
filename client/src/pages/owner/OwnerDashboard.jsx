import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StarRating } from '../../components/common/StarRating';
import { DataTable } from '../../components/common/DataTable';
import {
  Store,
  Star,
  Users,
  TrendingUp,
  MapPin,
  Mail,
  Search,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const OwnerDashboard = () => {
  const { user } = useAuth();
  const { error: toastError } = useToast();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/owner/dashboard');
      if (res.success) {
        setDashboardData(res.data);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load owner dashboard');
    } finally {
      setLoading(false);
    }
  }, [toastError]);

  const fetchRatings = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (sortBy) params.append('sortBy', sortBy);
      if (order) params.append('order', order);

      const res = await api.get(`/owner/ratings?${params.toString()}`);
      if (res.success) {
        setRatings(res.data);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load ratings list');
    }
  }, [search, sortBy, order, toastError]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRatings();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchRatings]);

  const handleSort = (field, newOrder) => {
    setSortBy(field);
    setOrder(newOrder);
  };

  const columns = [
    {
      key: 'userName',
      label: 'Customer Name',
      sortable: true,
      render: (val) => (
        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
          {val}
        </div>
      )
    },
    {
      key: 'userEmail',
      label: 'Customer Email',
      sortable: true,
      render: (val) => (
        <span style={{ color: 'var(--text-muted)' }}>{val}</span>
      )
    },
    {
      key: 'rating',
      label: 'Submitted Rating',
      sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StarRating rating={val} size={15} />
          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{val} / 5</span>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Date Submitted',
      sortable: true,
      render: (val) => (
        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          {val ? new Date(val).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : '—'}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid var(--border-medium)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}
        />
        Loading Store Owner Dashboard...
      </div>
    );
  }

  if (!dashboardData?.hasStore) {
    return (
      <div className="container main-content">
        <div className="card" style={{ textAlign: 'center', padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
          <Store size={48} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
          <h2>No Store Assigned Yet</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Your account is registered as a Store Owner, but no store has been assigned to you by the System Administrator yet.
          </p>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}
          >
            Please contact your administrator at <strong>admin@roxiler.com</strong> to assign your store.
          </div>
        </div>
      </div>
    );
  }

  const { store, averageRating, totalRatings, breakdown } = dashboardData;

  return (
    <div className="container main-content">
      {/* Header with Store Info */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)'
            }}
          >
            <Store size={24} />
          </div>
          <h1 style={{ fontSize: '2rem' }}>{store.name}</h1>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} color="var(--color-primary)" />
            <span>{store.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Mail size={16} color="var(--text-dim)" />
            <span>{store.email}</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#f59e0b' }}>
            <Star size={26} fill="currentColor" />
          </div>
          <div className="stat-content">
            <span className="stat-title">Average Store Rating</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span className="stat-value">{averageRating > 0 ? averageRating.toFixed(1) : '0.0'}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ 5.0</span>
            </div>
            <span className="stat-desc">Calculated across all customer reviews</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary)' }}>
            <Users size={26} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Submitted Ratings</span>
            <span className="stat-value">{totalRatings}</span>
            <span className="stat-desc">Unique customers who reviewed your store</span>
          </div>
        </div>

        {/* Rating Breakdown Card */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Rating Distribution
          </h4>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = breakdown[star] || 0;
            const pct = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
            return (
              <div key={star} className="rating-breakdown-row">
                <span style={{ width: '45px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {star} <Star size={12} fill="var(--color-star)" color="var(--color-star)" />
                </span>
                <div className="rating-bar-track">
                  <div className="rating-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span style={{ width: '32px', textAlign: 'right', color: 'var(--text-muted)' }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Ratings Section */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Customer Feedback & Ratings</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              List of registered users who have submitted reviews for your store.
            </p>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} className="form-input-icon" />
            <input
              type="text"
              className="form-input form-input-with-icon"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '0.55rem 0.75rem 0.55rem 2.4rem', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={ratings}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
          emptyMessage={search ? 'No matching customer reviews' : 'No customer reviews submitted yet.'}
        />
      </div>
    </div>
  );
};
