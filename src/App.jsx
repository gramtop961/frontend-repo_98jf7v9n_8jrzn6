import { useEffect, useState } from 'react'
import { Search, Star, Ticket } from 'lucide-react'
import Hero from './components/Hero'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const t = localStorage.getItem('mv_token')
    if (t) setToken(t)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      const data = await res.json()
      setToken(data.access_token)
      localStorage.setItem('mv_token', data.access_token)
    } else {
      alert('Login failed')
    }
  }

  const searchTMDb = async () => {
    // Public demo using TMDb trending via our backend proxy (to be added later). For now, mock minimal list.
    const sample = [
      { id: 603692, title: 'John Wick: Chapter 4', poster_path: 'https://image.tmdb.org/t/p/w342//vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', rating: 8.2 },
      { id: 76600, title: 'Avatar: The Way of Water', poster_path: 'https://image.tmdb.org/t/p/w342//t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', rating: 7.6 },
    ]
    setMovies(sample)
  }

  const addReview = async (movieId) => {
    const rating = parseInt(prompt('Rate 1-5') || '5', 10)
    const comment = prompt('Your comment') || ''
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ movie_id: movieId, rating, comment })
    })
    if (res.ok) {
      alert('Review posted')
    } else {
      alert('Please login to post review')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-10" id="explore">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search movies..." className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-3 placeholder-white/60 focus:outline-none" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
          </div>
          <button onClick={searchTMDb} className="px-4 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500">Search</button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {movies.map(m => (
            <div key={m.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
              <img src={m.poster_path} alt={m.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{m.title}</h3>
                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm">{m.rating}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => addReview(m.id)} className="text-sm px-3 py-1.5 rounded bg-indigo-600">Review</button>
                  <button className="text-sm px-3 py-1.5 rounded bg-white/10 border border-white/20 flex items-center gap-1">
                    <Ticket size={16} /> Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/10" id="auth">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="grid sm:grid-cols-3 gap-3">
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="bg-white/10 border border-white/10 rounded-md px-3 py-2" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="bg-white/10 border border-white/10 rounded-md px-3 py-2" />
          <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Sign in</button>
        </form>
        <p className="text-white/60 text-sm mt-2">Use the register API to create an account first.</p>
      </section>
    </div>
  )
}

export default App
