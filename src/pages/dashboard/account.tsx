import { Container } from '@/components/Container'
import { Layout } from '@/components/dashboard/Layout'
import { trpc } from '@/utils/trpc'
import React from 'react'

function AccountPage() {
  const { data: currentUser } = trpc.currentUser.useQuery()

  return !currentUser ? (
    <></>
  ) : (
    <Layout currentUser={currentUser}>
      <>
        <div className="border-b border-slate-200 bg-white">
          <Container className="py-16">
            <h1 className="mb-3 text-3xl tracking-tight">
              Hello, {(currentUser as any)?.name}
            </h1>
          </Container>
        </div>
        <Container className="py-8"></Container>
      </>
    </Layout>
  )
}

export default AccountPage
