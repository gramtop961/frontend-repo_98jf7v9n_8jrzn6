import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">MovieVerse</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">Discover movies, share reviews, and book seats with a futuristic, immersive feel.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#explore" className="px-5 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">Explore Movies</a>
            <a href="#book" className="px-5 py-2.5 rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition">Book Tickets</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </section>
  );
}
