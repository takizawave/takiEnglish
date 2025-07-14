import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: "free" | "pro" | "enterprise"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: "free" | "pro" | "enterprise"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: "free" | "pro" | "enterprise"
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          user_id: string
          title: string
          raw_content: string
          processed_content: any
          difficulty: "beginner" | "intermediate" | "advanced"
          reading_time: number
          status: "processing" | "completed" | "failed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          raw_content: string
          processed_content?: any
          difficulty?: "beginner" | "intermediate" | "advanced"
          reading_time?: number
          status?: "processing" | "completed" | "failed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          raw_content?: string
          processed_content?: any
          difficulty?: "beginner" | "intermediate" | "advanced"
          reading_time?: number
          status?: "processing" | "completed" | "failed"
          created_at?: string
          updated_at?: string
        }
      }
      vocabulary_tokens: {
        Row: {
          id: string
          user_id: string
          article_id: string | null
          word: string
          ipa: string
          definition: string
          example: string
          difficulty: "beginner" | "intermediate" | "advanced"
          mastery_level: number
          next_review: string
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id?: string | null
          word: string
          ipa: string
          definition: string
          example: string
          difficulty?: "beginner" | "intermediate" | "advanced"
          mastery_level?: number
          next_review?: string
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string | null
          word?: string
          ipa?: string
          definition?: string
          example?: string
          difficulty?: "beginner" | "intermediate" | "advanced"
          mastery_level?: number
          next_review?: string
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      learning_sessions: {
        Row: {
          id: string
          user_id: string
          session_type: "review" | "grammar_lint" | "article_processing"
          duration_minutes: number
          accuracy_score: number
          items_completed: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_type: "review" | "grammar_lint" | "article_processing"
          duration_minutes: number
          accuracy_score?: number
          items_completed?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_type?: "review" | "grammar_lint" | "article_processing"
          duration_minutes?: number
          accuracy_score?: number
          items_completed?: number
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          daily_target_minutes: number
          completed_minutes: number
          vocabulary_reviewed: number
          articles_processed: number
          accuracy_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          daily_target_minutes?: number
          completed_minutes?: number
          vocabulary_reviewed?: number
          articles_processed?: number
          accuracy_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          daily_target_minutes?: number
          completed_minutes?: number
          vocabulary_reviewed?: number
          articles_processed?: number
          accuracy_score?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
