import App from 'next/app'
import { Provider } from 'react-redux'
import { makeStore } from 'store'
import 'styles/globals.css'

const hasWindow = () => typeof window !== 'undefined'
const IS_SERVER = !hasWindow()

export default function MyApp({ Component, pageProps }) {
  const store = makeStore()
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const { pageProps } = await App.getInitialProps(appContext)

  console.log('App.getInitialProps', pageProps)

  return {
    pageProps: {
      ...(await App.getInitialProps(appContext)).pageProps,
    },
  }
}
