import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../services/api";
import AuthLayout from "./AuthLayout";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // your firebase.js


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login response:", response);
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      const idToken = await response.user.getIdToken();
      await fetch(`${process.env.REACT_APP_API_URL}/auth/sessionLogin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      
      // Navigate based on user role
      if (response.user.role === "admin") {
        navigate("/esummit/admin-dashboard");
      } else {
        navigate("/esummit");
      }

    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error("Login error:", err);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="rounded-2xl shadow-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-white mb-1">Sign In</h2>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-right mb-1">
          <Link
            to="/esummit/forgot-password"
            className="text-sm text-white hover:text-green-400 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-1 bg-[#2F8D46] hover:bg-[#256e36] text-black font-semibold rounded py-2 transition"
          >
            {loading ? "Signing in..." : "LOGIN"}
          </button>
          <Link
            to="/esummit/register"
            className="flex items-center justify-center gap-1 bg-transparent hover:bg-white/10 text-white font-semibold rounded py-2 transition"
          >
            CREATE NEW ACCOUNT
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
