import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap, FiTrendingUp } from "react-icons/fi";
import Button from "./ui/Button";
import Card from "./ui/Card";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFD60A]/10 border border-[#FFD60A]/30 rounded-full px-4 py-2 mb-6">
            <FiZap className="text-[#FFD60A]" size={16} />
            <span className="text-[#FFD60A] text-sm font-semibold">
              Manage all your business arms from one digital hub.
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            All Your Services,
            <br />
            <span className="text-[#FFD60A]">One Dashboard</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Centralize printing, food ordering, recruitment, real estate, and
            more. Speed up operations, reduce costs, and take control of your
            digital ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/auth">
              <Button variant="primary" size="lg">
                Get Started
                <FiArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="secondary" size="lg">
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card variant="glass" className="text-center">
              <div className="text-4xl font-bold text-[#FFD60A] mb-2">80%</div>
              <p className="text-white/70 text-sm">Faster Order Processing</p>
            </Card>
            <Card variant="glass" className="text-center">
              <div className="text-4xl font-bold text-[#FFD60A] mb-2">5+</div>
              <p className="text-white/70 text-sm">Unified Services</p>
            </Card>
            <Card variant="glass" className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-[#FFD60A] mb-2">
                <FiTrendingUp size={32} />
                100%
              </div>
              <p className="text-white/70 text-sm">In-House Control</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
