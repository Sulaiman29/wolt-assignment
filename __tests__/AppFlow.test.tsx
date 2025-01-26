import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

describe("Delivery Order Price Calculator", () => {
  test("calculates delivery price correctly for valid inputs", async () => {
    // Render the App component
    const { container } = render(<App />);

    // Fill in Venue Slug
    const venueSlugInput = container.querySelector('[data-test-id="venueSlug"]');
    expect(venueSlugInput).not.toBeNull(); // Ensure the element exists
    fireEvent.change(venueSlugInput as HTMLInputElement, {
      target: { value: "home-assignment-venue-helsinki" },
    });
    expect(venueSlugInput).toHaveValue("home-assignment-venue-helsinki");

    // Fill in Cart Value
    const cartValueInput = container.querySelector('[data-test-id="cartValue"]');
    expect(cartValueInput).not.toBeNull(); // Ensure the element exists
    fireEvent.change(cartValueInput as HTMLInputElement, {
      target: { value: "10" },
    });
    expect(cartValueInput).toHaveValue(10);

    // Fill in Latitude and Longitude
    const latitudeInput = container.querySelector('[data-test-id="latitude-input"]');
    const longitudeInput = container.querySelector('[data-test-id="longitude-input"]');
    expect(latitudeInput).not.toBeNull();
    expect(longitudeInput).not.toBeNull();

    fireEvent.change(latitudeInput as HTMLInputElement, {
      target: { value: 60.17094 },
    });
    fireEvent.change(longitudeInput as HTMLInputElement, {
      target: { value: 24.93087 },
    });
    expect(latitudeInput).toHaveValue(60.17094);
    expect(longitudeInput).toHaveValue(24.93087);

    // Click "Calculate Delivery Price" Button
    const calculateButton = container.querySelector('[data-test-id="calculateDeliveryPrice"]');
    expect(calculateButton).not.toBeNull(); // Ensure the button exists
    fireEvent.click(calculateButton as HTMLButtonElement);

    // Wait for results to appear in the DOM
    const cartValueResult = await screen.findByText("€10.00", { exact: false });
    const deliveryFeeResult = await screen.findByText("€1.90", { exact: false });
    const deliveryDistanceResult = await screen.findByText("177 m", { exact: false });
    const smallOrderSurchargeResult = await screen.findByText("€0.00", { exact: false });
    const totalPriceResult = await screen.findByText("€11.90", { exact: false });

    // Assert the results
    expect(cartValueResult).toBeInTheDocument();
    expect(deliveryFeeResult).toBeInTheDocument();
    expect(deliveryDistanceResult).toBeInTheDocument();
    expect(smallOrderSurchargeResult).toBeInTheDocument();
    expect(totalPriceResult).toBeInTheDocument();
  });

  test("shows an error when inputs are invalid", async () => {
    // Render the App component
    const { container } = render(<App />);

    // Fill in invalid Cart Value
    const cartValueInput = container.querySelector('[data-test-id="cartValue"]');
    expect(cartValueInput).not.toBeNull(); // Ensure the element exists
    fireEvent.change(cartValueInput as HTMLInputElement, {
      target: { value: "" },
    });

    const calculateButton = container.querySelector('[data-test-id="calculateDeliveryPrice"]');
    expect(calculateButton).not.toBeNull();
    fireEvent.click(calculateButton as HTMLButtonElement);

    // Verify the error message
    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent("Please fix the errors before submitting.");
  });
});
