// components/_test_/CartIcon.test.tsx
import { render, screen } from '@testing-library/react';
import CartIcon from '../CartIcon';
import { useCartStore } from '@/store/cartStore';

// 🧪 Mock Zustand store
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn(),
}));

describe('CartIcon', () => {
  it('shows the correct number of items in cart', () => {
    (useCartStore as jest.Mock).mockReturnValue({ totalItems: 5 });

    render(<CartIcon />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});