import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import GuesserContainer from "./GuesserContainer"
import type { ReactNode } from "react"
import { GuesserContextProvider } from "@/contexts/GuesserContext"

// Mock the randomizer to always return 3
vi.mock("@/lib/randomizer", () => {
  return {
    MAX_NUM: 5,
    getRandomValue: vi.fn(() => "3"),
  }
})

// Helper function to render component with context
const renderWithContext = (component: ReactNode) => {
  render(<GuesserContextProvider>{component}</GuesserContextProvider>)
}

// Helper function to guess a number
const guessNumber = (val: string) => {
  // Get elements
  const guessInputEl = screen.getByRole("spinbutton", {
    name: /type your guess here/i,
  })
  const submitBtnEl = screen.getByRole("button", {
    name: /submit/i,
  })
  // Perform action
  act(() => {
    fireEvent.change(guessInputEl, {
      target: { value: val },
    })
  })
  act(() => {
    fireEvent.click(submitBtnEl)
  })
}

describe("GuesserContainer component", () => {
  beforeEach(() => {
    renderWithContext(<GuesserContainer />)
  })

  it("should display the initial prompt message when first rendered", () => {
    // Verify initial message
    expect(
      screen.getByText(/guess an integer between 1 and/i),
    ).toBeInTheDocument()
  })

  it("should display the success message when the correct number is guessed", async () => {
    guessNumber("3")
    // Verify result
    await waitFor(() => {
      expect(
        screen.getByText(
          /congratulations! Great guess ✅ The random number was/i,
        ),
      ).toBeInTheDocument()
    })
  })

  it("should display the failure message when an incorrect number is guessed", async () => {
    guessNumber("4")
    // Verify result
    await waitFor(() => {
      expect(
        screen.getByText(/wrong guess ❌. The random number was/i),
      ).toBeInTheDocument()
    })
    // Verify try again button
    expect(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    ).toBeInTheDocument()
    // Verify input is disabled
    expect(
      screen.getByRole("spinbutton", {
        name: /type your guess here/i,
      }),
    ).toBeDisabled()
  })

  it("should reset the ui when try again button is clicked", async () => {
    guessNumber("4")
    // Verify result
    await waitFor(() => {
      expect(
        screen.getByText(/wrong guess ❌. The random number was/i),
      ).toBeInTheDocument()
    })
    // Click try again button
    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /try again/i,
        }),
      )
    })
    // Verify initial message
    expect(
      screen.getByText(/guess an integer between 1 and/i),
    ).toBeInTheDocument()
  })
})
