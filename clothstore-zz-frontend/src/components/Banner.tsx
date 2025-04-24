import { Typewriter } from 'react-simple-typewriter'
import bannerImage from '../assets/background.png'

export default function Banner() {
  return (
    <section
      className="bg-cover bg-top text-center py-32 px-4"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-6">
        The new collection by
      </h2>

      <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 bg-black max-w-xl w-full py-5 px-4 mx-auto overflow-hidden break-words">
        <Typewriter
          words={['zZ ClothStore']}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={10}
          delaySpeed={3500}
        />
      </h1>

      <p className="text-md md:text-2xl font-medium text-gray-100 mb-10">
        Style and comfort for your everyday hustle.
      </p>

      <a
        href="/products"
        className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
      >
        View Products →
      </a>
    </section>
  )
}
