import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useGeolocation } from "../hooks/useGeolocation";

interface LocationInputProps {
  onLocationChange: (lat: number, lon: number) => void;
  "data-test-id"?: string;
}

export function LocationInput({ onLocationChange }: LocationInputProps) {
  const { latitude, longitude, error, loading, getLocation } = useGeolocation();
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");
  const [latError, setLatError] = useState<string | null>(null);
  const [lonError, setLonError] = useState<string | null>(null);

  const validateLatitude = (value: string): string | null => {
    const num = parseFloat(value);
    if (value === "" || isNaN(num)) return "Latitude must be a valid number.";
    if (num < -90 || num > 90) return "Latitude must be between -90 and 90 degrees.";
    if (value.split(".")[1]?.length > 6) return "Latitude can have up to 6 decimal places.";
    return null;
  };

  const validateLongitude = (value: string): string | null => {
    const num = parseFloat(value);
    if (value === "" || isNaN(num)) return "Longitude must be a valid number.";
    if (num < -180 || num > 180) return "Longitude must be between -180 and 180 degrees.";
    if (value.split(".")[1]?.length > 6) return "Longitude can have up to 6 decimal places.";
    return null;
  };

  // Handle validation on input change
  const handleLatitudeChange = (value: string) => {
    setManualLat(value);
    setLatError(validateLatitude(value));
    if (!validateLatitude(value) && !validateLongitude(manualLon)) {
      onLocationChange(parseFloat(value), parseFloat(manualLon));
    }
  };

  const handleLongitudeChange = (value: string) => {
    setManualLon(value);
    setLonError(validateLongitude(value));
    if (!validateLongitude(value) && !validateLatitude(manualLat)) {
      onLocationChange(parseFloat(manualLat), parseFloat(value));
    }
  };

  // Populate fields when geolocation updates
  useEffect(() => {
    if (latitude && longitude) {
      const latString = latitude.toFixed(6);
      const lonString = longitude.toFixed(6);
      setManualLat(latString);
      setManualLon(lonString);
      setLatError(null);
      setLonError(null);
      onLocationChange(latitude, longitude);
    }
  }, [latitude, longitude, onLocationChange]);

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
            onChange={(e) => handleLatitudeChange(e.target.value)}
            className="input-field"
            step="any"
            placeholder="60.1699"
            aria-required="true"
            aria-describedby="latitude-desc"
            data-test-id="latitude-input"
          />
          <p id="latitude-desc" className="sr-only">
            Latitude should be a number between -90 and 90.
          </p>
          {latError && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {latError}
            </p>
          )}
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
            onChange={(e) => handleLongitudeChange(e.target.value)}
            className="input-field"
            step="any"
            placeholder="24.9384"
            aria-required="true"
            aria-describedby="longitude-desc"
            data-test-id="longitude-input"
          />
          <p id="longitude-desc" className="sr-only">
            Longitude should be a number between -180 and 180.
          </p>
          {lonError && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {lonError}
            </p>
          )}
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
        data-test-id="get-location-button"
      >
        <MapPin className="w-5 h-5" />
        {loading ? "Getting location..." : "Get Current Location"}
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