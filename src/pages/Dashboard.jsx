import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FileText, TrendingUp, Shield, Star, Upload as UploadIcon } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import Navbar from '../components/Navbar'
import { signOut, getUserScans, createReview, getReviews } from '../lib/supabase'
import { useToast } from '../components/ui/use-toast'
import { formatDate } from '../lib/utils'

export default function Dashboard({ user }) {
  const [scans, setScans] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const loadData = async () => {
  if (!user) return; // early return if user is undefined
  try {
    const [scansResult, reviewsResult] = await Promise.all([
      getUserScans(user.id),
      getReviews(10)
    ])

    if (scansResult.data) setScans(scansResult.data)
    if (reviewsResult.data) setReviews(reviewsResult.data)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    setLoading(false)
  }
}

  const loadData = async () => {
    try {
      const [scansResult, reviewsResult] = await Promise.all([
        getUserScans(user.id),
        getReviews(10)
      ])

      if (scansResult.data) setScans(scansResult.data)
      if (reviewsResult.data) setReviews(reviewsResult.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setSubmittingReview(true)

    try {
      const { error } = await createReview({
        user_id: user.id,
        rating,
        comment,
        status: 'pending'
      })

      if (error) throw error

      toast({
        title: 'Review submitted!',
        description: 'Thank you for your feedback. It will be reviewed shortly.',
      })

      setComment('')
      setRating(5)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setSubmittingReview(false)
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-500 bg-red-500/10'
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10'
      case 'Low': return 'text-green-500 bg-green-500/10'
      default: return 'text-muted-foreground bg-muted'
    }
  }

  const stats = {
    totalScans: scans.length,
    highRisk: scans.filter(s => s.overall_risk === 'High').length,
    mediumRisk: scans.filter(s => s.overall_risk === 'Medium').length,
    lowRisk: scans.filter(s => s.overall_risk === 'Low').length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onSignOut={handleSignOut} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.email}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalScans}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <TrendingUp className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{stats.highRisk}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Needs attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
                <Shield className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">{stats.mediumRisk}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Review recommended
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stats.lowRisk}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Looking good
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scan History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Scan History</CardTitle>
                      <CardDescription>Your recent bias detection scans</CardDescription>
                    </div>
                    <Link to="/upload">
                      <Button>
                        <UploadIcon className="mr-2 h-4 w-4" />
                        New Scan
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                  ) : scans.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No scans yet</p>
                      <Link to="/upload">
                        <Button>Upload Your First File</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {scans.slice(0, 10).map((scan) => (
                        <div
                          key={scan.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/results/${scan.id}`, { 
                            state: { 
                              biasMetrics: scan.bias_metrics, 
                              fileName: scan.file_name 
                            } 
                          })}
                        >
                          <div className="flex items-center gap-4">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium">{scan.file_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(scan.created_at)}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(scan.overall_risk)}`}>
                            {scan.overall_risk}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Reviews Section */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Leave a Review</CardTitle>
                  <CardDescription>Share your experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Label>Rating</Label>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">Comment</Label>
                      <Input
                        id="comment"
                        placeholder="Share your thoughts..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={submittingReview}>
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>What others are saying</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "{review.comment}"
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {review.users?.email?.split('@')[0] || 'Anonymous'}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
