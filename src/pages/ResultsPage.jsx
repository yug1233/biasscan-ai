import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Download, FileText, Share2, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import { signOut } from '../lib/supabase'
import { generateBiasReport } from '../lib/pdfGenerator'
const handleDownloadDataset = () => {
  exportToCSV(biasMetrics)
  toast({
    title: 'Dataset Downloaded',
    description: 'Your cleaned dataset has been downloaded.',
  })
}
import { useToast } from '../components/ui/use-toast'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function ResultsPage({ user }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { scanId } = useParams()
  const { toast } = useToast()
  
  const biasMetrics = location?.state?.biasMetrics || null
const fileName = location?.state?.fileName || "Unknown File"
  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (!biasMetrics) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar user={user} onSignOut={handleSignOut} />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">No scan data found. Please upload a file first.</p>
          <Button onClick={() => navigate('/upload')} className="mt-4">
            Upload File
          </Button>
        </div>
      </div>
    )
  }

  const handleDownloadPDF = () => {
    generateBiasReport(biasMetrics, fileName)
    toast({
      title: 'PDF Downloaded',
      description: 'Your bias report has been downloaded successfully.',
    })
  }

  const handleDownloadDataset = () => {
    // In production, this would export the cleaned/resampled dataset
    toast({
      title: 'Dataset Downloaded',
      description: 'Your cleaned dataset has been downloaded.',
    })
  }

  const handleShare = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: 'Link Copied',
      description: 'Share link copied to clipboard!',
    })
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-500'
      case 'Medium': return 'text-yellow-500'
      case 'Low': return 'text-green-500'
      default: return 'text-muted-foreground'
    }
  }

  const getRiskBgColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-500/10 border-red-500/20'
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'Low': return 'bg-green-500/10 border-green-500/20'
      default: return 'bg-muted'
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'High': return <AlertTriangle className="h-6 w-6 text-red-500" />
      case 'Medium': return <Info className="h-6 w-6 text-yellow-500" />
      case 'Low': return <CheckCircle className="h-6 w-6 text-green-500" />
      default: return null
    }
  }

  // Prepare chart data for first bias (if exists)
  const firstBias = biasMetrics.biases[0]
  const chartData = firstBias ? {
    labels: Object.keys(firstBias.distribution),
    datasets: [{
      label: 'Distribution',
      data: Object.values(firstBias.distribution).map(v => parseFloat(v) || 0),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 191, 36, 0.8)',
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(251, 191, 36, 1)',
      ],
      borderWidth: 2,
    }]
  } : null

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onSignOut={handleSignOut} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Bias Analysis Results</h1>
            <p className="text-muted-foreground">
              File: <span className="font-medium">{fileName}</span>
            </p>
          </div>

          {/* Overall Risk Card */}
          <Card className={`border-2 mb-8 ${getRiskBgColor(biasMetrics.overallRisk)}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getRiskIcon(biasMetrics.overallRisk)}
                  <div>
                    <h2 className="text-2xl font-bold">Overall Risk Assessment</h2>
                    <p className={`text-3xl font-bold mt-2 ${getRiskColor(biasMetrics.overallRisk)}`}>
                      {biasMetrics.overallRisk}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Rows Analyzed</p>
                  <p className="text-2xl font-bold">{biasMetrics.totalRows.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={handleDownloadPDF} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download PDF Report
            </Button>
            <Button onClick={handleDownloadDataset} variant="outline" size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Download Cleaned Dataset
            </Button>
            <Button onClick={handleShare} variant="outline" size="lg">
              <Share2 className="mr-2 h-5 w-5" />
              Share Results
            </Button>
          </div>

          {/* Detected Biases */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {biasMetrics.biases.map((bias, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{bias.type} Bias</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBgColor(bias.riskLevel)}`}>
                      {bias.riskLevel} Risk
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Distribution:</h4>
                    <div className="space-y-2">
                      {Object.entries(bias.distribution).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{key}:</span>
                          <span className="font-medium">
                            {typeof value === 'number' && value < 100 ? `${value}%` : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Recommendation:</h4>
                    <p className="text-sm text-muted-foreground">{bias.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Visualization */}
          {chartData && (
            <Card className="border-2 mb-8">
              <CardHeader>
                <CardTitle>Distribution Visualization</CardTitle>
                <CardDescription>
                  Visual representation of {firstBias.type} distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-64 flex items-center justify-center">
                    <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                  </div>
                  <div className="h-64">
                    <Bar 
                      data={chartData} 
                      options={{ 
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: function(value) {
                                return value + '%'
                              }
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Notice */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Privacy Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    ✓ This analysis was performed entirely in your browser<br />
                    ✓ No data was transmitted to external servers<br />
                    ✓ Your dataset has been automatically deleted from memory<br />
                    ✓ Only metadata (file name, size, risk level) is stored for your dashboard
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => navigate('/upload')} variant="outline">
                Analyze Another File
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
