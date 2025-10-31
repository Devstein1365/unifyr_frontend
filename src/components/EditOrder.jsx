import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";

const EditOrder = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    status: order.status,
    price: order.price,
    type: order.type,
  });

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      ...formData,
      price: parseFloat(formData.price),
    };
    onSave(updatedOrder);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0A192F] border border-white/20 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit Order</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Order ID (Read-only) */}
          <div>
            <label className="text-sm font-medium text-white/90 mb-2 block">
              Order ID
            </label>
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50">
              {order.id}
            </div>
          </div>

          {/* Customer (Read-only) */}
          <div>
            <label className="text-sm font-medium text-white/90 mb-2 block">
              Customer
            </label>
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50">
              {order.customer}
            </div>
          </div>

          {/* Service (Read-only) */}
          <div>
            <label className="text-sm font-medium text-white/90 mb-2 block">
              Service
            </label>
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50">
              {order.service}
            </div>
          </div>

          {/* Type (Editable) */}
          <Input
            label="Type"
            name="type"
            type="text"
            value={formData.type}
            onChange={handleInputChange}
            required
          />

          {/* Status (Editable) */}
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={statusOptions}
            required
          />

          {/* Price (Editable) */}
          <Input
            label="Price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            required
          />

          {/* Action Buttons */}
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
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
