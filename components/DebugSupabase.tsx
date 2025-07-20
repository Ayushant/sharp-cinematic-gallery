"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function DebugSupabase() {
  const [status, setStatus] = useState<string>('Testing...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        setStatus('Testing Supabase connection...')
        
        // Test basic connection
        const { data, error } = await supabase
          .from('categories')
          .select('count')
          .limit(1)

        if (error) {
          setError(`Supabase error: ${error.message}`)
          setStatus('Connection failed')
        } else {
          setStatus('Supabase connection successful!')
        }
      } catch (err) {
        setError(`Exception: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setStatus('Connection failed')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50 max-w-sm">
      <h3 className="font-bold mb-2">Supabase Debug</h3>
      <p className="text-sm mb-2">{status}</p>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
} 