import { supabase } from '../db/Supabase'
const generateShortCode = () => Math.random().toString(36).substring(2, 8)
export const createShortUrl = async (originalUrl) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('User not logged in')
  }

  const shortCode = generateShortCode()

  const { data, error } = await supabase
    .from('urls')
    .insert([{
      original_url: originalUrl,
      short_url: shortCode,
      user_id: user.id 
    }])
    .select()
    .single()

  if (error) throw error

  return {
    ...data,
    short_url: `${window.location.origin}/${data.short_url}`
  }
}

// 🔍 Resolve short URL to original
export const getOriginalUrl = async (shortCode) => {
  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_url', shortCode)
    .single()

  if (error) throw error
  return data?.original_url
}
export const getUserUrls = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('User not logged in')
  }

  const { data, error } = await supabase
    .from('urls')
    .select('id, created_at, original_url, short_url')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(url => ({
    ...url,
    short_url: `${window.location.origin}/${url.short_url}`
  }))
}
export const deleteUrl = async (urlId) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('User not logged in')
  }

  const { error } = await supabase
    .from('urls')
    .delete()
    .eq('id', urlId)
    .eq('user_id', user.id) 

  if (error) throw error
  return true
}