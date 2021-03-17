import React from 'react'
import { Layout } from '@components'
import { useSession } from 'next-auth/client'

const Home: React.FC = (): JSX.Element => {
  const [session, loading] = useSession()
  return <Layout title="Home">{JSON.stringify(session)}</Layout>
}

export default Home
