import type { NextApiRequest, NextApiResponse } from 'next'
import PocketBase from 'pocketbase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { provider, code, state } = req.query
  console.log(req.query)

  const pb = new PocketBase('https://go1-store.fly.dev')
  const authMethods = await pb.collection('users').listAuthMethods()

  const authProvider = authMethods.authProviders.find(
    (auth) => auth.name === provider
  )
  if (!authProvider) {
    throw new Error('Unable to find provider')
  }

  try {
    const authData = await pb.collection('users').authWithOAuth2(
      authProvider?.name,
      code as string,
      authProvider.codeVerifier,
      `http://localhost:3000/api/auth/${provider}`,
      // pass optional user create data
      {
        emailVisibility: false,
        available_lessons: 10,
      }
    )
    console.log(authData)
    pb.collection('users').update(authData.record.id, {
      name: authData.meta?.name,
      avatar: authData.meta?.avatarUrl,
    })

    res?.setHeader('set-cookie', pb.authStore.exportToCookie())
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.redirect(`/login?error=${err.message}`)
  }
}
