import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Epic from '../components/Epic';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          date: '2022-05-01 12:00:00',
          image: 'image1',
          caption: 'Epic Image 1',
          centroid_coordinates: { lat: 10, lon: 20 },
          dscovr_j2000_position: { x: 0, y: 0, z: 0 },
        },
      ]),
  })
);

describe('Epic component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading spinner initially', async () => {
    const { getByRole } = render(<Epic />);
    expect(getByRole('status')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api.nasa.gov'));
  });

  test('renders error message when fetch fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Fetch error'));
    const { findByText } = render(<Epic />);
    const errorMessage = await findByText('Error: Error fetching data from NASA EPIC API');
    expect(errorMessage).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api.nasa.gov'));
  });
});
