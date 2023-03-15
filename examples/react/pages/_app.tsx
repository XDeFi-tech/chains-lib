import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ChainsContext,
  ChainsContextDefaultValue,
} from '../context/chains.context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChainsContext.Provider value={ChainsContextDefaultValue}>
      <Component {...pageProps} />
    </ChainsContext.Provider>
  )
}

export default MyApp
