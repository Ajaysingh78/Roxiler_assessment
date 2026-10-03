import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StarRating } from '../../components/common/StarRating';
import { Modal } from '../../components/common/Modal';
import {
  Search,
  Store,
  MapPin,
  Mail,
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Edit3,
  ThumbsUp,
  Inbox
} from 'lucide-react';

export const StoresList = () => {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');

  // Rating modal state
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  const fetchStores = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (sortBy) params.append('sortBy', sortBy);
      if (order) params.append('order', order);

      const res = await api.get(`/stores?${params.toString()}`);
      if (res.success) {
        setStores(res.data);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  }, [search, sortBy, order, toastError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStores();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchStores]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setOrder('asc');
    }
  };

  const openRatingModal = (store) => {
    setSelectedStore(store);
    setRatingValue(store.userSubmittedRating || 5);
  };

  const handleQuickRate = async (store, rating) => {
    if (!user) {
      toastError('Please sign in to submit a rating');
      return;
    }
    if (user.role === 'STORE_OWNER') {
      toastError('Store owners cannot rate stores');
      return;
    }

    try {
      const res = await api.post(`/stores/${store.id}/ratings`, { rating });
      if (res.success) {
        success(store.userSubmittedRating ? 'Rating updated!' : 'Rating submitted!');
        // Update local state smoothly
        setStores((prev) =>
          prev.map((s) => {
            if (s.id === store.id) {
              return {
                ...s,
                overallRating: res.data.storeOverallRating,
                totalRatings: res.data.totalRatings,
                userSubmittedRating: rating
              };
            }
            return s;
          })
        );
      }
    } catch (err) {
      toastError(err.message || 'Failed to submit rating');
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStore) return;

    try {
      setRatingSubmitting(true);
      const res = await api.post(`/stores/${selectedStore.id}/ratings`, {
        rating: ratingValue
      });
      if (res.success) {
        success(
          selectedStore.userSubmittedRating
            ? `Updated rating to ${ratingValue} stars for ${selectedStore.name}`
            : `Submitted ${ratingValue} star rating for ${selectedStore.name}`
        );
        setSelectedStore(null);
        fetchStores();
      }
    } catch (err) {
      toastError(err.message || 'Failed to submit rating');
    } finally {
      setRatingSubmitting(false);
    }
  };

  return (
    <div className="container main-content">
      {/* Page Header */}
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
          <h1 style={{ fontSize: '2rem' }}>Explore Registered Stores</h1>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Browse stores, check verified customer ratings, and share your experience with 1 to 5 star ratings.
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="search-filter-bar">
        <div className="search-input-group">
          <Search size={18} className="form-input-icon" />
          <input
            type="text"
            className="form-input form-input-with-icon"
            placeholder="Search stores by Name or Address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Sort by:
          </span>
          <button
            onClick={() => handleSort('name')}
            className={`btn btn-sm ${sortBy === 'name' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Name {sortBy === 'name' && (order === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />)}
          </button>
          <button
            onClick={() => handleSort('overallRating')}
            className={`btn btn-sm ${sortBy === 'overallRating' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Rating {sortBy === 'overallRating' && (order === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />)}
          </button>
          <button
            onClick={() => handleSort('address')}
            className={`btn btn-sm ${sortBy === 'address' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Address {sortBy === 'address' && (order === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />)}
          </button>
        </div>
      </div>

      {/* Stores List Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
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
          Loading registered stores...
        </div>
      ) : stores.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Inbox size={48} color="var(--text-dim)" style={{ margin: '0 auto 1rem' }} />
          <h3>No stores found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {search ? 'Try adjusting your search query' : 'No stores registered yet.'}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {stores.map((store) => {
            const hasUserRated = store.userSubmittedRating != null;

            return (
              <div
                key={store.id}
                className="card card-elevated"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  {/* Store Name & Overall Score Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <h2 style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>{store.name}</h2>
                    <div
                      className="badge badge-rating"
                      style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Star size={14} fill="currentColor" />
                      <span>{store.overallRating > 0 ? store.overallRating.toFixed(1) : 'New'}</span>
                    </div>
                  </div>

                  {/* Rating Stars & Count */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    <StarRating rating={store.overallRating} size={17} />
                    <span style={{ color: 'var(--text-muted)' }}>
                      ({store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'})
                    </span>
                  </div>

                  {/* Address and Email */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{store.address}</span>
                    </div>
                    {store.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={16} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                        <span>{store.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating Interaction Box */}
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    marginTop: 'auto'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {hasUserRated ? "Your Submitted Rating:" : "Rate this store:"}
                    </span>
                    {hasUserRated && (
                      <span className="badge badge-user" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
                        Rated {store.userSubmittedRating} ★
                      </span>
                    )}
                  </div>

                  {user ? (
                    user.role === 'STORE_OWNER' ? (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                        Store owners cannot rate stores
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem'
                        }}
                      >
                        <StarRating
                          rating={store.userSubmittedRating || 0}
                          interactive={true}
                          size={24}
                          onRate={(stars) => handleQuickRate(store, stars)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => openRatingModal(store)}
                        >
                          <Edit3 size={13} />
                          <span>{hasUserRated ? 'Modify' : 'Submit'}</span>
                        </button>
                      </div>
                    )
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <StarRating rating={0} interactive={false} size={20} />
                      <a href="/login" className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                        Sign in to Rate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Rating Modal */}
      {selectedStore && (
        <Modal
          isOpen={!!selectedStore}
          onClose={() => setSelectedStore(null)}
          title={selectedStore.userSubmittedRating ? `Modify Rating for ${selectedStore.name}` : `Submit Rating for ${selectedStore.name}`}
        >
          <form onSubmit={handleModalSubmit}>
            <div style={{ textAlign: 'center', padding: '1rem 0 1.5rem' }}>
              <div style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Select your rating from 1 to 5 stars:
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                <StarRating
                  rating={ratingValue}
                  interactive={true}
                  size={36}
                  onRate={(val) => setRatingValue(val)}
                />
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {ratingValue} {ratingValue === 1 ? 'Star' : 'Stars'}
              </div>
            </div>

            <div className="modal-footer" style={{ padding: '1rem 0 0' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedStore(null)}
                disabled={ratingSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={ratingSubmitting}
              >
                {ratingSubmitting ? 'Saving...' : selectedStore.userSubmittedRating ? 'Update Rating' : 'Submit Rating'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
