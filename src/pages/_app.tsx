import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import { CartCtx } from '@store'
import { SWRConfig } from 'swr'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Provider session={pageProps.session}>
        <CartCtx>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </CartCtx>
      </Provider>
    </SWRConfig>
  )
}

export default MyApp
