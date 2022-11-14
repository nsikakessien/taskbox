import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

const addTasks = (tasks: string[]) => {
  const inputElement: HTMLInputElement =
    screen.getByPlaceholderText(/Enter a Task/i);
  const buttonElement: HTMLButtonElement = screen.getByRole("button", {
    name: /Add/i,
  });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: "Sleep" } });
    fireEvent.click(buttonElement);
  });
};

describe("Input Field Component", () => {
  it("Test that the task from the searchbox in the list", async () => {
    render(<App />);
    addTasks(["sleep", "brush", "swim"]);
    const divElements: HTMLFormElement[] =
      screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3);
  });

  it("Test that only completed task have a strikethrough", async () => {
    render(<App />);
    addTasks(["sleep"]);
    const spanElement = screen.getByTestId("completed");
    fireEvent.click(spanElement);
    const strikeText = screen.getByTestId("strike");
    expect(strikeText).toBeInTheDocument();
  });
});
