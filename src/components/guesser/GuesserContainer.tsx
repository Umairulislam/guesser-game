import GuesserActions from "./GuesserActions"
import GuesserDisplay from "./GuesserDisplay"

const GuesserContainer = () => {
  return (
    <div className="flex flex-col gap-6">
      <GuesserDisplay />
      <GuesserActions />
    </div>
  )
}

export default GuesserContainer
