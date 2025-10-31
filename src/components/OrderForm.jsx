import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const OrderForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    service: "",
    // Printing fields
    printType: "",
    quantity: "",
    material: "",
    // Food fields
    mealCount: "",
    deliveryTime: "",
    // Recruitment fields
    positions: "",
    salaryRange: "",
    // Real Estate fields
    propertyType: "",
    budget: "",
    // Common
    description: "",
  });

  const services = [
    { value: "printing", label: "Printing & Branding" },
    { value: "food", label: "Food Delivery" },
    { value: "recruitment", label: "Recruitment & Hiring" },
    { value: "realestate", label: "Real Estate" },
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
    let price = 0;
    switch (formData.service) {
      case "printing":
        price = 0.5 * parseInt(formData.quantity || 0);
        if (formData.material === "premium") price *= 1.2;
        if (formData.material === "luxury") price *= 1.5;
        break;
      case "food":
        price = 5 * parseInt(formData.mealCount || 0);
        break;
      case "recruitment":
        price = 100 * parseInt(formData.positions || 1);
        break;
      case "realestate":
        price = 200;
        break;
      default:
        price = 0;
    }
    return price.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      service: services.find((s) => s.value === formData.service)?.label || "",
      type: getOrderType(),
      quantity: getOrderQuantity(),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      price: parseFloat(calculatePrice()),
      details: formData,
    };
    onSubmit(orderData);
  };

  const getOrderType = () => {
    switch (formData.service) {
      case "printing":
        return (
          printTypes.find((p) => p.value === formData.printType)?.label ||
          "Print Order"
        );
      case "food":
        return "Food Order";
      case "recruitment":
        return "Job Posting";
      case "realestate":
        return (
          propertyTypes.find((p) => p.value === formData.propertyType)?.label ||
          "Property"
        );
      default:
        return "Order";
    }
  };

  const getOrderQuantity = () => {
    switch (formData.service) {
      case "printing":
        return parseInt(formData.quantity || 0);
      case "food":
        return parseInt(formData.mealCount || 0);
      case "recruitment":
        return parseInt(formData.positions || 0);
      case "realestate":
        return 1;
      default:
        return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0A192F] border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0A192F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create New Order</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          {formData.service && (
            <div className="bg-[#FFD60A]/10 border border-[#FFD60A]/30 rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1">Estimated Price</p>
              <p className="text-3xl font-bold text-[#FFD60A]">
                ${calculatePrice()}
              </p>
              <p className="text-white/50 text-xs mt-1">
                *Final price may vary based on specifications
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1">
              Create Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
