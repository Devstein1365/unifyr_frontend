import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { user, login, signup, isAdmin } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin()) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate, isAdmin]);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
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

    if (isLogin) {
      // Admin validation
      if (
        formData.email === "admin@unifyr.com" &&
        formData.password === "admin2025"
      ) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate("/admin");
        }
      } else if (
        formData.email === "admin@unifyr.com" &&
        formData.password !== "admin2025"
      ) {
        setErrors({ general: "Invalid admin credentials" });
        setLoading(false);
        return;
      } else {
        // Regular user login
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate("/dashboard");
        } else {
          setErrors({ general: result.error || "Invalid email or password" });
        }
      }
    } else {
      // Prevent admin email signup
      if (formData.email === "admin@unifyr.com") {
        setErrors({ general: "This email is reserved" });
        setLoading(false);
        return;
      }
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
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
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
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-white/70">
            {isLogin
              ? "Sign in to your account to continue"
              : "Join Unifyr and manage your services"}
          </p>
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
              {/* Name - only for signup */}
              {!isLogin && (
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
              )}

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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-12 pr-12 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
                      errors.password ? "border-red-400" : "border-white/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {!isLogin && strength && (
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

              {/* Confirm Password - only for signup */}
              {!isLogin && (
                <div>
                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-12 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
                        errors.confirmPassword
                          ? "border-red-400"
                          : "border-white/20"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div className="flex items-center gap-1 mt-1 ml-1">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <FiCheckCircle className="text-green-400" size={14} />
                          <p className="text-xs text-green-400">
                            Passwords match
                          </p>
                        </>
                      ) : (
                        <>
                          <FiAlertCircle className="text-red-400" size={14} />
                          <p className="text-xs text-red-400">
                            Passwords do not match
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1 ml-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Remember me / Forgot password - only for login */}
            {isLogin && (
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
            )}

            {/* Terms - only for signup */}
            {!isLogin && (
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
            )}

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>

            <div className="text-center text-sm text-white/70">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-[#FFD60A] hover:underline font-semibold"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
