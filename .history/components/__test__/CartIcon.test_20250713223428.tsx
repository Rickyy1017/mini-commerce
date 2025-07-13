import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartIcon from '../CartIcon';
import { useCartStore } from 'store/cartStore';

jest.mock('store/cartStore', () => ({
  useCartStore: jest.fn(),
}));

describe('CartIcon', () => {
  it('shows the correct number of items in the cart', () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [
        { id: 1, name: 'iPhone', price: 1000, storage: '128GB', image: '', slug: 'iphone', quantity: 1 },

    render(<CartIcon />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
