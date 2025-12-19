import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminLoginMutation } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

        <p className="mt-4 text-xs text-muted-foreground text-center">
          New here?{" "}
          <Link
            to="/admin/signup"
            className="text-accent hover:underline font-medium"
          >
            Create an admin account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

