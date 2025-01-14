// Haversine formula to calculate distance between two points
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export function calculateDeliveryFee(
  distance: number,
  basePrice: number,
  distanceRanges: Array<{
    from: number;
    to: number | null;
    a: number;
    b: number;
  }>
): number {
  const applicableRange = distanceRanges.find(
    (range) =>
      distance >= range.from &&
      (range.to === null || distance <= range.to)
  );

  if (!applicableRange) {
    throw new Error('Distance exceeds maximum delivery range');
  }

  return basePrice + applicableRange.a + (applicableRange.b * distance / 10);
}

export function calculateSmallOrderSurcharge(
  cartValue: number,
  minimumNoSurcharge: number
): number {
  const surcharge = minimumNoSurcharge - cartValue;
  return surcharge > 0 ? surcharge : 0;
}