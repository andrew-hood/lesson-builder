export const getRandomImage = async (topic: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${topic}&client_id=${process.env.UNSPLASH_API_KEY}`,
      { method: 'GET' }
    )
    const result = await response.text()
    return JSON.parse(result)
  } catch (err) {
    console.error(err)
    return {
      urls: {
        regular: '',
      },
    }
  }
}
