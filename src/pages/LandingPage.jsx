import { Link } from 'react-router-dom'
import { Shield, Zap, Lock, Download, Star, CheckCircle, ArrowRight, Share2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
await supabase.auth.signOut()
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function LandingPage() {
  supabase.auth.getUser().then(({ data: { user } }) => {
  setUser(user)
})
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()

    setUser(null)
    navigate('/')
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Analysis',
      description: 'Upload CSV/images and get bias detection results in seconds with our advanced algorithms'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Privacy First',
      description: 'Client-side processing only. Your data never leaves your browser. GDPR compliant.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Certified Fair AI',
      description: 'Industry-standard bias detection for gender, race, and age with actionable recommendations'
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: 'Export Everything',
      description: 'Download PDF reports, cleaned datasets, and metrics charts instantly'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'ML Engineer at TechCorp',
      rating: 5,
      comment: 'BiasScan AI saved us weeks of manual bias analysis. The instant reports are incredibly detailed!'
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Scientist',
      rating: 5,
      comment: 'Privacy-first approach is exactly what we needed. No data leaves our infrastructure.'
    },
    {
      name: 'Priya Patel',
      role: 'AI Ethics Researcher',
      rating: 5,
      comment: 'The most comprehensive bias detection tool I\'ve used. Highly recommend for any AI team.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onSignOut={handleSignOut} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Certified Fair AI Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upload CSV/Images → Get Bias-Free Data Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              No-code bias detection for AI datasets. Privacy-first, client-side processing. 
              Detect gender, race, and age bias in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8">
                  Start Free Scan <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                10 free scans
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                GDPR compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BiasScan AI?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Industry-leading bias detection with privacy at its core
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Get bias-free data in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Dataset</h3>
              <p className="text-muted-foreground">
                Drag & drop your CSV or image files (up to 100MB)
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Detect Bias</h3>
              <p className="text-muted-foreground">
                Our AI analyzes gender, race, and age distribution instantly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Download Results</h3>
              <p className="text-muted-foreground">
                Get PDF report, cleaned dataset, and actionable insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start free, upgrade when you need more
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free Tier</CardTitle>
                <CardDescription>Perfect for trying out BiasScan AI</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>10 scans per month</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Up to 100MB file size</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>PDF reports</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Client-side processing</span>
                </div>
                <Link to="/auth">
                  <Button className="w-full mt-6" variant="outline">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro Plan</CardTitle>
                <CardDescription>For teams and professionals</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="font-semibold">Unlimited scans</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Up to 100MB file size</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>API access</span>
                </div>
                <Link to="/auth">
                  <Button className="w-full mt-6">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by AI Teams Worldwide
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our users are saying
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Fair AI?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of teams using BiasScan AI to create unbiased datasets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
              <Share2 className="mr-2 h-5 w-5" />
              Share with Team
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="font-bold text-lg">BiasScan AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making AI fair, one dataset at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 BiasScan AI. All rights reserved. Built with ❤️ for fair AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
