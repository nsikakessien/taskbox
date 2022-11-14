import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../InputField";

const mockedRequest = jest.fn();

describe("Input Field Component", () => {
  it("Test the search box takes input", async () => {
    render(<InputField todos={[]} setTodos={mockedRequest} />);
    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText(/Enter a Task/i);
    fireEvent.change(inputElement, { target: { value: "Sleep" } });
    expect(inputElement.value).toBe("Sleep");
  });

  it("Test the search box clears after button is clicked", async () => {
    render(<InputField todos={[]} setTodos={mockedRequest} />);
    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText(/Enter a Task/i);
    fireEvent.change(inputElement, { target: { value: "Sleep" } });
    const buttonElement: HTMLButtonElement = screen.getByRole("button", {
      name: /Add/i,
    });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});
