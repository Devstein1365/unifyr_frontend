import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await signup(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrors({
        general: result.error || "Signup failed. Please try again.",
      });
    }

    setLoading(false);
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return null;
    if (password.length < 6) return { label: "Weak", color: "text-red-400" };
    if (password.length < 10)
      return { label: "Medium", color: "text-yellow-400" };
    return { label: "Strong", color: "text-green-400" };
  };

  const strength = passwordStrength();

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
            Create Account
          </h1>
          <p className="text-white/70">Join Unifyr and manage your services</p>
        </div>

        <Card variant="glass">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <FiAlertCircle size={18} />
                <span>{errors.general}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <div className="relative">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
                      errors.name ? "border-red-400" : "border-white/20"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
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
                    className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
                      errors.email ? "border-red-400" : "border-white/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
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
                    className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
                      errors.password ? "border-red-400" : "border-white/20"
                    }`}
                  />
                </div>
                {strength && (
                  <p className={`text-xs mt-1 ml-1 ${strength.color}`}>
                    Password strength: {strength.label}
                  </p>
                )}
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <FiCheckCircle
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    size={18}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-white/20"
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="text-xs text-white/60">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-[#FFD60A] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#FFD60A] hover:underline">
                Privacy Policy
              </Link>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-white/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#FFD60A] hover:underline font-semibold"
              >
                Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
