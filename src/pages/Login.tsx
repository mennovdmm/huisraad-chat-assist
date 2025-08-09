import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import logo from "@/assets/huisraad-logo.svg";

const Login: React.FC = () => {
  useSEO({
    title: "Inloggen - Huisraad Agents",
    description: "Log in om toegang te krijgen tot jouw Huisraad Agents dashboard.",
    canonicalPath: "/login",
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // LOGIN FUNCTIONS (placeholders ready for backend)
  function login(email: string, password: string) {
    console.log("TODO: POST /api/auth/login", { email, password });
    // On success: checkUserRole(userData)
  }

  function checkUserRole(userData: { isSuperUser: boolean }) {
    if (userData.isSuperUser) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      login(email, password);
      // Example for future integration:
      // const userData = await api.login(email, password)
      // checkUserRole(userData)
    } catch (err) {
      setError("Inloggen mislukt. Controleer je gegevens en probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <main className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border border-border">
        <img src={logo} alt="Huisraad logo" className="h-28 mx-auto mb-8" />

        <h1 className="sr-only">Inloggen</h1>

        <form id="loginForm" className="space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <Label htmlFor="email" className="mb-2 block">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 text-sm"
              placeholder="jij@voorbeeld.nl"
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2 block">Wachtwoord</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 text-sm"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Bezig met inloggen..." : "Inloggen"}
          </Button>
        </form>

        {error && (
          <div id="loginError" className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
