import React, { useState } from "react";
import {
  FiPrinter,
  FiShoppingBag,
  FiBriefcase,
  FiHome,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const Demo = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    // Dynamic fields
    quantity: "",
    printType: "",
    material: "",
    positions: "",
    salaryRange: "",
    propertyType: "",
    budget: "",
    mealCount: "",
    deliveryTime: "",
    description: "",
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      value: "printing",
      label: "Printing & Branding",
      icon: FiPrinter,
      basePrice: 0.5,
    },
    {
      value: "food",
      label: "Food Delivery",
      icon: FiShoppingBag,
      basePrice: 5,
    },
    {
      value: "recruitment",
      label: "Recruitment & Hiring",
      icon: FiBriefcase,
      basePrice: 100,
    },
    { value: "realestate", label: "Real Estate", icon: FiHome, basePrice: 200 },
  ];

  const printTypes = [
    { value: "business_card", label: "Business Cards" },
    { value: "banner", label: "Banners" },
    { value: "flyer", label: "Flyers" },
    { value: "signage", label: "Signage" },
    { value: "sticker", label: "Stickers" },
  ];

  const materials = [
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium (+20%)" },
    { value: "luxury", label: "Luxury (+50%)" },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
  ];

  const salaryRanges = [
    { value: "0-30k", label: "$0 - $30,000" },
    { value: "30k-60k", label: "$30,000 - $60,000" },
    { value: "60k-100k", label: "$60,000 - $100,000" },
    { value: "100k+", label: "$100,000+" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    const service = services.find((s) => s.value === formData.service);
    let price = 0;

    switch (formData.service) {
      case "printing":
        price = service.basePrice * parseInt(formData.quantity || 0);
        if (formData.material === "premium") price *= 1.2;
        if (formData.material === "luxury") price *= 1.5;
        break;
      case "food":
        price = service.basePrice * parseInt(formData.mealCount || 0);
        break;
      case "recruitment":
        price = service.basePrice * parseInt(formData.positions || 1);
        break;
      case "realestate":
        price = service.basePrice; // Flat consultation fee
        break;
      default:
        price = 0;
    }

    setEstimatedPrice(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePrice();
    setIsSubmitted(true);
    // Here you would typically send data to backend
    console.log("Form submitted:", formData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      quantity: "",
      printType: "",
      material: "",
      positions: "",
      salaryRange: "",
      propertyType: "",
      budget: "",
      mealCount: "",
      deliveryTime: "",
      description: "",
    });
    setEstimatedPrice(null);
    setIsSubmitted(false);
    setSelectedService("");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Try Our <span className="text-[#FFD60A]">Live Demo</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Experience instant quotes and seamless order management. Get started
            in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Cards */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Select a Service
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {services.map((service) => (
                <Card
                  key={service.value}
                  variant="glass"
                  className={`cursor-pointer transition-all ${
                    selectedService === service.value
                      ? "border-[#FFD60A] border-2 bg-[#FFD60A]/10"
                      : "hover:border-[#FFD60A]/50"
                  }`}
                  onClick={() => {
                    setSelectedService(service.value);
                    setFormData((prev) => ({
                      ...prev,
                      service: service.value,
                    }));
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] flex items-center justify-center">
                      <service.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {service.label}
                      </h3>
                      <p className="text-xs text-white/60">
                        From ${service.basePrice}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Info Card */}
            <Card variant="glass" className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FiCheckCircle className="text-[#FFD60A]" />
                What You Get
              </h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>✓ Instant price calculation</li>
                <li>✓ Real-time order tracking</li>
                <li>✓ Email & SMS notifications</li>
                <li>✓ Secure payment processing</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </Card>
          </div>

          {/* Order Form */}
          <div>
            <Card variant="glass">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Request a Quote
                  </h2>

                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />

                    <Select
                      label="Service Type"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      options={services}
                      placeholder="Choose a service"
                      required
                    />

                    {/* Dynamic fields based on selected service */}
                    {formData.service === "printing" && (
                      <>
                        <Select
                          label="Print Type"
                          name="printType"
                          value={formData.printType}
                          onChange={handleInputChange}
                          options={printTypes}
                          placeholder="Select print type"
                          required
                        />
                        <Input
                          label="Quantity"
                          name="quantity"
                          type="number"
                          placeholder="100"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          required
                          min="1"
                        />
                        <Select
                          label="Material Quality"
                          name="material"
                          value={formData.material}
                          onChange={handleInputChange}
                          options={materials}
                          placeholder="Select material"
                          required
                        />
                      </>
                    )}

                    {formData.service === "food" && (
                      <>
                        <Input
                          label="Number of Meals"
                          name="mealCount"
                          type="number"
                          placeholder="10"
                          value={formData.mealCount}
                          onChange={handleInputChange}
                          required
                          min="1"
                        />
                        <Input
                          label="Preferred Delivery Time"
                          name="deliveryTime"
                          type="time"
                          value={formData.deliveryTime}
                          onChange={handleInputChange}
                          required
                        />
                      </>
                    )}

                    {formData.service === "recruitment" && (
                      <>
                        <Input
                          label="Number of Positions"
                          name="positions"
                          type="number"
                          placeholder="1"
                          value={formData.positions}
                          onChange={handleInputChange}
                          required
                          min="1"
                        />
                        <Select
                          label="Salary Range"
                          name="salaryRange"
                          value={formData.salaryRange}
                          onChange={handleInputChange}
                          options={salaryRanges}
                          placeholder="Select salary range"
                          required
                        />
                      </>
                    )}

                    {formData.service === "realestate" && (
                      <>
                        <Select
                          label="Property Type"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          options={propertyTypes}
                          placeholder="Select property type"
                          required
                        />
                        <Input
                          label="Budget Range"
                          name="budget"
                          type="text"
                          placeholder="e.g. $200,000 - $300,000"
                          value={formData.budget}
                          onChange={handleInputChange}
                          required
                        />
                      </>
                    )}

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/90">
                        Additional Details
                      </label>
                      <textarea
                        name="description"
                        placeholder="Tell us more about your requirements..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all resize-none"
                      />
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Get Instant Quote
                      <FiSend />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-[#FFD60A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="text-[#FFD60A]" size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Quote Generated!
                  </h2>
                  <p className="text-white/70 mb-6">
                    Thank you, {formData.name}! We've received your request.
                  </p>

                  {estimatedPrice && (
                    <div className="bg-[#FFD60A]/10 border border-[#FFD60A]/30 rounded-lg p-6 mb-6">
                      <p className="text-white/70 text-sm mb-2">
                        Estimated Price
                      </p>
                      <p className="text-5xl font-bold text-[#FFD60A]">
                        ${estimatedPrice.toFixed(2)}
                      </p>
                      <p className="text-white/50 text-xs mt-2">
                        *Final price may vary based on specifications
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-white/60 mb-6">
                    <p>📧 Confirmation sent to {formData.email}</p>
                    <p>📱 We'll contact you at {formData.phone}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" className="flex-1">
                      View Dashboard
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      New Quote
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
