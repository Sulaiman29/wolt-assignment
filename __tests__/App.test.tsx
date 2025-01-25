import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
  test("renders all main components", () => {
    const { container } = render(<App />);

    expect(container.querySelector('[data-test-id="venueSlug"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test-id="cartValue"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test-id="calculateDeliveryPrice"]')).toBeInTheDocument();
  });

  test("displays error when required fields are missing", async () => {
    const { container } = render(<App />);
  
    const calculateButton = container.querySelector('[data-test-id="calculateDeliveryPrice"]');
  
    // Click the calculate button without filling inputs
    fireEvent.click(calculateButton as Element);
  
    // Wait for the parent error message to appear
    const errorMessage = await screen.findByText("Please fix the errors before submitting.");
    expect(errorMessage).toBeInTheDocument();
  });
  
  test("updates delivery details on valid inputs", async () => {
    const { container } = render(<App />);

    const venueSlugInput = container.querySelector('[data-test-id="venueSlug"]');
    const cartValueInput = container.querySelector('[data-test-id="cartValue"]');
    const latitudeInput = container.querySelector('[data-test-id="latitude-input"]');
    const longitudeInput = container.querySelector('[data-test-id="longitude-input"]');
    const calculateButton = container.querySelector('[data-test-id="calculateDeliveryPrice"]');

    // Update valid inputs
    fireEvent.change(venueSlugInput as Element, {
      target: { value: "home-assignment-venue-helsinki" },
    });
    fireEvent.change(cartValueInput as Element, {
      target: { value: "20" },
    });
    fireEvent.change(latitudeInput as Element, {
      target: { value: "60.1699" },
    });
    fireEvent.change(longitudeInput as Element, {
      target: { value: "24.9384" },
    });

    // Click calculate button
    fireEvent.click(calculateButton as Element);

    // Wait for the "Delivery Summary" text to appear
    const deliverySummary = await screen.findByText("Delivery Summary");
    expect(deliverySummary).toBeInTheDocument();
  });
});
