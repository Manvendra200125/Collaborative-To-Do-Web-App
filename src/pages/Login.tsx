
import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const Login: React.FC = () => {
  const { login, verifyOtp } = useApp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(phoneNumber);
      setShowOtpInput(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await verifyOtp(otp);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-background dark:text-foreground">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-dark dark:text-purple-light">Flow Tasks</h1>
          <p className="text-muted-foreground mt-2">Collaborate and manage tasks together</p>
        </div>
        
        <Card className="border-purple/10 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              {showOtpInput 
                ? "Enter the verification code sent to your phone" 
                : "Sign in with your phone number"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showOtpInput ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Enter your phone number with country code</p>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    For this demo, use code: 123456
                  </p>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  type="button"
                  onClick={() => setShowOtpInput(false)}
                >
                  Back to Login
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
