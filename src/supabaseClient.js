import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export class SupabaseService {
  static async getAllArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  }

  static async getArticlesByCategory(category) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  }

  static async getLatestArticles(limit = 5) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) throw new Error(error.message)
    return data
  }

  static async insertArticle({ title, content, preview, image_url, category, author_id }) {
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          content,
          preview,
          image_url,
          category,
          author_id,
        },
      ])
      .select()
    if (error) throw new Error(error.message)
    return data
  }
}
