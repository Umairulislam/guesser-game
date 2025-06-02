import { getRandomValue } from "@/lib/randomizer"
import { type PropsWithChildren, createContext, useReducer } from "react"

// Type definition for the state managed by the reducer
type State = {
  randomValue: string
  state: "idle" | "success" | "failure"
}

// Type definition for the state managed by the reducer
const initialState: State = {
  randomValue: getRandomValue(),
  state: "idle",
}

// Type definition for actions that can be dispatched to the reducer
type Actions =
  | { type: "guessValue"; payload: string }
  | { type: "randomizeValue" }

// Type for the context value, combining state and action methods
type GuessContext = State & {
  guessValue: (value: string) => void
  randomizeValue: () => void
}

// Creating the context with default values
export const GuesserContext = createContext<GuessContext>({
  randomValue: "",
  state: "idle",
  guessValue: () => {},
  randomizeValue: () => {},
})

// Reducer function that handles state transitions based on actions
const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "randomizeValue":
      return {
        ...state,
        randomValue: getRandomValue(),
        state: "idle",
      }

    case "guessValue":
      return {
        ...state,
        state: action.payload === state.randomValue ? "success" : "failure",
      }

    default:
      break
  }

  return state
}

// Provider component that makes the context available to child components
export const GuesserContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GuesserContext.Provider
      value={{
        ...state,
        guessValue(val: string) {
          dispatch({ type: "guessValue", payload: val })
        },
        randomizeValue() {
          dispatch({ type: "randomizeValue" })
        },
      }}
    >
      {children}
    </GuesserContext.Provider>
  )
}
