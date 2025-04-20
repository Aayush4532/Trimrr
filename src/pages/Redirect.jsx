import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOriginalUrl } from '../services/urlService'

export default function Redirect() {
  const { shortCode } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const redirect = async () => {
      try {
        const originalUrl = await getOriginalUrl(shortCode)
        if (originalUrl) {
          window.location.href = originalUrl
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('Redirect error:', error)
        navigate('/')
      }
    }

    redirect()
  }, [shortCode, navigate])

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>
}