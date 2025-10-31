import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Check if user is admin and redirect accordingly
      const storedUser = JSON.parse(localStorage.getItem("unifyr_user"));
      if (storedUser?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.error || "Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-[#FFD60A] rounded-lg flex items-center justify-center">
              <span className="text-[#0A192F] font-bold text-2xl">U</span>
            </div>
            <span className="text-3xl font-bold text-white">Unifyr</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-white/70">Sign in to your account to continue</p>
        </div>

        <Card variant="glass">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <FiAlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all"
                />
              </div>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#FFD60A] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-white/70">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#FFD60A] hover:underline font-semibold"
              >
                Sign up
              </Link>
            </div>
          </form>
        </Card>

        {/* Demo credentials hint */}
        <Card
          variant="glass"
          className="mt-6 bg-[#FFD60A]/5 border-[#FFD60A]/20"
        >
          <p className="text-white/70 text-sm text-center">
            <strong className="text-[#FFD60A]">Demo:</strong> Use any email
            (with "admin" for admin access)
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
