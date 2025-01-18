export interface VenueStatic {
  id: string;
  venue_raw: {
    location: {
      coordinates: [number, number];
    };
  };
}

export interface DistanceRange {
  min: number;
  max: number | null;
  a: number;
  b: number;
  flag: null; // 'flag' is currently unused because it's always null, but included here for completeness
}

export interface VenueDynamic {
  id: string; 
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number; 
      delivery_pricing: {
        base_price: number;
        distance_ranges: DistanceRange[]; 
      };
    };
  };
}

export interface DeliveryCalculation {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}