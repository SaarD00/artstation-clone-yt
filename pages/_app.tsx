import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </SessionProvider>
  )
}

export default MyApp
