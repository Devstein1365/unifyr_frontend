import React, { useState } from "react";
import {
  FiX,
  FiDownload,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiFilter,
} from "react-icons/fi";
import Button from "./ui/Button";
import Card from "./ui/Card";

const ViewInvoices = ({ orders, onClose }) => {
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const paidInvoices = orders.filter((o) => o.status === "completed").length;

  const downloadInvoice = (order) => {
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

  const downloadAllInvoices = () => {
    filteredOrders.forEach((order, index) => {
      setTimeout(() => {
        downloadInvoice(order);
      }, index * 200); // Stagger downloads by 200ms
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0A192F] border border-white/20 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0A192F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Invoices</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card variant="glass">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#FFD60A]/20 flex items-center justify-center">
                  <FiFileText className="text-[#FFD60A]" size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Invoices</p>
                  <p className="text-2xl font-bold text-white">
                    {orders.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <FiDollarSign className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Paid Invoices</p>
                  <p className="text-2xl font-bold text-white">
                    {paidInvoices}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <FiDollarSign className="text-blue-400" size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 mb-6">
            <FiFilter className="text-white/60" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD60A]"
            >
              <option value="all">All Invoices</option>
              <option value="completed">Paid</option>
              <option value="in-progress">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Invoices List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="mx-auto text-white/30 mb-4" size={64} />
              <p className="text-white/60 text-lg">No invoices found</p>
              <p className="text-white/40 text-sm mt-2">
                Try changing the filter
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  variant="glass"
                  className="hover:bg-white/10 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FiFileText className="text-[#FFD60A]" size={20} />
                        <h3 className="text-white font-semibold text-lg">
                          {order.id}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="ml-8 space-y-1">
                        <p className="text-white/70 text-sm">{order.service}</p>
                        <p className="text-white/50 text-xs">
                          {order.type} • Qty: {order.quantity}
                        </p>
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <FiCalendar size={12} />
                          <span>{order.date}</span>
                        </div>
                      </div>
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
                        onClick={() => downloadInvoice(order)}
                        className="flex items-center gap-2"
                      >
                        <FiDownload size={16} />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={downloadAllInvoices}
              disabled={filteredOrders.length === 0}
            >
              Download All ({filteredOrders.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoices;
