export const getUsersCount = async () => {
  const resp = await fetch("https://api.randomuser.me?results=20&seed=abc")
  const data = await resp.json()
  return data.info.results as number
}
