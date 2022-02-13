import Nav from 'components/nav'

export default function Three() {
  return (
    <div>
      <Nav />
      <div>Three - getInitialProps</div>
    </div>
  )
}

Three.getInitialProps = async () => {
  return {
    title: 'three',
  }
}
