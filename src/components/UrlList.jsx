import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiTrash2, FiClock, FiLink } from 'react-icons/fi'
import { getUserUrls, deleteUrl } from '../services/urlService'

export default function UrlList({ userId, newUrlAdded }) {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchUrls()
    }
  }, [userId, newUrlAdded])

  const fetchUrls = async () => {
    setLoading(true)
    try {
      const data = await getUserUrls()
      setUrls(data)
    } catch (error) {
      console.error('Error fetching URLs:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (urlId) => {
    try {
      await deleteUrl(urlId)
      setUrls(prev => prev.filter(url => url.id !== urlId))
    } catch (error) {
      console.error('Error deleting URL:', error.message)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FiClock className="text-purple-400" />
        <span>Your Recent Links</span>
      </h2>

      {urls.length > 0 ? (
        urls.map((url) => (
          <motion.div
            key={url.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  {new Date(url.created_at).toLocaleString()}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FiExternalLink className="text-gray-500 mt-1 flex-shrink-0" />
                    <a 
                      href={url.original_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline break-all"
                      title={url.original_url}
                    >
                      {url.original_url}
                    </a>
                      -&gt;
                  </div>

                  <div className="flex items-start gap-2">
                    <FiLink className="text-gray-500 mt-1 flex-shrink-0" />
                    <a 
                      href={url.short_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline break-all"
                    >
                      {url.short_url}
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(url.id)}
                className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors self-start md:self-center"
                aria-label="Delete URL"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-400 border border-dashed border-gray-700 rounded-xl"
        >
          No shortened URLs yet. Create your first one above!
        </motion.div>
      )}
    </div>
  )
}