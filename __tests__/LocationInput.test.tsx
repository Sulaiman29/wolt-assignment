import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LocationInput } from "../src/components/LocationInput";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("LocationInput Component", () => {
  test("renders latitude and longitude inputs", () => {
    const { container } = render(
      <LocationInput onLocationChange={vi.fn()} setIsValidLocation={vi.fn()} />
    );

    expect(container.querySelector('[data-test-id="latitude-input"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test-id="longitude-input"]')).toBeInTheDocument();
  });

  test("validates latitude input", () => {
    const handleLocationChange = vi.fn();
    const setIsValidLocation = vi.fn();
    const { container, getByRole } = render(
      <LocationInput onLocationChange={handleLocationChange} setIsValidLocation={setIsValidLocation} />
    );

    const latitudeInput = container.querySelector('[data-test-id="latitude-input"]');
    fireEvent.change(latitudeInput as Element, { target: { value: "91" } });

    expect(getByRole("alert").textContent).toBe(
      "Latitude must be between -90 and 90 degrees."
    );
    expect(handleLocationChange).not.toHaveBeenCalled();
    expect(setIsValidLocation).toHaveBeenCalledWith(false); // Ensure validity is updated
  });

  test("validates longitude input", () => {
    const handleLocationChange = vi.fn();
    const setIsValidLocation = vi.fn();
    const { container, getByRole } = render(
      <LocationInput onLocationChange={handleLocationChange} setIsValidLocation={setIsValidLocation} />
    );

    const longitudeInput = container.querySelector('[data-test-id="longitude-input"]');
    fireEvent.change(longitudeInput as Element, { target: { value: "181" } });

    expect(getByRole("alert").textContent).toBe(
      "Longitude must be between -180 and 180 degrees."
    );
    expect(handleLocationChange).not.toHaveBeenCalled();
    expect(setIsValidLocation).toHaveBeenCalledWith(false); // Ensure validity is updated
  });

  test("calls onLocationChange with valid latitude and longitude", () => {
    const handleLocationChange = vi.fn();
    const setIsValidLocation = vi.fn();
    const { container } = render(
      <LocationInput onLocationChange={handleLocationChange} setIsValidLocation={setIsValidLocation} />
    );

    const latitudeInput = container.querySelector('[data-test-id="latitude-input"]');
    const longitudeInput = container.querySelector('[data-test-id="longitude-input"]');

    fireEvent.change(latitudeInput as Element, { target: { value: "60.1699" } });
    fireEvent.change(longitudeInput as Element, { target: { value: "24.9384" } });

    expect(handleLocationChange).toHaveBeenCalledWith(60.1699, 24.9384);
    expect(setIsValidLocation).toHaveBeenCalledWith(true); // Ensure validity is updated
  });
});
