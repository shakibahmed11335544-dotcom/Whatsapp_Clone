import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EyeIcon, EyeOffIcon, MessageCircleIcon } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-primary to-primary/90 p-3 rounded-2xl shadow-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground tracking-tighter">
                  G<span className="text-primary-foreground/80">K</span>
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">GoponKotha</h1>
              <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wider">PROFESSIONAL CHAT</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue chatting</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-8 shadow-2xl border border-white/10 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-12 bg-background/60 border-white/20 focus:border-primary/50 focus:ring-primary/25 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground/90">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-12 bg-background/60 border-white/20 focus:border-primary/50 focus:ring-primary/25 rounded-xl pr-12 transition-all duration-300"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 w-12 hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-destructive text-sm font-medium animate-slide-up">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 hover:underline underline-offset-4"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center">
          <div className="glass rounded-full p-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Designer Credit */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground/60 text-sm font-medium tracking-wide">
            <span className="inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></span>
              <span className="gradient-text font-semibold">Designed by Sakib</span>
              <span className="w-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
