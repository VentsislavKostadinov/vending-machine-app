import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { VendingMachine } from "./VendingMachine";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { ProductProps } from "../model/Products";

jest.mock("../hooks/useFetchProducts");

const mockProducts: ProductProps[] = [
  { id: 1, name: "Soda", price: 1.25, quantity: 10 },
  { id: 2, name: "Chips", price: 1.0, quantity: 5 },
];

describe("VendingMachine Component", () => {
  beforeEach(() => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null,
    });
    window.alert = jest.fn();
  });

  test("renders products", async () => {
    render(<VendingMachine />);

    const sodaElements = await screen.findAllByText("Soda");
    const chipsElements = await screen.findAllByText("Chips");

    expect(sodaElements.length).toBeGreaterThan(0);
    expect(chipsElements.length).toBeGreaterThan(0);

    const sodaProduct = sodaElements.find((element) =>
      element.closest(".list-group-item")
    );
    const chipsProduct = chipsElements.find((element) =>
      element.closest(".list-group-item")
    );

    expect(sodaProduct).toBeInTheDocument();
    expect(chipsProduct).toBeInTheDocument();
  });

  test("renders products and handles product selection", async () => {
    render(<VendingMachine />);

    // Check that products are rendered
    const sodaElements = await screen.findAllByText("Soda");
    const chipsElements = await screen.findAllByText("Chips");
    expect(sodaElements.length).toBeGreaterThan(0);
    expect(chipsElements.length).toBeGreaterThan(0);

    const coinButton = screen.getByText("0.25");
    for (let i = 0; i < 5; i++) {
      fireEvent.click(coinButton);
    }

    const selectButtons = screen.getAllByText("Select");
    const sodaSelectButton = selectButtons.find((button) =>
      button.closest(".list-group-item")?.textContent?.includes("Soda")
    );

    if (sodaSelectButton) {
      fireEvent.click(sodaSelectButton);

      expect(window.alert).toHaveBeenCalledWith("Product bought successfully");

      await waitFor(() => {
        const quantityElements = screen.getAllByText((_, element: any) => {
          return element?.textContent.includes("9 left");
        });
        const quantityElement = quantityElements.find((element) =>
          element.closest(".list-group-item")?.textContent?.includes("Soda")
        );
        expect(quantityElement).toBeInTheDocument();
      });
    }
  });

  test("handles insufficient coins", async () => {
    render(<VendingMachine />);

    const sodaElements = await screen.findAllByText("Soda");
    const chipsElements = await screen.findAllByText("Chips");
    expect(sodaElements.length).toBeGreaterThan(0);
    expect(chipsElements.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText("0.25"));
    fireEvent.click(screen.getByText("0.25"));

    const selectButtons = screen.getAllByText("Select");
    const sodaSelectButton = selectButtons.find((button) => {
      const listItem = button.closest(".list-group-item");
      return listItem ? listItem.textContent?.includes("Soda") : false;
    });
    if (sodaSelectButton) {
      fireEvent.click(sodaSelectButton);

      expect(global.alert).toHaveBeenCalledWith("Not enough coins");
    } else {
      throw new Error("Soda select button not found");
    }
  });

  test("handles product deletion", async () => {
    render(<VendingMachine />);

    const sodaElements = await screen.findAllByText("Soda");
    const chipsElements = await screen.findAllByText("Chips");
    expect(sodaElements.length).toBeGreaterThan(0);
    expect(chipsElements.length).toBeGreaterThan(0);

    fireEvent.change(screen.getByTestId("delete-product-dropdown"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByTestId("delete-product-dropdown"));

    expect(screen.queryByText("Soda")).not.toBeInTheDocument();
  });
});
