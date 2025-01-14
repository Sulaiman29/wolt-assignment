export interface VenueStatic {
  id: string;
  venue_raw: {
    location: {
      coordinates: [number, number];
    };
  };
}

export interface DistanceRange {
  from: number;
  to: number | null;
  a: number;
  b: number;
}

export interface VenueDynamic {
  id: string;
  order_minimum_no_surcharge: number;
  base_price: number;
  distance_ranges: DistanceRange[];
}

export interface DeliveryCalculation {
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}