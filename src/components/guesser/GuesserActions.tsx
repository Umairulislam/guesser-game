import { GuesserContext } from "@/contexts/GuesserContext"
import { useContext, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { MAX_NUM } from "@/lib/randomizer"

const GuesserActions = () => {
  const { guessValue, randomizeValue, state } = useContext(GuesserContext)

  useEffect(() => {
    randomizeValue()
  }, [])

  return (
    <form
      className="flex flex-col items-center gap-4 text-center"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const guessInputEl = form.elements.namedItem(
          "guess",
        ) as HTMLInputElement
        guessValue(guessInputEl.value)
        form.reset()
      }}
    >
      <Input
        data-testid="guessInput"
        className="max-w-56 mx-auto border border-gray-500"
        name="guess"
        type="number"
        min={1}
        max={MAX_NUM}
        placeholder="type your guess here.."
        aria-label="type your guess here"
        disabled={state !== "idle"}
        required
      />
      {state === "idle" ? (
        <Button data-testid="submitBtn">Submit</Button>
      ) : (
        <Button
          data-testid="tryagainBtn"
          onClick={(e) => {
            e.preventDefault()
            randomizeValue()
          }}
        >
          Try again
        </Button>
      )}
    </form>
  )
}

export default GuesserActions
