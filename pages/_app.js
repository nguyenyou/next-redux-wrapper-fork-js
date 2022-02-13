import { Provider } from 'react-redux'
import { wrapper } from 'store'
import { ChakraProvider } from '@chakra-ui/react'

import 'styles/globals.css'

export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...props.pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
