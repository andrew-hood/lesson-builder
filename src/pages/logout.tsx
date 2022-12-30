import { initPocketBase } from '@/services/pocketbase'
import React from 'react'

function LogoutPage() {
  return <div>LogoutPage</div>
}

export async function getServerSideProps({ req, res }) {
  const pb = await initPocketBase(req, res)
  pb.authStore.clear()

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export default LogoutPage
