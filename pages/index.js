import Nav from 'components/nav'
import { useDispatch, useSelector } from 'react-redux'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Home(props) {
  const dispatch = useDispatch()
  const globalState = useSelector((state) => state)
  console.log('Home', props)

  const incrementAsync = async () => {
    await sleep(1000)
    dispatch({ type: 'INCREMENT' })
  }

  const increment = () => {
    dispatch({ type: 'INCREMENT' })
  }

  return (
    <div>
      <Nav />
      <span id='count'>{globalState.value}</span>
      <button id='btn' onClick={increment}>
        increment
      </button>
      <button id='btn2' onClick={incrementAsync}>
        increment async
      </button>
    </div>
  )
}
