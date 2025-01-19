import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';

interface LocationInputProps {
  onLocationChange: (lat: number, lon: number) => void;
}

export function LocationInput({ onLocationChange }: LocationInputProps) {
  const { latitude, longitude, error, loading, getLocation } = useGeolocation();
  const [manualLat, setManualLat] = useState('');
  const [manualLon, setManualLon] = useState('');

  // Handle geolocation updates
  useEffect(() => {
    if (latitude && longitude) {
      setManualLat(latitude.toFixed(6)); // Ensure consistent precision
      setManualLon(longitude.toFixed(6));
      onLocationChange(latitude, longitude);
    }
  }, [latitude, longitude, onLocationChange]);

  // Handle manual input updates
  useEffect(() => {
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLon);
    if (!isNaN(lat) && !isNaN(lon)) {
      onLocationChange(lat, lon);
    }
  }, [manualLat, manualLon, onLocationChange]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Latitude
          </label>
          <input
            type="number"
            id="latitude"
            value={manualLat}
            onChange={(e) => setManualLat(e.target.value)}
            className="input-field"
            step="any"
            placeholder="60.1699"
            aria-required="true"
            aria-describedby="latitude-desc"
          />
          <p id="latitude-desc" className="sr-only">
            Latitude should be a number between -90 and 90.
          </p>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Longitude
          </label>
          <input
            type="number"
            id="longitude"
            value={manualLon}
            onChange={(e) => setManualLon(e.target.value)}
            className="input-field"
            step="any"
            placeholder="24.9384"
            aria-required="true"
            aria-describedby="longitude-desc"
          />
          <p id="longitude-desc" className="sr-only">
            Longitude should be a number between -180 and 180.
          </p>
        </div>
      </div>
      <button
        onClick={getLocation}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                   bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                   text-gray-700 dark:text-gray-200 font-medium transition-colors
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                   disabled:opacity-50"
        aria-label="Get your current location using GPS"
        aria-busy={loading}
      >
        <MapPin className="w-5 h-5" />
        {loading ? 'Getting location...' : 'Get Current Location'}
      </button>
      {error && (
        <p
          className="text-red-500 text-sm mt-2"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
}