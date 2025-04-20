import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FiLogIn, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import ParticlesBackground from '../components/ParticlesBackground'
import GlowEffect from '../components/GlowEffect'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { error } = await signIn(email, password)
      if (error) throw error
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden relative">
      <ParticlesBackground />
      
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Sign in to your account
          </motion.p>

          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <GlowEffect visible={isFocused} />
            
            <div className="space-y-6">
              <div className="relative">
                <motion.div
                  animate={{
                    boxShadow: isFocused 
                      ? '0 0 0 2px rgba(165, 180, 252, 0.5)' 
                      : '0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                  className="absolute inset-0 rounded-lg pointer-events-none"
                />
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Email address"
                    className="w-full bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-lg py-4 pl-12 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <motion.div
                  animate={{
                    boxShadow: isFocused 
                      ? '0 0 0 2px rgba(165, 180, 252, 0.5)' 
                      : '0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                  className="absolute inset-0 rounded-lg pointer-events-none"
                />
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Password"
                    className="w-full bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-lg py-4 pl-12 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiLogIn size={20} />
                Sign In
              </motion.button>
            </div>
          </form>

          <motion.div 
            className="mt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Sign up
              <FiArrowRight className="inline ml-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}