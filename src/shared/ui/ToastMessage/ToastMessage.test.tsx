import { render, act, screen } from "@testing-library/react";
import ToastMessage from "./ToastMessage";

describe("ToastMessage component", () => {
  test("renders with provided message and shows/hides correctly", async () => {
    jest.useFakeTimers();

    const { rerender, getByTestId } = render(<ToastMessage />);
    expect(getByTestId("toast")).not.toHaveClass("show");

    rerender(<ToastMessage message="Test Message" />);
    expect(screen.getByTestId("toast")).toHaveClass("show");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("toast")).not.toHaveClass("show");

    jest.useRealTimers();
  });
});
