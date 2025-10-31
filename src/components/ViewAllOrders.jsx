import React, { useState } from "react";
import {
  FiX,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiFilter,
} from "react-icons/fi";
import Button from "./ui/Button";
import Card from "./ui/Card";

const ViewAllOrders = ({ orders, onClose, onViewDetails }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

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
        return <FiCheckCircle size={16} />;
      case "in-progress":
        return <FiClock size={16} />;
      case "pending":
        return <FiPackage size={16} />;
      case "cancelled":
        return <FiX size={16} />;
      default:
        return <FiPackage size={16} />;
    }
  };

  // Filter orders
  let filteredOrders = orders;
  if (filterStatus !== "all") {
    filteredOrders = orders.filter((order) => order.status === filterStatus);
  }

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "price-desc":
        return b.price - a.price;
      case "price-asc":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0A192F] border border-white/20 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0A192F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">All Orders</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <FiFilter className="text-white/60" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD60A]"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD60A]"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Highest Price</option>
              <option value="price-asc">Lowest Price</option>
            </select>
          </div>

          {/* Orders Count */}
          <p className="text-white/60 text-sm mb-4">
            Showing {sortedOrders.length} of {orders.length} orders
          </p>

          {/* Orders List */}
          {sortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <FiPackage className="mx-auto text-white/30 mb-4" size={64} />
              <p className="text-white/60 text-lg">No orders found</p>
              <p className="text-white/40 text-sm mt-2">
                Try changing the filter
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedOrders.map((order) => (
                <Card
                  key={order.id}
                  variant="glass"
                  className="hover:bg-white/10 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white text-lg">
                          {order.id}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-1">
                        {order.service}
                      </p>
                      <p className="text-white/50 text-xs">
                        {order.type} • Qty: {order.quantity} • {order.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white/60 text-sm mb-1">Amount</p>
                        <p className="text-2xl font-bold text-[#FFD60A]">
                          ${order.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onViewDetails(order);
                          onClose();
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Close Button */}
          <div className="mt-6">
            <Button variant="secondary" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrders;
