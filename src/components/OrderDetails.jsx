import React from "react";
import {
  FiX,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import Button from "./ui/Button";

const OrderDetails = ({ order, onClose }) => {
  const downloadInvoice = () => {
    // Create invoice text content
    const invoiceContent = `
UNIFYR - INVOICE
=====================================

Order ID: ${order.id}
Date: ${order.date}
Status: ${order.status.toUpperCase()}

-------------------------------------
SERVICE DETAILS
-------------------------------------
Service: ${order.service}
Type: ${order.type}
Quantity: ${order.quantity}

-------------------------------------
BILLING
-------------------------------------
Subtotal: $${order.price.toFixed(2)}
Tax (0%): $0.00
Total: $${order.price.toFixed(2)}

-------------------------------------
Thank you for your business!
Visit us at unifyr.com
=====================================
    `;

    // Create blob and download
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle size={20} />;
      case "in-progress":
        return <FiClock size={20} />;
      case "pending":
        return <FiPackage size={20} />;
      case "cancelled":
        return <FiX size={20} />;
      default:
        return <FiPackage size={20} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0A192F] border border-white/20 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0A192F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Order Details</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{order.id}</h3>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm px-3 py-1.5 rounded-full border flex items-center gap-2 font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm mb-1">Total Amount</p>
              <p className="text-4xl font-bold text-[#FFD60A]">
                ${order.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiPackage className="text-[#FFD60A]" size={20} />
                <p className="text-white/60 text-sm">Service</p>
              </div>
              <p className="text-white font-semibold text-lg">
                {order.service}
              </p>
              <p className="text-white/70 text-sm mt-1">{order.type}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCalendar className="text-[#FFD60A]" size={20} />
                <p className="text-white/60 text-sm">Order Date</p>
              </div>
              <p className="text-white font-semibold text-lg">{order.date}</p>
              <p className="text-white/70 text-sm mt-1">
                {new Date(order.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiDollarSign className="text-[#FFD60A]" size={20} />
                <p className="text-white/60 text-sm">Quantity</p>
              </div>
              <p className="text-white font-semibold text-lg">
                {order.quantity} units
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiMapPin className="text-[#FFD60A]" size={20} />
                <p className="text-white/60 text-sm">Delivery Status</p>
              </div>
              <p className="text-white font-semibold text-lg">
                {order.status === "completed"
                  ? "Delivered"
                  : order.status === "in-progress"
                  ? "In Transit"
                  : "Processing"}
              </p>
            </div>
          </div>

          {/* Additional Details */}
          {order.details && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">
                Additional Information
              </h4>
              <div className="space-y-2 text-sm">
                {order.details.description && (
                  <div>
                    <span className="text-white/60">Description: </span>
                    <span className="text-white">
                      {order.details.description}
                    </span>
                  </div>
                )}
                {order.details.printType && (
                  <div>
                    <span className="text-white/60">Print Type: </span>
                    <span className="text-white capitalize">
                      {order.details.printType.replace("_", " ")}
                    </span>
                  </div>
                )}
                {order.details.material && (
                  <div>
                    <span className="text-white/60">Material: </span>
                    <span className="text-white capitalize">
                      {order.details.material}
                    </span>
                  </div>
                )}
                {order.details.mealCount && (
                  <div>
                    <span className="text-white/60">Meal Count: </span>
                    <span className="text-white">
                      {order.details.mealCount}
                    </span>
                  </div>
                )}
                {order.details.deliveryTime && (
                  <div>
                    <span className="text-white/60">Delivery Time: </span>
                    <span className="text-white">
                      {order.details.deliveryTime}
                    </span>
                  </div>
                )}
                {order.details.positions && (
                  <div>
                    <span className="text-white/60">Positions: </span>
                    <span className="text-white">
                      {order.details.positions}
                    </span>
                  </div>
                )}
                {order.details.salaryRange && (
                  <div>
                    <span className="text-white/60">Salary Range: </span>
                    <span className="text-white">
                      {order.details.salaryRange}
                    </span>
                  </div>
                )}
                {order.details.propertyType && (
                  <div>
                    <span className="text-white/60">Property Type: </span>
                    <span className="text-white capitalize">
                      {order.details.propertyType}
                    </span>
                  </div>
                )}
                {order.details.budget && (
                  <div>
                    <span className="text-white/60">Budget: </span>
                    <span className="text-white">{order.details.budget}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline (Mock data for now) */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-4">Order Timeline</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-0.5 h-full bg-white/20"></div>
                </div>
                <div className="pb-4">
                  <p className="text-white font-medium">Order Placed</p>
                  <p className="text-white/60 text-sm">{order.date}</p>
                </div>
              </div>
              {order.status !== "pending" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="w-0.5 h-full bg-white/20"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-white font-medium">Processing Started</p>
                    <p className="text-white/60 text-sm">In progress</p>
                  </div>
                </div>
              )}
              {order.status === "completed" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Delivered</p>
                    <p className="text-white/60 text-sm">
                      Order completed successfully
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={downloadInvoice}
            >
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
