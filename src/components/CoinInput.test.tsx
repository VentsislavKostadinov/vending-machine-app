import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CoinInput } from "./CoinInput";
import { CoinInputProps } from "../model/CoinInput";
import { denominations } from "../utils/denominations";

describe("CoinInput Component", () => {
  const mockOnInsert = jest.fn();

  const renderComponent = (props: Partial<CoinInputProps> = {}) => {
    const defaultProps: CoinInputProps = {
      onInsert: mockOnInsert,
      coins: 0,
      ...props,
    };
    return render(<CoinInput {...defaultProps} />);
  };

  beforeEach(() => {
    mockOnInsert.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render the Insert Coins headline", () => {
    renderComponent();
    expect(screen.getByText("Insert Coins")).toBeInTheDocument();
  });

  it("should render all denomination buttons", () => {
    renderComponent();
    denominations.forEach((denomination) => {
      expect(screen.getByText(denomination.toFixed(2))).toBeInTheDocument();
    });
  });

  it("should call onInsert with the correct denomination when a button is clicked", () => {
    renderComponent();
    denominations.forEach((denomination) => {
      mockOnInsert.mockClear();
      const button = screen.getByText(denomination.toFixed(2));
      fireEvent.click(button);
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(mockOnInsert).toHaveBeenCalledWith(denomination);
    });
  });

  it("should call onInsert the correct number of times when buttons are clicked", () => {
    renderComponent();
    denominations.forEach((denomination) => {
      const button = screen.getByText(denomination.toFixed(2));
      fireEvent.click(button);
      act(() => {
        jest.advanceTimersByTime(500);
      });
    });
    expect(mockOnInsert).toHaveBeenCalledTimes(denominations.length);
  });
});
