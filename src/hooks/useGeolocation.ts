import { useState } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

function roundToSixDecimalPlaces(value: number): number {
  return Math.round(value * 1e6) / 1e6; // Round to 6 decimal places
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const roundedLatitude = roundToSixDecimalPlaces(position.coords.latitude);
        const roundedLongitude = roundToSixDecimalPlaces(position.coords.longitude);

        setState({
          latitude: roundedLatitude,
          longitude: roundedLongitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState({
          latitude: null,
          longitude: null,
          error: error.message,
          loading: false,
        });
      }
    );
  };

  return { ...state, getLocation };
}