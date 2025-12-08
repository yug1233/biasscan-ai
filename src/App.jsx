import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { Toaster } from './components/ui/toaster'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import ResultsPage from './pages/ResultsPage'
import AdminPage from './pages/AdminPage'
import { ThemeProvider } from './components/ThemeProvider'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check active session
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(data?.session?.user ?? null)
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError(err?.message ?? String(err))
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes (safe handling)
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      try {
        setUser(session?.user ?? null)
      } catch (e) {
        console.warn('Auth state change handler error:', e)
      }
    })
    const subscription = data?.subscription

    return () => {
      try {
        subscription?.unsubscribe?.()
      } catch (e) {
        console.warn('Failed to unsubscribe auth listener:', e)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Loading BiasScan AI...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="biasscan-theme">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/auth" 
              element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="/upload" 
              element={user ? <UploadPage user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="/results/:scanId" 
              element={user ? <ResultsPage user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="/admin" 
              element={user ? <AdminPage user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Loading BiasScan AI...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="biasscan-theme">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/auth" 
              element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="/upload" 
              element={user ? <UploadPage user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="/results/:scanId" 
              element={user ? <ResultsPage user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="/admin" 
              element={user ? <AdminPage user={user} /> : <Navigate to="/auth" replace />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
