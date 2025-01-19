import React, { useState, useCallback, useEffect } from 'react';
import { Moon, Sun, Truck } from 'lucide-react';
import { LocationInput } from './components/LocationInput';
import { ResultsCard } from './components/ResultsCard';
import { calculateDistance, calculateDeliveryFee, calculateSmallOrderSurcharge } from './utils/calculations';
import type { VenueStatic, VenueDynamic, DeliveryCalculation } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [venueSlug, setVenueSlug] = useState('home-assignment-venue-helsinki');
  const [cartValue, setCartValue] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [results, setResults] = useState<DeliveryCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLocationChange = useCallback((lat: number, lon: number) => {
    setUserLocation({ lat, lon });
  }, []);

  const fetchVenueData = async (slug: string) => {
    const staticUrl = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${slug}/static`;
    const dynamicUrl = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${slug}/dynamic`;

    try {
      const [staticRes, dynamicRes] = await Promise.all([
        fetch(staticUrl),
        fetch(dynamicUrl)
      ]);

      if (!staticRes.ok || !dynamicRes.ok) {
        throw new Error('Failed to fetch venue data. Please check the venue ID.');
      }

      const staticData: VenueStatic = await staticRes.json();
      const dynamicData: VenueDynamic = await dynamicRes.json();

      return { staticData, dynamicData };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An error occurred while fetching data');
    }
  };

  const calculateDeliveryDetails = async () => {
    if (!venueSlug || !cartValue || !userLocation) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { staticData, dynamicData } = await fetchVenueData(venueSlug);
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lon,
        staticData.venue_raw.location.coordinates[1], // Latitude
        staticData.venue_raw.location.coordinates[0]  // Longitude
      );
      const cartValueCents = Math.round(parseFloat(cartValue) * 100);
      const smallOrderSurcharge = calculateSmallOrderSurcharge(
        cartValueCents,
        dynamicData?.venue_raw?.delivery_specs?.order_minimum_no_surcharge ?? 0
      );
      const deliveryFee = calculateDeliveryFee(
        distance,
        dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price,
        dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges
      );

      setResults({
        cartValue: cartValueCents,
        smallOrderSurcharge,
        deliveryFee,
        deliveryDistance: distance,
        totalPrice: cartValueCents + smallOrderSurcharge + deliveryFee
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Delivery Order Price Calculator
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                       transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? 
              <Sun className="w-5 h-5 text-yellow-500" aria-hidden="true" /> : 
              <Moon className="w-5 h-5 text-blue-600" aria-hidden="true" />
            }
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section
            aria-labelledby="input-section-title"
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h2 id="input-section-title" className="sr-only">
              Input Section
            </h2>
            <div className="space-y-2">
              <label htmlFor="venue-slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Venue Slug
              </label>
              <input
                type="text"
                id="venue-slug"
                value={venueSlug}
                onChange={(e) => setVenueSlug(e.target.value)}
                placeholder="e.g., home-assignment-venue-helsinki"
                className="input-field"
                aria-describedby="venue-slug-helper"
              />
              <p id="venue-slug-helper" className="text-sm text-gray-500 dark:text-gray-400">
                Enter the venue slug to calculate delivery fee.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="cart-value" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cart Value (€)
              </label>
              <input
                type="number"
                id="cart-value"
                value={cartValue}
                onChange={(e) => setCartValue(e.target.value)}
                step="0.01"
                min="0"
                placeholder="0.00"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Location</h3>
              <LocationInput onLocationChange={handleLocationChange} />
            </div>

            <button
              onClick={calculateDeliveryDetails}
              disabled={loading}
              className="primary-button"
              aria-live="polite"
            >
              {loading ? 'Calculating...' : 'Calculate Delivery Fee'}
            </button>
          </section>

          <ResultsCard results={results} error={error} />
        </main>
      </div>
    </div>
  );
}

export default App;
