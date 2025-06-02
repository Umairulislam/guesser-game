import { expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import * as matchers from "@testing-library/jest-dom/matchers"
import "@testing-library/jest-dom"

// Extend Vitest's 'expect' function with custom matchers from jest-dom
// This allows you to use assertions like 'toBeInTheDocument', 'toHaveTextContent', etc.
expect.extend(matchers)

// Run the 'cleanup' function after each test
// This ensures no leftover elements in the DOM that could affect other tests
afterEach(() => {
  cleanup()
})
