import { test, expect } from "@playwright/test"

test.describe("Guesser game", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto("/")
  })

  test("should display the initial prompt message when first rendered", async ({
    page,
  }) => {
    // Verify headline
    await expect(
      page.getByRole("heading", {
        name: /guess the number/i,
      }),
    ).toBeVisible()
    // Verify initial message
    await expect(
      page.getByRole("heading", {
        name: /guess an integer between 1 and/i,
      }),
    ).toBeVisible()
  })

  test("should display the success message when the correct number is guessed", async ({
    page,
  }) => {
    // Type guess and submit
    await page.getByTestId("guessInput").fill("3")
    await page.getByTestId("submitBtn").click()
    // Verify success message
    await expect(
      page.getByRole("heading", { name: /congratulations! Great guess/i }),
    ).toBeVisible()
  })

  test("should display the failure message when an incorrect number is guessed", async ({
    page,
  }) => {
    // Type guess and submit
    await page.getByTestId("guessInput").fill("5")
    await page.getByTestId("submitBtn").click()
    // Verify failure message
    await expect(
      page.getByRole("heading", { name: /Wrong guess ❌. The random/i }),
    ).toBeVisible()
    // Verify try again button
    await expect(page.getByTestId("tryagainBtn")).toBeVisible()
    // Verify input is disabled
    await expect(page.getByTestId("guessInput")).toBeDisabled()
  })

  test("should reset the ui when try again button is clicked", async ({
    page,
  }) => {
    // Type guess and submit
    await page.getByTestId("guessInput").fill("5")
    await page.getByTestId("submitBtn").click()
    // Click try again button
    await page.getByTestId("tryagainBtn").click()
    // Verify initial message
    await expect(
      page.getByRole("heading", {
        name: /guess an integer between 1 and/i,
      }),
    ).toBeVisible()
  })
})
