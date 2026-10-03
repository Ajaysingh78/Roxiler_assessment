import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox } from 'lucide-react';

export const DataTable = ({
  columns = [],
  data = [],
  sortBy = '',
  order = 'asc',
  onSort = null,
  emptyMessage = 'No records found',
  keyField = 'id'
}) => {
  const handleSort = (colKey) => {
    if (!onSort) return;
    if (sortBy === colKey) {
      onSort(colKey, order === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(colKey, 'asc');
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortBy === col.key;
              return (
                <th
                  key={col.key}
                  className={col.sortable ? 'sortable' : ''}
                  onClick={() => col.sortable && handleSort(col.key)}
                  style={{ width: col.width || 'auto' }}
                >
                  <div className="th-content">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span style={{ display: 'inline-flex', opacity: isSorted ? 1 : 0.4 }}>
                        {isSorted ? (
                          order === 'asc' ? (
                            <ArrowUp size={14} color="var(--color-primary)" />
                          ) : (
                            <ArrowDown size={14} color="var(--color-primary)" />
                          )
                        ) : (
                          <ArrowUpDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <Inbox size={40} strokeWidth={1.5} />
                  <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{emptyMessage}</div>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row[keyField] || idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
