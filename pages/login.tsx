// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Store the JWT token in localStorage or cookies
      localStorage.setItem("token", data.token);

      // Redirect to the dashboard or home page
      router.push("/");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 shadow-md rounded-lg">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link href="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
