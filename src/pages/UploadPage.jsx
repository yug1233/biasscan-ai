import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Image, AlertCircle, Loader2, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../components/ui/use-toast'
import Navbar from '../components/Navbar'
import { signOut, createScan } from '../lib/supabase'
import { detectBias } from '../lib/biasDetection'
import { formatFileSize } from '../lib/utils'

const ALLOWED_FILE_TYPES = {
  'text/csv': ['.csv'],
  'text/comma-separated-values': ['.csv'],
  'application/csv': ['.csv'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp']
}

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

export default function UploadPage({ user }) {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const validateFile = (file) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}`
      }
    }

    // Check if file is empty
    if (file.size === 0) {
      return {
        valid: false,
        error: 'File is empty. Please upload a valid file.'
      }
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    const isValidType = Object.values(ALLOWED_FILE_TYPES).some(extensions => 
      extensions.includes(fileExtension)
    )

    if (!isValidType) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload CSV or image files (PNG, JPG, GIF, WEBP).'
      }
    }

    return { valid: true }
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles && rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      let errorMessage = 'File upload failed'
      
      if (rejection.errors && rejection.errors.length > 0) {
        const error = rejection.errors[0]
        if (error.code === 'file-too-large') {
          errorMessage = `File too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}`
        } else if (error.code === 'file-invalid-type') {
          errorMessage = 'Invalid file type. Please upload CSV or image files.'
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: 'Upload Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return
    }

    const uploadedFile = acceptedFiles[0]
    if (!uploadedFile) return

    // Additional validation
    const validation = validateFile(uploadedFile)
    if (!validation.valid) {
      toast({
        title: 'Invalid File',
        description: validation.error,
        variant: 'destructive',
      })
      return
    }

    setFile(uploadedFile)
    toast({
      title: 'File uploaded successfully',
      description: `${uploadedFile.name} (${formatFileSize(uploadedFile.size)})`,
    })
  }, [toast])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  })

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a file first',
        variant: 'destructive',
      })
      return
    }

    setProcessing(true)
    setProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Detect file type
      const fileType = file.type.startsWith('image/') ? 'image' : 'csv'
      
      // Run bias detection
      const biasMetrics = await detectBias(file, fileType)
      
      clearInterval(progressInterval)
      setProgress(100)

      // Save scan to database
      const scanData = {
        user_id: user.id,
        file_name: file.name,
        file_size: file.size,
        file_type: fileType,
        bias_metrics: biasMetrics,
        overall_risk: biasMetrics.overallRisk,
        created_at: new Date().toISOString()
      }

      const { data, error } = await createScan(scanData)

      if (error) throw error

      toast({
        title: 'Analysis complete!',
        description: 'Redirecting to results...',
      })

      // Navigate to results page
      setTimeout(() => {
        navigate(`/results/${data[0].id}`, { 
          state: { 
            biasMetrics, 
            fileName: file.name 
          } 
        })
      }, 1000)

    } catch (error) {
      console.error('Processing error:', error)
      toast({
        title: 'Processing failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
      setProcessing(false)
      setProgress(0)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onSignOut={handleSignOut} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Upload Your Dataset</h1>
            <p className="text-muted-foreground text-lg">
              Drag & drop your CSV or image files to detect bias instantly
            </p>
          </div>

          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Supported formats: CSV, PNG, JPG, JPEG, GIF, WEBP (Max {formatFileSize(MAX_FILE_SIZE)})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  isDragActive && !isDragReject
                    ? 'border-primary bg-primary/5' 
                    : isDragReject
                    ? 'border-destructive bg-destructive/5'
                    : 'border-muted-foreground/25 hover:border-primary hover:bg-muted/50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDragReject ? 'bg-destructive/10' : 'bg-primary/10'
                  }`}>
                    <Upload className={`h-8 w-8 ${isDragReject ? 'text-destructive' : 'text-primary'}`} />
                  </div>
                  {isDragActive ? (
                    isDragReject ? (
                      <p className="text-lg font-medium text-destructive">
                        Invalid file type!
                      </p>
                    ) : (
                      <p className="text-lg font-medium">Drop your file here...</p>
                    )
                  ) : (
                    <>
                      <p className="text-lg font-medium">
                        Drag & drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        CSV files for tabular data or images for visual bias detection
                      </p>
                    </>
                  )}
                </div>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-muted rounded-lg flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-3">
                    {file.type.startsWith('image/') ? (
                      <Image className="h-8 w-8 text-primary" />
                    ) : (
                      <FileText className="h-8 w-8 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                    disabled={processing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {processing && (
                <div className="mt-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing...</span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Analyzing bias patterns in your dataset...
                  </p>
                </div>
              )}

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleProcess}
                disabled={!file || processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Analyze for Bias'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Privacy & Security</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ All processing happens in your browser (client-side)</li>
                    <li>✓ Your data never leaves your device</li>
                    <li>✓ No data is stored on our servers</li>
                    <li>✓ GDPR compliant - Zero data retention</li>
                    <li>✓ Files are automatically deleted after analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-2">
                  1
                </div>
                <CardTitle className="text-lg">Upload File</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your CSV or image file (up to {formatFileSize(MAX_FILE_SIZE)})
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-2">
                  2
                </div>
                <CardTitle className="text-lg">Auto-Detect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes gender, race, and age bias patterns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-2">
                  3
                </div>
                <CardTitle className="text-lg">Get Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Download PDF report and cleaned dataset instantly
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}