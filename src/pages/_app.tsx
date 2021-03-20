import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import { CartCtx } from '@store'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <CartCtx>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CartCtx>
    </Provider>
  )
}

export default MyApp
