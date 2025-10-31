import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiShield,
  FiBarChart,
  FiBell,
  FiSmartphone,
} from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: FiCheckCircle,
      title: "Instant Automation",
      description:
        "Automate quotes, orders, and workflows. No more manual back-and-forth.",
    },
    {
      icon: FiClock,
      title: "Real-Time Updates",
      description:
        "Track everything live — orders, deliveries, applications, and more.",
    },
    {
      icon: FiShield,
      title: "Secure & Reliable",
      description:
        "Bank-level security. Your data is encrypted and protected 24/7.",
    },
    {
      icon: FiBarChart,
      title: "Analytics Dashboard",
      description:
        "Get insights on revenue, popular services, and customer behavior.",
    },
    {
      icon: FiBell,
      title: "Smart Notifications",
      description: "Never miss an order or request with email and SMS alerts.",
    },
    {
      icon: FiSmartphone,
      title: "Mobile Responsive",
      description:
        "Manage your business from anywhere — desktop, tablet, or phone.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for <span className="text-[#FFD60A]">Speed & Control</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything you need to run multiple services smoothly, all in one
              place.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
