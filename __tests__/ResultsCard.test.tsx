import React from "react";
import { render } from "@testing-library/react";
import { ResultsCard } from "../src/components/ResultsCard";

describe("ResultsCard Component", () => {
  const mockResults = {
    cartValue: 2000,
    smallOrderSurcharge: 500,
    deliveryFee: 300,
    deliveryDistance: 5000,
    totalPrice: 2800,
  };

  test("renders error message if error exists", () => {
    const { container } = render(<ResultsCard results={null} error="Test error message" />);

    const errorMessage = container.querySelector('[role="alert"]');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage?.textContent).toBe("Test error message");
  });

  test("renders delivery details when results exist", () => {
    const { container } = render(<ResultsCard results={mockResults} error={null} />);

    const cartValue = container.querySelector('[data-raw-value="2000"]');
    const smallOrderSurcharge = container.querySelector('[data-raw-value="500"]');
    const deliveryFee = container.querySelector('[data-raw-value="300"]');
    const totalPrice = container.querySelector('[data-raw-value="2800"]');

    expect(cartValue).toBeInTheDocument();
    expect(smallOrderSurcharge).toBeInTheDocument();
    expect(deliveryFee).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
  });
});
