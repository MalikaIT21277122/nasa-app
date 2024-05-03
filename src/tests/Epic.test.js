import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Epic from '../components/Epic';

// Mocking fetch API
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // Empty array as mock data for testing
    })
  );
});

test('renders loading spinner initially', async () => {
  const { getByRole } = render(<Epic />);
  expect(getByRole('status')).toBeInTheDocument();
});

test('renders photos after successful API call', async () => {
  global.fetch.mockImplementationOnce(() =>
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
  const { getByAltText } = render(<Epic />);
  await waitFor(() => {
    expect(getByAltText(/Epic Image 1/i)).toBeInTheDocument();
  });
});
