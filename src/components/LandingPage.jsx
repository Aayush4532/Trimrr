import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { FiLink, FiArrowRight, FiCopy, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { createShortUrl } from '../services/urlService'
import ParticlesBackground from '../components/ParticlesBackground'
import GlowEffect from '../components/GlowEffect'
import UrlList from '../components/UrlList'

export default function Home() {
  const { user } = useAuth()
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return
    
    setLoading(true)
    try {
      const data = await createShortUrl(url, user.id)
      setShortUrl(data.short_url)
      toast.success('Short URL created! Redirecting...', {
        position: 'bottom-center',
        style: {
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }
      })

      setTimeout(() => {
        window.location.href = data.original_url
      }, 2000)
    } catch (error) {
      console.error('Error creating short URL:', error)
      toast.error('Failed to create short URL', {
        position: 'bottom-center',
        style: {
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          backdropFilter: 'blur(10px)'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    toast.success('Copied to clipboard!', {
      position: 'bottom-center',
      style: {
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        backdropFilter: 'blur(10px)'
      }
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden relative"
    >
      <Toaster />
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"
      />
      
      <ParticlesBackground />
      
      {/* Enhanced Floating Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          return (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                y: `${Math.random() * 100}vh`,
                x: `${Math.random() * 100}vw`
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                y: `${(Math.random() * 100) - 50}vh`,
                x: `${(Math.random() * 100) - 50}vw`
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute rounded-full bg-white"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${size * 5}px ${size}px rgba(159, 122, 234, 0.5)`
              }}
            />
          )
        })}
      </div>

      {/* Enhanced Nebula Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600 blur-[120px]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [-50, 50, -50],
            y: [-30, 30, -30]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/3 w-96 h-96 rounded-full bg-cyan-600 blur-[150px]"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.6, 0.2],
            x: [0, 80, 0],
            y: [0, -60, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-indigo-600 blur-[100px]"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.1, 0.5, 0.1],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
        />
      </div>

      <div className="container mx-auto px-6 h-screen flex flex-col justify-center items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-16 w-full max-w-6xl"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-600 leading-tight"
            initial={{ opacity: 0, letterSpacing: '-0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0em' }}
            transition={{ delay: 0.3, duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.5 }}
            >
              Shorten Links
            </motion.span>
            <motion.span 
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 text-4xl md:text-6xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
            >
              Like Never Before
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 2 }}
          >
            Transform <span className="text-cyan-300 font-medium">long URLs</span> into <span className="text-purple-300 font-medium">sleek</span>, <span className="text-white font-semibold">cinematic</span> short links that <span className="text-white font-bold underline decoration-cyan-400">wow</span> your audience.
          </motion.p>
        </motion.div>

        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <form onSubmit={handleSubmit} className="relative mb-12">
            <GlowEffect visible={isFocused} />
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-1">
                <motion.div
                  animate={{
                    boxShadow: isFocused 
                      ? '0 0 0 3px rgba(165, 180, 252, 0.6), 0 0 40px rgba(129, 140, 248, 0.6)' 
                      : '0 0 0 1px rgba(255, 255, 255, 0.15)',
                    backdropFilter: isFocused ? 'blur(20px)' : 'blur(12px)',
                    background: isFocused 
                      ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)' 
                      : 'transparent'
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Paste your long URL here..."
                  className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-lg border-2 border-gray-700 rounded-xl py-6 px-8 text-xl focus:outline-none focus:ring-3 focus:ring-purple-500 transition-all duration-400 placeholder-gray-400"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-6 px-10 rounded-xl text-xl flex items-center justify-center gap-3 transition-all duration-400 shadow-2xl hover:shadow-3xl min-w-[180px] disabled:opacity-70 group"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-600"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                {loading ? (
                  <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Shortening...
                  </motion.span>
                ) : (
                  <>
                    Shorten
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={24} />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <AnimatePresence>
            {shortUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-12 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
                />
                <div className="flex items-center justify-between gap-4 relative z-10">
                  <a 
                    href={shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl text-cyan-400 hover:underline break-all flex-1 font-mono"
                  >
                    {shortUrl}
                  </a>
                  <motion.button
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex-shrink-0"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? (
                      <FiCheck size={24} className="text-green-400" />
                    ) : (
                      <FiCopy size={24} />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <UrlList userId={user?.id} newUrlAdded={shortUrl} />
        </motion.div>
      </div>
    </div>
  )
}