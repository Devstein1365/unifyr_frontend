import React, { useState } from "react";
import {
  FiX,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiMapPin,
} from "react-icons/fi";
import Button from "./ui/Button";
import Card from "./ui/Card";

const TrackDelivery = ({ orders, onClose }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const activeOrders = orders.filter(
    (order) => order.status === "in-progress" || order.status === "pending"
  );

  const getDeliveryProgress = (status) => {
    switch (status) {
      case "pending":
        return { percentage: 25, step: 1, text: "Order Received" };
      case "in-progress":
        return { percentage: 60, step: 2, text: "Processing" };
      case "completed":
        return { percentage: 100, step: 3, text: "Delivered" };
      default:
        return { percentage: 0, step: 0, text: "Unknown" };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0A192F] border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0A192F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Track Delivery</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {activeOrders.length === 0 ? (
            <div className="text-center py-12">
              <FiPackage className="mx-auto text-white/30 mb-4" size={64} />
              <p className="text-white/60 text-lg">
                No active deliveries at the moment
              </p>
              <p className="text-white/40 text-sm mt-2">
                All your orders have been delivered!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => {
                const progress = getDeliveryProgress(order.status);
                const isSelected = selectedOrder?.id === order.id;

                return (
                  <Card
                    key={order.id}
                    variant="glass"
                    className={`cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-[#FFD60A]" : ""
                    }`}
                    onClick={() => setSelectedOrder(isSelected ? null : order)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {order.id}
                        </h3>
                        <p className="text-white/70 text-sm">{order.service}</p>
                        <p className="text-white/50 text-xs">{order.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#FFD60A] font-bold text-lg">
                          ${order.price.toFixed(2)}
                        </p>
                        <p className="text-white/60 text-xs">{order.date}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white/60 text-sm">{progress.text}</p>
                        <p className="text-[#FFD60A] text-sm font-semibold">
                          {progress.percentage}%
                        </p>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-[#FFD60A] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Delivery Steps */}
                    {isSelected && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-4">
                          Delivery Status
                        </h4>
                        <div className="space-y-6">
                          {/* Step 1 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  progress.step >= 1
                                    ? "bg-[#FFD60A]"
                                    : "bg-white/10"
                                }`}
                              >
                                <FiCheckCircle
                                  className={
                                    progress.step >= 1
                                      ? "text-[#0A192F]"
                                      : "text-white/40"
                                  }
                                  size={20}
                                />
                              </div>
                              {progress.step >= 1 && (
                                <div className="w-0.5 h-12 bg-[#FFD60A] mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">
                                Order Confirmed
                              </p>
                              <p className="text-white/60 text-sm">
                                Your order has been received
                              </p>
                              <p className="text-white/40 text-xs mt-1">
                                {order.date}
                              </p>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  progress.step >= 2
                                    ? "bg-[#FFD60A]"
                                    : "bg-white/10"
                                }`}
                              >
                                <FiTruck
                                  className={
                                    progress.step >= 2
                                      ? "text-[#0A192F]"
                                      : "text-white/40"
                                  }
                                  size={20}
                                />
                              </div>
                              {progress.step >= 2 && (
                                <div className="w-0.5 h-12 bg-[#FFD60A] mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">
                                Processing
                              </p>
                              <p className="text-white/60 text-sm">
                                {order.status === "in-progress"
                                  ? "Currently being processed"
                                  : "Waiting to be processed"}
                              </p>
                              {order.status === "in-progress" && (
                                <p className="text-white/40 text-xs mt-1">
                                  Estimated completion: 2-3 days
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  progress.step >= 3
                                    ? "bg-[#FFD60A]"
                                    : "bg-white/10"
                                }`}
                              >
                                <FiMapPin
                                  className={
                                    progress.step >= 3
                                      ? "text-[#0A192F]"
                                      : "text-white/40"
                                  }
                                  size={20}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">
                                Delivered
                              </p>
                              <p className="text-white/60 text-sm">
                                {order.status === "completed"
                                  ? "Order delivered successfully"
                                  : "Pending delivery"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mock Location */}
                        <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <FiMapPin
                              className="text-[#FFD60A] mt-1"
                              size={20}
                            />
                            <div>
                              <p className="text-white font-medium mb-1">
                                Current Location
                              </p>
                              <p className="text-white/70 text-sm">
                                {order.status === "in-progress"
                                  ? "Processing at facility - 123 Main St, City"
                                  : "Awaiting processing"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}

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

export default TrackDelivery;
