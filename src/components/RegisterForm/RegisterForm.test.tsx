import { beforeAll, describe, expect, it, vi } from "vitest";
import RegisterForm from "./RegisterForm";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

vi.mock("axios");

describe("Register Form Component", () => {
  beforeAll(() => {
    window.alert = vi.fn();
  });

  it("render the form", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    expect(getByLabelText(/name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  it("show validation empty fields errors", async () => {
    const { getByText } = render(<RegisterForm />);

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/Name is required/i)).toBeInTheDocument();
    expect(getByText(/Email is required/i)).toBeInTheDocument();
    expect(getByText(/Phone number is required/i)).toBeInTheDocument();
  });

  it("show validation email format errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Johnny D" },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example" },
    });

    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "09876543213" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/Email is invalid/i)).toBeInTheDocument();
  });

  it("show validation phone number errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Johnny D" },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@gmail.com" },
    });

    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "09876543213" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(
      getByText(/Invalid phone number, should be 10 digits/i)
    ).toBeInTheDocument();
  });

  it("triggers handleBlur and shows error when field is blurred", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    const emailInput = getByLabelText(/email/i);

    // Blur without entering a value
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it("shows alert when API call fails", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    // Mock axios.post to reject
    vi.mocked(axios.post).mockRejectedValueOnce(new Error("Network error"));

    // Fill in valid form values
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Johnny D" },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@gmail.com" },
    });

    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "0987654321" },
    });

    fireEvent.click(getByText(/submit/i));

    // Wait for alert to be called
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Register fail");
    });
  });

  it("shows alert if response.data is missing", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    // Mock axios.post to resolve but with no data
    vi.mocked(axios.post).mockResolvedValueOnce({ data: null });

    // Fill in valid form values
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Johnny D" },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@gmail.com" },
    });

    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "0987654321" },
    });

    fireEvent.click(getByText(/submit/i));

    // Wait for the catch block to run
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Register fail");
    });
  });

  it("submits form successfully", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    const mockResponse = {
      data: {
        name: "Johnny D",
        email: "johndoe@gmail.com",
        phoneNumber: "0987654321",
      },
    };

    vi.mocked(axios.post).mockResolvedValue(mockResponse);
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Johnny D" },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@gmail.com" },
    });

    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "0987654321" },
    });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users",
        {
          name: "Johnny D",
          email: "johndoe@gmail.com",
          phoneNumber: "0987654321",
        }
      );
    });
  });
});
