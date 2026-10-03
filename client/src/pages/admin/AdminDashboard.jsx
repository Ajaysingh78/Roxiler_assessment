import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StarRating } from '../../components/common/StarRating';
import { DataTable } from '../../components/common/DataTable';
import { Modal } from '../../components/common/Modal';
import {
  Shield,
  Users,
  Store,
  Star,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Mail,
  MapPin,
  Lock,
  UserCheck,
  Building,
  Check,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const { success, error: toastError } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'stores'
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
    roles: { ADMIN: 0, USER: 0, STORE_OWNER: 0 }
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Users Management State
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [userSortBy, setUserSortBy] = useState('createdAt');
  const [userOrder, setUserOrder] = useState('desc');

  // Stores Management State
  const [stores, setStores] = useState([]);
  const [loadingStores, setLoadingStores] = useState(false);
  const [storeSearch, setStoreSearch] = useState('');
  const [storeSortBy, setStoreSortBy] = useState('createdAt');
  const [storeOrder, setStoreOrder] = useState('desc');

  // Add User Modal State
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'USER'
  });
  const [addUserErrors, setAddUserErrors] = useState({});
  const [submittingUser, setSubmittingUser] = useState(false);

  // Add Store Modal State
  const [addStoreModalOpen, setAddStoreModalOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: ''
  });
  const [addStoreErrors, setAddStoreErrors] = useState({});
  const [submittingStore, setSubmittingStore] = useState(false);

  // Fetch Dashboard Metrics
  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const res = await api.get('/admin/dashboard');
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoadingStats(false);
    }
  }, [toastError]);

  // Fetch Users List
  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const params = new URLSearchParams();
      if (userSearch) params.append('search', userSearch);
      if (roleFilter && roleFilter !== 'ALL') params.append('role', roleFilter);
      if (userSortBy) params.append('sortBy', userSortBy);
      if (userOrder) params.append('order', userOrder);

      const res = await api.get(`/admin/users?${params.toString()}`);
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  }, [userSearch, roleFilter, userSortBy, userOrder, toastError]);

  // Fetch Stores List
  const fetchStores = useCallback(async () => {
    try {
      setLoadingStores(true);
      const params = new URLSearchParams();
      if (storeSearch) params.append('search', storeSearch);
      if (storeSortBy) params.append('sortBy', storeSortBy);
      if (storeOrder) params.append('order', storeOrder);

      const res = await api.get(`/admin/stores?${params.toString()}`);
      if (res.success) {
        setStores(res.data);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load stores');
    } finally {
      setLoadingStores(false);
    }
  }, [storeSearch, storeSortBy, storeOrder, toastError]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === 'users' || activeTab === 'overview') {
      const timer = setTimeout(() => fetchUsers(), 200);
      return () => clearTimeout(timer);
    }
  }, [activeTab, fetchUsers]);

  useEffect(() => {
    if (activeTab === 'stores' || activeTab === 'overview') {
      const timer = setTimeout(() => fetchStores(), 200);
      return () => clearTimeout(timer);
    }
  }, [activeTab, fetchStores]);

  // Add User Submission
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setAddUserErrors({});

    // Client-side validations
    const errors = {};
    if (newUser.name.trim().length < 20 || newUser.name.trim().length > 60) {
      errors.name = 'Name must be 20 to 60 characters';
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newUser.email.trim())) {
      errors.email = 'Please provide a valid email';
    }
    if (newUser.address.trim().length === 0 || newUser.address.trim().length > 400) {
      errors.address = 'Address must not exceed 400 characters';
    }
    const p = newUser.password;
    if (p.length < 8 || p.length > 16 || !/[A-Z]/.test(p) || !/[!@#$%^&*(),.?":{}|<>]/.test(p)) {
      errors.password = 'Password must be 8-16 chars with 1 uppercase and 1 special char';
    }

    if (Object.keys(errors).length > 0) {
      setAddUserErrors(errors);
      return;
    }

    try {
      setSubmittingUser(true);
      const res = await api.post('/admin/users', newUser);
      if (res.success) {
        success(`User ${res.data.name} (${res.data.role}) created successfully!`);
        setAddUserModalOpen(false);
        setNewUser({ name: '', email: '', password: '', address: '', role: 'USER' });
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      if (err.errors) {
        setAddUserErrors(err.errors);
      } else {
        toastError(err.message || 'Failed to create user');
      }
    } finally {
      setSubmittingUser(false);
    }
  };

  // Add Store Submission
  const handleAddStoreSubmit = async (e) => {
    e.preventDefault();
    setAddStoreErrors({});

    const errors = {};
    if (newStore.name.trim().length < 20 || newStore.name.trim().length > 60) {
      errors.name = 'Store name must be 20 to 60 characters';
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newStore.email.trim())) {
      errors.email = 'Please provide a valid store email';
    }
    if (newStore.address.trim().length === 0 || newStore.address.trim().length > 400) {
      errors.address = 'Address must not exceed 400 characters';
    }

    if (Object.keys(errors).length > 0) {
      setAddStoreErrors(errors);
      return;
    }

    try {
      setSubmittingStore(true);
      const res = await api.post('/admin/stores', newStore);
      if (res.success) {
        success(`Store "${res.data.name}" added successfully!`);
        setAddStoreModalOpen(false);
        setNewStore({ name: '', email: '', address: '', ownerId: '' });
        fetchStores();
        fetchStats();
      }
    } catch (err) {
      if (err.errors) {
        setAddStoreErrors(err.errors);
      } else {
        toastError(err.message || 'Failed to create store');
      }
    } finally {
      setSubmittingStore(false);
    }
  };

  // Available Store Owners for assignment
  const storeOwners = users.filter((u) => u.role === 'STORE_OWNER');

  // Columns for Users Table
  const userColumns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{val}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>ID: {row.id.slice(0, 8)}...</div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (val) => <span style={{ color: 'var(--text-muted)' }}>{val}</span>
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (val) => {
        if (val === 'ADMIN') return <span className="badge badge-admin">Admin</span>;
        if (val === 'STORE_OWNER') return <span className="badge badge-owner">Store Owner</span>;
        return <span className="badge badge-user">Normal User</span>;
      }
    },
    {
      key: 'address',
      label: 'Address',
      sortable: true,
      render: (val) => (
        <span
          style={{
            maxWidth: '220px',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'var(--text-muted)'
          }}
          title={val}
        >
          {val}
        </span>
      )
    },
    {
      key: 'storeRating',
      label: 'Store Rating',
      sortable: true,
      render: (val, row) => {
        if (row.role !== 'STORE_OWNER') {
          return <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>N/A</span>;
        }
        return val != null ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="badge badge-rating" style={{ fontSize: '0.75rem', padding: '0.15rem 0.45rem' }}>
              ★ {val > 0 ? val.toFixed(1) : 'New'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              ({row.storeName || 'Store'})
            </span>
          </div>
        ) : (
          <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>No Store</span>
        );
      }
    }
  ];

  // Columns for Stores Table
  const storeColumns = [
    {
      key: 'name',
      label: 'Store Name',
      sortable: true,
      render: (val) => <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{val}</div>
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (val) => <span style={{ color: 'var(--text-muted)' }}>{val}</span>
    },
    {
      key: 'address',
      label: 'Address',
      sortable: true,
      render: (val) => (
        <span
          style={{
            maxWidth: '240px',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'var(--text-muted)'
          }}
          title={val}
        >
          {val}
        </span>
      )
    },
    {
      key: 'rating',
      label: 'Overall Rating',
      sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StarRating rating={val} size={15} />
          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
            {val > 0 ? val.toFixed(1) : '0.0'}
          </span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
            ({row.totalRatings})
          </span>
        </div>
      )
    },
    {
      key: 'owner',
      label: 'Store Owner',
      sortable: false,
      render: (val) =>
        val ? (
          <span className="badge badge-owner" style={{ fontSize: '0.75rem' }}>
            {val.name.split(' ')[0]}
          </span>
        ) : (
          <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Unassigned</span>
        )
    }
  ];

  return (
    <div className="container main-content">
      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <div
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#8b5cf6'
              }}
            >
              <Shield size={24} />
            </div>
            <h1 style={{ fontSize: '2rem' }}>System Administrator Console</h1>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage platform metrics, store registries, role permissions, and users.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setAddStoreModalOpen(true)}
            className="btn btn-secondary"
          >
            <Plus size={16} />
            <span>Add New Store</span>
          </button>
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '2rem'
        }}
      >
        <button
          onClick={() => setActiveTab('overview')}
          className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, border: 'none' }}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, border: 'none' }}
        >
          Manage Users ({stats.totalUsers})
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`btn ${activeTab === 'stores' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, border: 'none' }}
        >
          Manage Stores ({stats.totalStores})
        </button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}
          >
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary)' }}>
                <Users size={26} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Total Users</span>
                <span className="stat-value">{stats.totalUsers}</span>
                <span className="stat-desc">
                  {stats.roles.USER} Users &bull; {stats.roles.STORE_OWNER} Owners &bull; {stats.roles.ADMIN} Admins
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(14, 165, 233, 0.15)', color: 'var(--color-secondary)' }}>
                <Store size={26} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Total Registered Stores</span>
                <span className="stat-value">{stats.totalStores}</span>
                <span className="stat-desc">Stores actively listed across platform</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#f59e0b' }}>
                <Star size={26} fill="currentColor" />
              </div>
              <div className="stat-content">
                <span className="stat-title">Total Submitted Ratings</span>
                <span className="stat-value">{stats.totalRatings}</span>
                <span className="stat-desc">Verified customer ratings in database</span>
              </div>
            </div>
          </div>

          {/* Quick Previews of Users & Stores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Recent Users</h3>
                <button onClick={() => setActiveTab('users')} className="btn btn-outline btn-sm">
                  View All Users &rarr;
                </button>
              </div>
              <DataTable
                columns={userColumns.slice(0, 3)}
                data={users.slice(0, 4)}
                keyField="id"
              />
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Recent Stores</h3>
                <button onClick={() => setActiveTab('stores')} className="btn btn-outline btn-sm">
                  View All Stores &rarr;
                </button>
              </div>
              <DataTable
                columns={storeColumns.slice(0, 3)}
                data={stores.slice(0, 4)}
                keyField="id"
              />
            </div>
          </div>
        </>
      )}

      {/* Users Tab Content */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="search-filter-bar">
            {/* Search Input */}
            <div className="search-input-group">
              <Search size={16} className="form-input-icon" />
              <input
                type="text"
                className="form-input form-input-with-icon"
                placeholder="Search by Name, Email, or Address..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <div className="filter-actions">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Filter size={16} color="var(--text-muted)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Role:</span>
              </div>
              {['ALL', 'USER', 'STORE_OWNER', 'ADMIN'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`btn btn-sm ${roleFilter === r ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {r === 'ALL' ? 'All Roles' : r === 'STORE_OWNER' ? 'Owners' : r === 'ADMIN' ? 'Admins' : 'Users'}
                </button>
              ))}
            </div>
          </div>

          <DataTable
            columns={userColumns}
            data={users}
            sortBy={userSortBy}
            order={userOrder}
            onSort={(col, ord) => {
              setUserSortBy(col);
              setUserOrder(ord);
            }}
            emptyMessage="No users match your criteria"
          />
        </div>
      )}

      {/* Stores Tab Content */}
      {activeTab === 'stores' && (
        <div className="card">
          <div className="search-filter-bar">
            {/* Search Input */}
            <div className="search-input-group">
              <Search size={16} className="form-input-icon" />
              <input
                type="text"
                className="form-input form-input-with-icon"
                placeholder="Search stores by Name, Email, or Address..."
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            columns={storeColumns}
            data={stores}
            sortBy={storeSortBy}
            order={storeOrder}
            onSort={(col, ord) => {
              setStoreSortBy(col);
              setStoreOrder(ord);
            }}
            emptyMessage="No stores match your criteria"
          />
        </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        title="Add New User to Platform"
        maxWidth="580px"
      >
        <form onSubmit={handleAddUserSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="newUserName">
              <span>Full Name</span>
              <span className="form-label-counter">
                {newUser.name.trim().length}/60 (Min 20)
              </span>
            </label>
            <input
              id="newUserName"
              type="text"
              className={`form-input ${addUserErrors.name ? 'has-error' : ''}`}
              placeholder="e.g. Jonathan Bartholomew Edwardson"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              maxLength={60}
              required
            />
            {addUserErrors.name && (
              <div className="form-error">
                <AlertCircle size={14} /> {addUserErrors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newUserEmail">Email Address</label>
            <input
              id="newUserEmail"
              type="email"
              className={`form-input ${addUserErrors.email ? 'has-error' : ''}`}
              placeholder="user@example.com"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            {addUserErrors.email && (
              <div className="form-error">
                <AlertCircle size={14} /> {addUserErrors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newUserRole">User Role</label>
            <select
              id="newUserRole"
              className="form-select"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="USER">Normal User (Can browse & rate stores)</option>
              <option value="STORE_OWNER">Store Owner (Can monitor store feedback)</option>
              <option value="ADMIN">System Administrator (Full access)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newUserAddress">
              <span>Physical Address</span>
              <span className="form-label-counter">{newUser.address.trim().length}/400</span>
            </label>
            <textarea
              id="newUserAddress"
              className={`form-textarea ${addUserErrors.address ? 'has-error' : ''}`}
              placeholder="Enter physical address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              maxLength={400}
              rows={2}
              required
            />
            {addUserErrors.address && (
              <div className="form-error">
                <AlertCircle size={14} /> {addUserErrors.address}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newUserPassword">
              <span>Password</span>
              <span className="form-label-counter">{newUser.password.length}/16</span>
            </label>
            <input
              id="newUserPassword"
              type="password"
              className={`form-input ${addUserErrors.password ? 'has-error' : ''}`}
              placeholder="8-16 chars, 1 uppercase, 1 special char"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              maxLength={16}
              required
            />
            {addUserErrors.password && (
              <div className="form-error">
                <AlertCircle size={14} /> {addUserErrors.password}
              </div>
            )}
            <div className="form-helper">
              Requirements: 8-16 characters, at least 1 uppercase letter, at least 1 special character.
            </div>
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAddUserModalOpen(false)}
              disabled={submittingUser}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submittingUser}
            >
              {submittingUser ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Store Modal */}
      <Modal
        isOpen={addStoreModalOpen}
        onClose={() => setAddStoreModalOpen(false)}
        title="Add New Store to Platform"
        maxWidth="580px"
      >
        <form onSubmit={handleAddStoreSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="newStoreName">
              <span>Store Name</span>
              <span className="form-label-counter">
                {newStore.name.trim().length}/60 (Min 20)
              </span>
            </label>
            <input
              id="newStoreName"
              type="text"
              className={`form-input ${addStoreErrors.name ? 'has-error' : ''}`}
              placeholder="e.g. Apex Athletic Apparel & Gear"
              value={newStore.name}
              onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
              maxLength={60}
              required
            />
            {addStoreErrors.name && (
              <div className="form-error">
                <AlertCircle size={14} /> {addStoreErrors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newStoreEmail">Store Contact Email</label>
            <input
              id="newStoreEmail"
              type="email"
              className={`form-input ${addStoreErrors.email ? 'has-error' : ''}`}
              placeholder="store@example.com"
              value={newStore.email}
              onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
              required
            />
            {addStoreErrors.email && (
              <div className="form-error">
                <AlertCircle size={14} /> {addStoreErrors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newStoreAddress">
              <span>Physical Address</span>
              <span className="form-label-counter">{newStore.address.trim().length}/400</span>
            </label>
            <textarea
              id="newStoreAddress"
              className={`form-textarea ${addStoreErrors.address ? 'has-error' : ''}`}
              placeholder="Enter complete store physical location"
              value={newStore.address}
              onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
              maxLength={400}
              rows={3}
              required
            />
            {addStoreErrors.address && (
              <div className="form-error">
                <AlertCircle size={14} /> {addStoreErrors.address}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newStoreOwner">Assign Store Owner (Optional)</label>
            <select
              id="newStoreOwner"
              className="form-select"
              value={newStore.ownerId}
              onChange={(e) => setNewStore({ ...newStore, ownerId: e.target.value })}
            >
              <option value="">-- No Owner Assigned (Unassigned) --</option>
              {storeOwners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
            <div className="form-helper">
              Only users registered with the Store Owner role can be assigned.
            </div>
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAddStoreModalOpen(false)}
              disabled={submittingStore}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submittingStore}
            >
              {submittingStore ? 'Adding Store...' : 'Add Store'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
