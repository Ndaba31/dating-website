import Image from 'next/image'
import Hero from './components/Hero'
import FeaturedBeauties from './components/FeaturedBeauties'

export default function Home() {
  return (
    <main>
      <Hero />

      <FeaturedBeauties />

      {/* Dive into the Heart of Desire */}
      <div className="py-6 px-8 md:py-10">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 pr-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              Dive into the Heart of Desire
            </h2>
          </div>
          <div className="md:w-1/2 pl-0 md:pl-8">
            <p className="text-lg md:text-xl lg:text-2xl text-yellow-500">
              Find your ultimate match on Tycoon’s Pact, where sultry black women set fire to your fantasies.
              Get ready to experience a modern dating utopia where passion knows no bounds.
            </p>
          </div>
        </div>
      </div>
      {/* Dive into the Heart of Desire */}


    </main>
  )
}
