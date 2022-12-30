import React from 'react'
import { Container } from '@/components/Container'
import { Generator } from '@/components/dashboard/Generator'
import { Layout } from '@/components/dashboard/Layout'
import { Table } from '@/components/dashboard/Table'
import { trpc } from '@/utils/trpc'

function DashboardPage() {
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
            <Generator currentUser={currentUser} />
          </Container>
        </div>
        <Container className="py-8">
          <Table />
        </Container>
      </>
    </Layout>
  )
}

export default DashboardPage
