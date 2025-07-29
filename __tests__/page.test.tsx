import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

describe('Home Component - Unit Tests', () => {
  it('renders input fields and buttons', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Grade')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Topic')).toBeInTheDocument();
    expect(screen.getByText('Generate Questions')).toBeInTheDocument();
  });

  it('updates grade and topic input values', () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Topic'), { target: { value: 'Math' } });
    expect(screen.getByPlaceholderText('Grade')).toHaveValue('5');
    expect(screen.getByPlaceholderText('Topic')).toHaveValue('Math');
  });
});