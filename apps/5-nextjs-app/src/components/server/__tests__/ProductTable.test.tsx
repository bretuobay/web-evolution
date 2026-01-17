// apps/5-nextjs-app/src/components/server/__tests__/ProductTable.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductTable from '../ProductTable';
import { listProducts } from '@wees/database/client';
import { db } from '@/lib/db';

jest.mock('@wees/database/client', () => ({
  listProducts: jest.fn(),
}));

jest.mock('@/lib/db', () => ({
  db: {},
}));

describe('ProductTable', () => {
  it('renders a table with products', () => {
    (listProducts as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: 'Test Product 1', price: 10, quantity: 100 },
        { id: 2, name: 'Test Product 2', price: 20, quantity: 200 },
      ],
    });

    render(<ProductTable search="" />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });
});
