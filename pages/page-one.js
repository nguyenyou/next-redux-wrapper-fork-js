import Nav from 'components/nav'
import { useSelector } from 'react-redux'
import { makeStore } from 'store'

export default function One() {
  const store = useSelector((state) => state)
  console.log(store, 'pageone-store')
  return (
    <div>
      <Nav />
      <div>One - getServerSideProps</div>
      <div id='count'>Count: {store.value}</div>
    </div>
  )
}

export async function getServerSideProps() {
  console.log('One.getServerSideProps')
  const store = makeStore()
  store.dispatch({ type: 'INCREMENT' })
  const initialState = store.getState()
  console.log(initialState, 'one - getserverSideProps')
  return {
    props: {
      title: 'one',
      initialState,
    },
  }
}
