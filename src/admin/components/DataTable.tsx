import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, rows, rowKey, emptyMessage = 'Nothing here yet.' }: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-16 bg-surface rounded-2xl border border-outline-variant/20">
        <span className="material-symbols-outlined text-4xl text-secondary mb-2">inbox</span>
        <p className="text-secondary text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-low">
            {columns.map((col) => (
              <th key={col.header} className={`text-left px-4 py-3 font-semibold text-secondary uppercase text-xs tracking-wide ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
              {columns.map((col) => (
                <td key={col.header} className={`px-4 py-3 align-middle ${col.className ?? ''}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
