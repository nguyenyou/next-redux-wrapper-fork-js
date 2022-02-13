import Nav from 'components/nav'

export default function Two() {
  return (
    <div>
      <Nav />
      <div>Two - getStaticProps</div>
    </div>
  )
}

export async function getStaticProps() {
  console.log('Two.getStaticProps')
  return {
    props: {
      title: 'two',
    },
  }
}
