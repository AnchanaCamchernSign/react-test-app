import { beforeEach, describe, it, expect } from "vitest";
import Counter from "./Counter";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Counter Component", () => {
    beforeEach(() => {
        render(<Counter />)
    })

    it("should render counter", () => {
        expect(screen.getByText(/Counter:/)).toBeInTheDocument()
    })

    it("increments counter", () => {
        fireEvent.click(screen.getByText("Increment"))
        expect(screen.getByText("Counter: 1")).toBeInTheDocument()
    })

    it("decrement render counter", () => {
        fireEvent.click(screen.getByText("Decrement"))
        expect(screen.getByText("Counter: -1")).toBeInTheDocument()
    })

    it("clear the render counter", () => {
        fireEvent.click(screen.getByText("Clear"))
        expect(screen.getByText("Counter: 0")).toBeInTheDocument()
    })
})