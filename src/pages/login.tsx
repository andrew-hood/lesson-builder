import Head from 'next/head'
import Link from 'next/link'
import PocketBase from 'pocketbase'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

const redirectUrl = 'http://localhost:3000/api/auth/'

function Login({ providers = [] }) {
  return (
    <>
      <Head>
        <title>Sign In - TaxPal</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-3">
            {providers.map((provider: any) => (
              <div key={provider.name}>
                <a
                  href={provider.authUrl + redirectUrl + provider.name}
                  className="inline-flex w-full justify-center rounded-md border bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  <span>Sign in with {provider.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const pb = new PocketBase('https://go1-store.fly.dev')
  const authMethods = await pb.collection('users').listAuthMethods()

  return {
    props: {
      providers: authMethods.authProviders,
    },
  }
}

export default Login
