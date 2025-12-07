import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { Toaster } from './components/ui/toaster'
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

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="biasscan-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/auth" 
            element={user ? <Navigate to="/dashboard" /> : <AuthPage />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/upload" 
            element={user ? <UploadPage user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/results/:scanId" 
            element={user ? <ResultsPage user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/admin" 
            element={user ? <AdminPage user={user} /> : <Navigate to="/auth" />} 
          />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App