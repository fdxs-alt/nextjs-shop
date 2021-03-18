import { Layout } from '@components'
import { useSession } from 'next-auth/client'
import React from 'react'

const Account = () => {
  const [session, loading] = useSession()
  return <Layout isWithNavbar={true} title="My account"></Layout>
}

export default Account
