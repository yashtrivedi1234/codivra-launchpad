import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminLoginMutation } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useAdminLoginMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();

      window.localStorage.setItem("admin_token", result.token);
      window.localStorage.setItem("admin_email", result.user.email);

      toast({
        title: "Logged in",
        description: "Welcome to the admin panel.",
      });

      navigate("/admin", { replace: true });
    } catch (error: any) {
      console.error("Admin login failed:", error);
      toast({
        title: "Login failed",
        description:
          error?.data?.error || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: credentialResponse.credential }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Google login failed");
      }

      const result = await response.json();

      window.localStorage.setItem("admin_token", result.token);
      window.localStorage.setItem("admin_email", result.user.email);

      toast({
        title: "Logged in",
        description: "Welcome to the admin panel.",
      });

      navigate("/admin", { replace: true });
    } catch (error: any) {
      console.error("Google login failed:", error);
      toast({
        title: "Google login failed",
        description: error.message || "Failed to login with Google",
        variant: "destructive",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Google login failed",
      description: "Please try again",
      variant: "destructive",
    });
  };

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-elevated border border-border p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage content and applications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Google OAuth Login */}
        {googleClientId && (
          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleOAuthProvider clientId={googleClientId}>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  size="large"
                  theme="outline"
                  text="signin_with"
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

