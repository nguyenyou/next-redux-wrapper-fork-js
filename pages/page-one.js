import Nav from 'components/nav'
import { useSelector } from 'react-redux'

export default function One() {
  const value = useSelector((state) => state.counter.value)

  return (
    <div>
      <Nav />
      <div>One - getServerSideProps</div>
      <div id='count'>{value}</div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      title: 'one',
    },
  }
}
