// Haversine formula to calculate distance between two points
export function calculateDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number {
  const earthRadius = 6371e3; // Earth's radius in meters
  const lat1Radians = (latitude1 * Math.PI) / 180;
  const lat2Radians = (latitude2 * Math.PI) / 180;
  const deltaLatitude = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLongitude = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(lat1Radians) *
      Math.cos(lat2Radians) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * angularDistance; // Distance in meters
}

export function calculateDeliveryFee(
  distance: number,
  basePrice: number,
  distanceRanges: Array<{
    min: number;
    max: number | null;
    a: number;
    b: number;
  }>
): number { console.log('distanceRanges', distanceRanges);
  const applicableRange = distanceRanges.find(
    (range) =>
      distance >= range.min &&
      (range.max === null || distance <= range.max)
  );
    console.log('range boolean', applicableRange);
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