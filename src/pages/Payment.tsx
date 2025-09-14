import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Crown, Check, Zap, Shield, Users, CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  useEffect(() => {
    const currentUser = localStorage.getItem('samanyay_current_user');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [navigate]);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user to Pro status
      const updatedUser = { ...user, isPro: true };
      setUser(updatedUser);
      localStorage.setItem('samanyay_current_user', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('samanyay_users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('samanyay_users', JSON.stringify(updatedUsers));
      
      setPaymentStep(3);
      toast.success("Payment successful! Welcome to Samanyay Pro!");
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const proFeatures = [
    {
      icon: <Zap className="h-5 w-5 text-warning" />,
      title: "Advanced AI Research",
      description: "Enhanced AI-powered legal research with deeper case analysis"
    },
    {
      icon: <Shield className="h-5 w-5 text-success" />,
      title: "Priority Security",
      description: "Advanced encryption and priority security monitoring"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Team Collaboration", 
      description: "Collaborate with unlimited team members and clients"
    },
    {
      icon: <CreditCard className="h-5 w-5 text-primary" />,
      title: "Premium Support",
      description: "24/7 priority customer support and dedicated account manager"
    }
  ];

  if (!user) return null;

  if (user.isPro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="shadow-elegant border-0 bg-gradient-card max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">You're Already Pro!</CardTitle>
            <CardDescription>
              You already have access to all premium features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-primary hover:shadow-glow"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl">Samanyay Pro</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
        {paymentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-primary rounded-2xl flex items-center justify-center animate-float">
                  <Crown className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
                Upgrade to Samanyay Pro
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Unlock advanced AI-powered legal research tools and premium features designed for professional legal practice.
              </p>
            </div>

            {/* Pricing Card */}
            <div className="flex justify-center">
              <Card className="shadow-elegant border-2 border-primary/20 bg-gradient-card max-w-md w-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center items-baseline space-x-2 mb-2">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardTitle className="text-2xl">Samanyay Pro</CardTitle>
                  <CardDescription>
                    Professional legal research platform with advanced AI tools
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {proFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-4">
                      <Lock className="h-4 w-4" />
                      <span>Secure payment processing</span>
                    </div>
                    
                    <Button 
                      onClick={() => setPaymentStep(2)}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-bounce text-lg py-6"
                    >
                      <Crown className="mr-2 h-5 w-5" />
                      Upgrade to Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {proFeatures.map((feature, index) => (
                <Card key={index} className="shadow-card bg-gradient-card border-0 hover-lift">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent rounded-lg">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {paymentStep === 2 && (
          <div className="max-w-md mx-auto animate-scale-in">
            <Card className="shadow-elegant border-0 bg-gradient-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Complete Payment</CardTitle>
                <CardDescription>
                  Secure payment processing powered by Stripe
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Alert className="border-primary/20 bg-primary/10">
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-primary">
                    This is a demo environment. No real payment will be processed.
                  </AlertDescription>
                </Alert>

                {/* Mock Payment Form */}
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-3">Payment Summary</h4>
                    <div className="flex justify-between items-center">
                      <span>Samanyay Pro (Monthly)</span>
                      <span className="font-medium">$99.00</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center text-sm text-muted-foreground">
                      Demo payment form - Click the button below to simulate payment
                    </div>
                    
                    <Button 
                      onClick={handlePayment}
                      disabled={loading}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-bounce"
                    >
                      {loading ? (
                        "Processing Payment..."
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Complete Payment ($99)
                        </>
                      )}
                    </Button>

                    <Button 
                      variant="outline" 
                      onClick={() => setPaymentStep(1)}
                      className="w-full"
                      disabled={loading}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {paymentStep === 3 && (
          <div className="max-w-md mx-auto text-center animate-scale-in">
            <Card className="shadow-elegant border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 bg-gradient-primary rounded-full flex items-center justify-center animate-float">
                    <Check className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-success">Payment Successful!</CardTitle>
                <CardDescription>
                  Welcome to Samanyay Pro! Your account has been upgraded.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Alert className="border-success/20 bg-success/10">
                  <Crown className="h-4 w-4" />
                  <AlertDescription className="text-success">
                    You now have access to all premium features!
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  {proFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-left">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature.title}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-gradient-primary hover:shadow-glow"
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;