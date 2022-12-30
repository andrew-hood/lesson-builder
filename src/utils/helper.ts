import defaultAvatar from '@/images/background-features.jpg'

export const uniqueId = (length = 15) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  )
}

export const getImagePath = (id, image) => {
  if (image) {
    return `https://go1-store.fly.dev/api/files/users/${id}/${image}`
  }
  return defaultAvatar
}

export const safeStringify = (obj: any, indent = 2) => {
  let cache: any = []
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === 'object' && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  )
  cache = null
  return JSON.parse(retVal)
}
