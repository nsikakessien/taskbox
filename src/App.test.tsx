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
    fireEvent.change(inputElement, { target: { value: task } });
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

  it("Test that a task deletes when the delete icon is clicked", async () => {
    render(<App />);
    addTasks(["sleep"]);
    const deletedText = screen.getByText("sleep");
    const spanElement = screen.getByTestId("deleted");
    fireEvent.click(spanElement);
    expect(deletedText).not.toBeInTheDocument();
  });

  it("Test that a task edits when the edit button is clicked", async () => {
    render(<App />);
    addTasks(["sleep"]);
    const editIcon: HTMLSpanElement = screen.getByTestId("edited");
    fireEvent.click(editIcon);
    const inputElement: HTMLInputElement = screen.getByTestId("input-block");
    fireEvent.change(inputElement, { target: { value: "no sleep" } });
    fireEvent.submit(inputElement);
    const spanElement: HTMLSpanElement = screen.getByTestId("text");
    expect(spanElement.textContent).toBe("no sleep");
  });
});
