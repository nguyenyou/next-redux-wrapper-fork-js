import Nav from 'components/nav'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from 'store'
import { Button, Text, Stack, Box } from '@chakra-ui/react'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Home() {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.counter.value)

  const increseAsync = async () => {
    await sleep(1000)
    dispatch(increment())
  }

  const increse = () => {
    dispatch(increment())
  }

  return (
    <div>
      <Nav />
      <Box p={4}>
        <Text id='count'>{value}</Text>
        <Stack spacing={2} direction='row'>
          <Button id='btn' onClick={increse}>
            increment
          </Button>
          <Button id='btn2' onClick={increseAsync}>
            increment async
          </Button>
        </Stack>
      </Box>
    </div>
  )
}
