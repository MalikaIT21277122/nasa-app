import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MarsRoverPhotos from '../components/MarsRoverPhotos';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        photos: [
          {
            id: 1,
            img_src: 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02410/opgs/edr/fcam/FLB_683998645EDR_F0861102FHAZ00323M_.JPG',
            earth_date: '2022-05-01',
            rover: {
              name: 'Curiosity',
            },
            camera: {
              full_name: 'Front Hazard Avoidance Camera',
            },
          },
        ],
      }),
  })
);

describe('MarsRoverPhotos component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading spinner initially', async () => {
    const { getByRole } = render(<MarsRoverPhotos />);
    expect(getByRole('status')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api.nasa.gov'));
  });

  test('renders error message when fetch fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Fetch error'));
    const { findByText } = render(<MarsRoverPhotos />);
    const errorMessage = await findByText('Error: Error fetching data from Mars Rover API');
    expect(errorMessage).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api.nasa.gov'));
  });
});
