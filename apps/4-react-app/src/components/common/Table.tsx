// src/components/common/Table.tsx
import React from 'react';

/**
 * A reusable Table component.
 * This component is designed to be generic and reusable for displaying any
 * kind of tabular data. It takes columns and data as props, decoupling it
 * from the specific data it will display.
 */
interface TableProps<T> {
  columns: {
    header: string;
    accessor: keyof T;
  }[];
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
}

const Table = <T extends { id: number }>({ columns, data, renderActions }: TableProps<T>) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.header}>{col.header}</th>
          ))}
          {renderActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.accessor as string}>{String(item[col.accessor])}</td>
            ))}
            {renderActions && <td>{renderActions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
