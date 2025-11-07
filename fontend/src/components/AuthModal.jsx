import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthModal({ isOpen, onOpenChange }) {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm();

  const onLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      await login(data.username, data.password);
      onOpenChange(false);
      // After successful login, navigate to the dashboard
      navigate('/dashboard');
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data) => {
    setError("");
    setLoading(true);
    try {
      console.log("Registration data:", data);
      // In a real app, you would make an API call here
      setActiveTab("login");
      setError("Registration successful! Please login.");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome to Cửu Long Diaries</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                <Input
                  id="login-username"
                  {...registerLogin("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username can only contain letters, numbers and underscores",
                    },
                  })}
                  placeholder="Enter your username"
                />
                {loginErrors.username && (
                  <p className="text-sm text-red-500">{loginErrors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  {...registerLogin("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                />
                {loginErrors.password && (
                  <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-fullname">Full Name</Label>
                <Input
                  id="signup-fullname"
                  {...registerSignup("fullname", { required: "Full name is required" })}
                  placeholder="Enter your full name"
                />
                {signupErrors.fullname && (
                  <p className="text-sm text-red-500">{signupErrors.fullname.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  {...registerSignup("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username can only contain letters, numbers and underscores",
                    },
                  })}
                  placeholder="Choose a username"
                />
                {signupErrors.username && (
                  <p className="text-sm text-red-500">{signupErrors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  {...registerSignup("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Enter your email"
                />
                {signupErrors.email && (
                  <p className="text-sm text-red-500">{signupErrors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  {...registerSignup("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    maxLength: { value: 20, message: "Password must not exceed 20 characters" },
                  })}
                  placeholder="Choose a password"
                />
                {signupErrors.password && (
                  <p className="text-sm text-red-500">{signupErrors.password.message}</p>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}