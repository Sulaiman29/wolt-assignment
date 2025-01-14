import React from 'react';
import { DeliveryCalculation } from '../types';
import { ShoppingBag, Truck, MapPin, CreditCard } from 'lucide-react';

interface ResultsCardProps {
  results: DeliveryCalculation | null;
  error: string | null;
}

export function ResultsCard({ results, error }: ResultsCardProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6" role="alert">
        <p className="text-red-700 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4">
          <Truck className="w-16 h-16 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            Enter delivery details to calculate fees
          </p>
        </div>
      </div>
    );
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Delivery Summary</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Small Order Fee</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(results.smallOrderSurcharge)}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(results.deliveryFee)}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Distance</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {(results.deliveryDistance / 1000).toFixed(2)} km
          </span>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
            </div>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(results.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}