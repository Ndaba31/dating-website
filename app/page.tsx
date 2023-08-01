import Image from 'next/image'
import Hero from './components/Hero'
import FeaturedBeauties from './components/FeaturedBeauties'

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedBeauties />
    </main>
  )
}
