import React from "react";
import {
  FiPrinter,
  FiShoppingBag,
  FiUsers,
  FiHome,
  FiTool,
  FiBriefcase,
} from "react-icons/fi";
import Card from "./ui/Card";

const Services = () => {
  const services = [
    {
      icon: FiPrinter,
      title: "Printing & Branding",
      description:
        "Business cards, banners, signage, and full branding solutions with instant quotes.",
      color: "#FFD60A",
    },
    {
      icon: FiShoppingBag,
      title: "Food Delivery",
      description:
        "Manage orders, track deliveries, and connect customers with local restaurants.",
      color: "#10B981",
    },
    {
      icon: FiBriefcase,
      title: "Recruitment & Hiring",
      description:
        "Post jobs, review applications, schedule interviews, and build your team.",
      color: "#3B82F6",
    },
    {
      icon: FiHome,
      title: "Real Estate",
      description:
        "List properties, manage inquiries, schedule viewings, and close deals faster.",
      color: "#F59E0B",
    },
    {
      icon: FiTool,
      title: "Mechanical Services",
      description:
        "From mechanical stripping to repairs — track jobs and manage service requests.",
      color: "#EF4444",
    },
    {
      icon: FiUsers,
      title: "Custom Solutions",
      description:
        "Need something unique? We build tailored modules for your specific business needs.",
      color: "#8B5CF6",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-6 bg-linear-to-b from-[#0A192F] to-[#0d1f35]"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            One Platform,{" "}
            <span className="text-[#FFD60A]">Endless Services</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            From printing to real estate, manage all your business operations in
            one unified dashboard.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="glass"
              className="hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                }}
              >
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
