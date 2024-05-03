import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MarsRoverPhotos from '../components/MarsRoverPhotos';

// Mocking fetch API
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ photos: [] }),
    })
  );
});

test('renders loading spinner initially', async () => {
  const { getByRole } = render(<MarsRoverPhotos />);
  expect(getByRole('status')).toBeInTheDocument();
});

test('renders photos after successful API call', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          photos: [
            {
              id: 1,
              img_src: 'test.jpg',
              earth_date: '2022-05-01',
              rover: { name: 'Curiosity' },
              camera: { full_name: 'Mastcam' },
            },
          ],
        }),
    })
  );
  const { getByAltText } = render(<MarsRoverPhotos />);
  await waitFor(() => {
    expect(getByAltText(/Mars Rover Photo 1/i)).toBeInTheDocument();
  });
});
