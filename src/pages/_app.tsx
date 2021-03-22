import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import { CartCtx } from '@store'
import { SWRConfig } from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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
