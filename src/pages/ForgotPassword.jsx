import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    // Check if user exists in localStorage
    const registeredUsers = JSON.parse(
      localStorage.getItem("unifyr_registered_users") || "[]"
    );
    const userExists = registeredUsers.find((u) => u.email === email);

    if (!userExists) {
      setError("No account found with this email address");
      setLoading(false);
      return;
    }

    // Generate a temporary password
    const tempPassword = "Unifyr" + Math.random().toString(36).slice(-6);

    // Update user's password
    const updatedUsers = registeredUsers.map((u) => {
      if (u.email === email) {
        return { ...u, password: tempPassword };
      }
      return u;
    });

    localStorage.setItem(
      "unifyr_registered_users",
      JSON.stringify(updatedUsers)
    );

    // Simulate sending email (in real app, this would be backend API call)
    setTimeout(() => {
      setNewPassword(tempPassword);
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full mb-4">
              <FiCheckCircle className="text-green-400" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Password Reset Successful
            </h1>
            <p className="text-white/70 mb-4">
              Your password has been reset successfully!
            </p>
          </div>

          <Card variant="glass">
            <div className="space-y-4">
              <div className="p-4 bg-[#FFD60A]/10 border border-[#FFD60A]/30 rounded-lg">
                <p className="text-white/90 text-sm mb-2">
                  <strong className="text-[#FFD60A]">Important:</strong> Save
                  this temporary password
                </p>
                <div className="bg-[#0A192F] border border-white/20 rounded p-3">
                  <p className="text-white font-mono text-lg text-center tracking-wider">
                    {newPassword}
                  </p>
                </div>
                <p className="text-white/60 text-xs mt-2">
                  ⚠️ This password is temporary. Please change it after logging
                  in by going to your profile settings.
                </p>
              </div>

              <div className="space-y-2 text-sm text-white/70">
                <p>✓ Copy the password above</p>
                <p>✓ Use it to log in to your account</p>
                <p>✓ Change it in your profile settings</p>
              </div>

              <Link to="/auth">
                <Button variant="primary" size="lg" className="w-full">
                  Go to Login
                </Button>
              </Link>

              <div className="text-center text-sm text-white/60">
                In a real app, this would be sent to your email:{" "}
                <strong className="text-white/90">{email}</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            Forgot Password?
          </h1>
          <p className="text-white/70">
            No worries! Enter your email and we'll reset your password
          </p>
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
              <div>
                <label className="text-sm font-medium text-white/90 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all"
                  />
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <FiArrowLeft size={16} />
              Back to Login
            </Link>
          </form>
        </Card>

        {/* Info Card */}
        <Card variant="glass" className="mt-6 bg-blue-500/5 border-blue-500/20">
          <div className="text-white/70 text-sm space-y-2">
            <p className="font-semibold text-white/90">📧 How it works:</p>
            <p>
              1. Enter your registered email address
              <br />
              2. We'll generate a new temporary password
              <br />
              3. Use it to login and change to your preferred password
            </p>
            <p className="text-xs text-white/50 mt-3">
              <strong>Note:</strong> In a production app, you would receive the
              password via email. This is a demo version using localStorage.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
