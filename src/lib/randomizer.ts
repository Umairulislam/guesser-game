// Maximum number for the guessing game
export const MAX_NUM = 5

// Maximum number for the guessing game
export const getRandomValue = () => {
  if (import.meta.env.MODE === "e2e") return "3"
  return (Math.floor(Math.random() * MAX_NUM) + 1).toString()
}
