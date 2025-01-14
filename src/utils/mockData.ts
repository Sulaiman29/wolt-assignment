export const mockVenueStatic = {
  id: "home-assignment-venue-helsinki",
  location: {
    coordinates: [24.9384, 60.1699] // Helsinki coordinates [longitude, latitude]
  }
};

export const mockVenueDynamic = {
  id: "home-assignment-venue-helsinki",
  order_minimum_no_surcharge: 1000, // 10€ in cents
  base_price: 200, // 2€ in cents
  distance_ranges: [
    {
      from: 0,
      to: 1000,
      a: 200, // 2€ in cents
      b: 100  // 1€ in cents per 10 meters
    },
    {
      from: 1000,
      to: 3000,
      a: 300,
      b: 150
    },
    {
      from: 3000,
      to: null,
      a: 400,
      b: 200
    }
  ]
};