import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Check, Zap, Shield, FileText, Users, Star } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  is_pro: boolean;
  created_at: string;
}

const Payment = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [paymentStep, setPaymentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!user || !profile) return;

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update profile to Pro
      const { error } = await supabase
        .from('profiles')
        .update({ is_pro: true })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, is_pro: true } : null);
      setPaymentStep(3);
      toast.success('Payment successful! Welcome to Pro!');
    } catch (error: any) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const proFeatures = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: "Unlimited Cases",
      description: "Create and manage unlimited legal cases"
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      title: "Advanced Document Management",
      description: "Upload, organize, and search through case documents"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      title: "Enhanced Security",
      description: "Bank-level encryption and secure cloud storage"
    },
    {
      icon: <Users className="w-5 h-5 text-purple-500" />,
      title: "Team Collaboration",
      description: "Share cases and collaborate with team members"
    },
    {
      icon: <Star className="w-5 h-5 text-orange-500" />,
      title: "Priority Support",
      description: "Get priority customer support and assistance"
    }
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  // If user is already Pro
  if (profile.is_pro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Crown className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <CardTitle className="text-2xl">You're already Pro!</CardTitle>
            <CardDescription>
              You have access to all premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-primary">Samanyay Pro</h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {paymentStep === 1 && (
          <div className="space-y-8">
            {/* Pricing Card */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <Crown className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                <CardTitle className="text-3xl">Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock premium features for enhanced legal case management
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">₹2,999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full mb-6"
                  onClick={() => setPaymentStep(2)}
                >
                  Upgrade Now
                </Button>

                <p className="text-sm text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {feature.icon}
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {paymentStep === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Complete Payment</CardTitle>
              <CardDescription>
                Secure payment processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-secondary/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Samanyay Pro (Monthly)</span>
                  <span className="font-semibold">₹2,999</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Tax included</span>
                  <span>Total: ₹2,999</span>
                </div>
              </div>

              {/* Mock Payment Form */}
              <div className="space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  <p>This is a demo payment form.</p>
                  <p>No actual charges will be made.</p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Complete Payment'}
              </Button>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setPaymentStep(1)}
                disabled={processing}
              >
                Back
              </Button>
            </CardContent>
          </Card>
        )}

        {paymentStep === 3 && (
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <Crown className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <CardTitle className="text-3xl text-green-600">Payment Successful!</CardTitle>
              <CardDescription>
                Welcome to Samanyay Pro! You now have access to all premium features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-left">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature.title}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Payment;