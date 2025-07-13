// components/_test_/CartIcon.test.tsx
import { render, screen } from '@testing-library/react';
import CartIcon from '../CartIcon';
import { useCartStore } from '@/store/cartStore';
import '@testing-library/jest-dom'; // 💡 Needed for custom matchers

// 👇 Properly typed mocked hook
const mockedUseCartStore = useCartStore as jest.Mock;

jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn(),
}));

describe('CartIcon', () => {
  it('shows the correct number of items in cart', () => {
    mockedUseCartStore.mockReturnValue({ totalItems: 5 });

    render(<CartIcon />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});