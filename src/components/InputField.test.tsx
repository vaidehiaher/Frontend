import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./InputField";

test("renders label and associates it with input", () => {
  render(<InputField label="Name" placeholder="Enter your name" helperText="Help msg" />);
  const input = screen.getByRole("textbox", { name: /name/i });
  expect(input).toBeInTheDocument();
});

test("shows error message and sets aria-invalid", () => {
  render(<InputField label="Email" invalid errorMessage="Invalid email" />);
  const input = screen.getByRole("textbox", { name: /email/i });
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("alert")).toHaveTextContent(/invalid email/i);
});

test("calls onChange when user types", async () => {
  const user = userEvent.setup(); // works if updated
  const handleChange = jest.fn();
  render(<InputField label="Name" onChange={handleChange} />);
  const input = screen.getByRole("textbox", { name: /name/i });
  await user.type(input, "Alice");
  expect(handleChange).toHaveBeenCalled();
});
