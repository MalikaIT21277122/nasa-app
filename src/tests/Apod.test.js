import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Apod from '../components/Apod';

// Mocking fetch API
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
});

test('renders loading spinner initially', async () => {
  const { getByRole } = render(<Apod />);
  expect(getByRole('status')).toBeInTheDocument();
});

test('renders Apod content after successful API call', async () => {
  const mockApodData = {
    url: 'test.jpg',
    title: 'Test Title',
    explanation: 'Test Explanation',
    date: '2024-05-01',
  };

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(mockApodData),
    })
  );
});
