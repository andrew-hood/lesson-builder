export const getRandomImage = async (topic: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${topic}&client_id=${process.env.UNSPLASH_API_KEY}`,
      { method: 'GET' }
    )
    const result = await response.text()
    const data = JSON.parse(result)
    return { url: data.urls.regular, credit: data.user.name }
  } catch (err) {
    console.error(err)
    return { url: '', credit: '' }
  }
}
