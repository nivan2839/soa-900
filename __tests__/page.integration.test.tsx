import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
import Home from '../app/page';

const mockQuestions = Array(10).fill('What is 2 + 2?');

describe('Home Component - Integration Test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('generates and displays questions', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ questions: mockQuestions }));

    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Topic'), { target: { value: 'Math' } });
    fireEvent.click(screen.getByText('Generate Questions'));

    await waitFor(() => {
      expect(screen.getAllByText('What is 2 + 2?').length).toBe(10);
    });
  });
});
