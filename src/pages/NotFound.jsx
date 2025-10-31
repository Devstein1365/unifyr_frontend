import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    if (user) {
      // Redirect to appropriate dashboard if logged in
      if (isAdmin()) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-[#FFD60A] rounded-lg flex items-center justify-center">
              <span className="text-[#0A192F] font-bold text-2xl">U</span>
            </div>
            <span className="text-3xl font-bold text-white">Unifyr</span>
          </Link>

          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/20 border-2 border-red-500 rounded-full mb-6">
            <FiAlertCircle className="text-red-400" size={48} />
          </div>

          <h1 className="text-8xl md:text-9xl font-bold text-[#FFD60A] mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Page Not Found
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Oops! The page you're looking for seems to have gone missing. Let's
            get you back on track.
          </p>
        </div>

        <Card variant="glass">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGoHome}
                className="flex items-center justify-center gap-2"
              >
                <FiHome size={20} />
                {user ? "Go to Dashboard" : "Go to Home"}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleGoBack}
                className="flex items-center justify-center gap-2"
              >
                <FiArrowLeft size={20} />
                Go Back
              </Button>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm text-center mb-3">
                Or try these helpful links:
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {!user ? (
                  <>
                    <Link
                      to="/"
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Home
                    </Link>
                    <span className="text-white/30">•</span>
                    <Link
                      to="/demo"
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Demo
                    </Link>
                    <span className="text-white/30">•</span>
                    <Link
                      to="/contact"
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Contact
                    </Link>
                    <span className="text-white/30">•</span>
                    <Link
                      to="/auth"
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={isAdmin() ? "/admin" : "/dashboard"}
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Dashboard
                    </Link>
                    <span className="text-white/30">•</span>
                    <Link
                      to="/"
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Home
                    </Link>
                    <span className="text-white/30">•</span>
                    <Link
                      to="/contact"
                      className="text-[#FFD60A] hover:underline font-medium"
                    >
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Fun Error Message */}
        <Card
          variant="glass"
          className="mt-6 bg-[#FFD60A]/5 border-[#FFD60A]/20"
        >
          <div className="text-center">
            <p className="text-white/70 text-sm">
              <strong className="text-[#FFD60A]">Fun Fact:</strong> This page
              might not exist, but your journey with Unifyr continues! 🚀
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
