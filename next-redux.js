import { useEffect, useMemo, useRef } from 'react'

export const HYDRATE = '__NEXT_REDUX_WRAPPER_HYDRATE__'

const getIsServer = () => typeof window === 'undefined'

let sharedClientStore

const initStore = ({ makeStore, context = {} }) => {
  const createStore = () => makeStore(context)

  if (getIsServer()) {
    const req = context?.req || context?.ctx?.req
    if (req) {
      if (!req.__nextReduxWrapperStore) {
        req.__nextReduxWrapperStore = createStore()
      }
      return req.__nextReduxWrapperStore
    }

    return createStore()
  }

  if (!sharedClientStore) {
    sharedClientStore = createStore()
  }

  return sharedClientStore
}

export const createWrapper = (makeStore) => {
  const makeProps = async ({ context, callback }) => {
    const store = initStore({ makeStore, context })
    const nextCallback = callback && callback(store)
    const initialProps = (nextCallback && (await nextCallback(context))) || {}
    const initialState = store.getState()
    return {
      initialProps,
      initialState,
    }
  }

  const getServerSideProps = (callback) => async (context) => await getProps(callback)(context)

  const getStaticProps = (callback) => async (context) => await getProps(callback)(context)

  const getProps = (callback) => async (context) => {
    const { initialProps, initialState } = await makeProps({ context, callback })
    return {
      ...initialProps,
      props: {
        ...initialProps.props,
        initialState,
      },
    }
  }

  const getInitialAppProps = (callback) => async (context) => {
    const { initialProps, initialState } = await makeProps({ context, callback })
    return {
      ...initialProps,
      initialState,
    }
  }

  const hydrate = (state, store) => {
    if (!state) return

    store.dispatch({
      type: HYDRATE,
      payload: state,
    })
  }

  const useHybridHydrate = (store, state) => {
    const firstRender = useRef(true)

    useEffect(() => {
      firstRender.current = false
    }, [])

    useMemo(() => {
      if (getIsServer() || firstRender.current) {
        hydrate(store, state)
      }
    }, [store, state])

    useEffect(() => {
      if (!getIsServer()) {
        hydrate(store, state)
      }
    }, [store, state])
  }

  const useWrappedStore = ({ initialState, initialProps, ...props }) => {
    const initialStateFromGSPorGSSP = props?.pageProps?.initialState

    const store = useMemo(() => initStore({ makeStore }), [])

    useHybridHydrate(store, initialState)
    useHybridHydrate(store, initialStateFromGSPorGSSP)

    let resultProps

    if (initialProps && initialProps.pageProps) {
      resultProps.pageProps = {
        ...initialProps.pageProps,
        ...props.pageProps,
      }
    }

    if (initialStateFromGSPorGSSP) {
      resultProps = { ...props, pageProps: { ...props.pageProps } }
      delete resultProps.pageProps.initialState
    }

    if (resultProps?.pageProps?.initialProps) {
      resultProps.pageProps = { ...resultProps.pageProps, ...resultProps.pageProps.initialProps }
      delete resultProps.pageProps.initialProps
    }

    return { store, props: { ...initialProps, ...resultProps } }
  }

  return {
    getServerSideProps,
    getStaticProps,
    getInitialAppProps,
    useWrappedStore,
  }
}
