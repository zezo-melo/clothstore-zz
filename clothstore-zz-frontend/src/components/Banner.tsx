import { Typewriter } from 'react-simple-typewriter'
import bannerImage from '../assets/background.png'

export default function Banner() {
  return (
    <section className="bg-cover bg-top text-center py-40 px-4"
    style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <h2 className="text-5xl font-bold text-gray-100 mb-10">
      The new collection by
      </h2>
      <h1 className="text-7xl font-bold text-white mb-10 bg-black w-xl py-5 px-10 mx-auto">
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
      <p className="text-3xl font-medium text-gray-100 mb-16">
        Style and comfort for your everyday hustle.
      </p>
      <a href="/produtos" className="bg-black text-white px-6 py-4 hover:bg-gray-800 transition">
        View Products →
      </a>
    </section>
  )
}
