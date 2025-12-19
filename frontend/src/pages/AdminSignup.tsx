import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminSignupMutation } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { isLoading }] = useAdminSignupMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signup({ name, email, password }).unwrap();

      window.localStorage.setItem("admin_token", result.token);
      window.localStorage.setItem("admin_email", result.user.email);

      toast({
        title: "Account created",
        description: "You are now logged in to the admin panel.",
      });

      navigate("/admin", { replace: true });
    } catch (error: any) {
      console.error("Admin signup failed:", error);
      toast({
        title: "Signup failed",
        description:
          error?.data?.error ||
          "Could not create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-elevated border border-border p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Admin Signup
          </h1>
          <p className="text-sm text-muted-foreground">
            Create an admin account to manage your site.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-accent hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;


