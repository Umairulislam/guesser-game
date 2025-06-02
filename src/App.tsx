import GuesserContainer from "./components/guesser/GuesserContainer"
import { GuesserContextProvider } from "./contexts/GuesserContext"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-foreground text-background">
      <h1 data-testid="headline" className="text-3xl">
        Guess the number
      </h1>
      <div className="card">
        <GuesserContextProvider>
          <GuesserContainer />
        </GuesserContextProvider>
      </div>
    </div>
  )
}

export default App
