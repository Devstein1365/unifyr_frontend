import React, { useState } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import OrderDetails from "../components/OrderDetails";
import EditOrder from "../components/EditOrder";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  // Mock data - replace with API calls
  const [allOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      service: "Printing",
      type: "Business Cards",
      status: "completed",
      date: "2025-10-28",
      price: 250.0,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      service: "Food Delivery",
      type: "Office Lunch",
      status: "in-progress",
      date: "2025-10-30",
      price: 75.0,
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      service: "Recruitment",
      type: "Developer",
      status: "pending",
      date: "2025-10-29",
      price: 200.0,
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      service: "Real Estate",
      type: "Property Listing",
      status: "in-progress",
      date: "2025-10-27",
      price: 300.0,
    },
    {
      id: "ORD-005",
      customer: "Tom Brown",
      service: "Printing",
      type: "Banners",
      status: "completed",
      date: "2025-10-26",
      price: 150.0,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  // Export to CSV
  const exportToCSV = () => {
    const csvHeaders = "Order ID,Customer,Service,Type,Status,Date,Price\n";
    const csvData = filteredOrders
      .map(
        (order) =>
          `${order.id},${order.customer},${order.service},${order.type},${order.status},${order.date},${order.price}`
      )
      .join("\n");

    const csvContent = csvHeaders + csvData;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `unifyr-orders-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const stats = [
    {
      label: "Total Orders",
      value: allOrders.length,
      change: "+12%",
      icon: FiShoppingCart,
      color: "#FFD60A",
    },
    {
      label: "Total Users",
      value: "47",
      change: "+8%",
      icon: FiUsers,
      color: "#3B82F6",
    },
    {
      label: "Revenue",
      value: `$${allOrders.reduce((sum, o) => sum + o.price, 0).toFixed(0)}`,
      change: "+23%",
      icon: FiDollarSign,
      color: "#10B981",
    },
    {
      label: "Completion Rate",
      value: `${Math.round(
        (allOrders.filter((o) => o.status === "completed").length /
          allOrders.length) *
          100
      )}%`,
      change: "+5%",
      icon: FiTrendingUp,
      color: "#F59E0B",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

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
        return <FiCheckCircle size={14} />;
      case "in-progress":
        return <FiClock size={14} />;
      case "pending":
        return <FiPackage size={14} />;
      case "cancelled":
        return <FiX size={14} />;
      default:
        return <FiPackage size={14} />;
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? allOrders
      : allOrders.filter((order) => order.status === filterStatus);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Admin <span className="text-[#FFD60A]">Dashboard</span>
          </h1>
          <p className="text-white/70">
            Welcome, {user?.name} • Manage all orders and users
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              variant="glass"
              className="hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <stat.icon size={24} />
                </div>
                <span className="text-green-400 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <p className="text-white/60 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Orders Management */}
        <Card variant="glass">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">All Orders</h2>
            <div className="flex gap-3">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={statusOptions}
                className="min-w-[200px]"
              />
              <Button variant="primary" size="sm" onClick={exportToCSV}>
                Export CSV
              </Button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold text-sm">
                    Price
                  </th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-medium">
                      {order.id}
                    </td>
                    <td className="py-4 px-4 text-white/80">
                      {order.customer}
                    </td>
                    <td className="py-4 px-4 text-white/80">{order.service}</td>
                    <td className="py-4 px-4 text-white/60 text-sm">
                      {order.type}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/60 text-sm">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 text-right text-[#FFD60A] font-semibold">
                      ${order.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingOrder(order)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/50">No orders found with this status</p>
            </div>
          )}
        </Card>
      </div>

      {/* Modals */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {editingOrder && (
        <EditOrder
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={(updatedOrder) => {
            alert(
              `Order ${updatedOrder.id} updated!\nStatus: ${updatedOrder.status}\nPrice: $${updatedOrder.price}\n\nThis will update localStorage when backend is connected.`
            );
          }}
        />
      )}
    </div>
  );
};

export default Admin;
