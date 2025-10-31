import React, { useState, useEffect } from "react";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiX,
  FiTrendingUp,
  FiShoppingCart,
} from "react-icons/fi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import OrderForm from "../components/OrderForm";
import OrderDetails from "../components/OrderDetails";
import TrackDelivery from "../components/TrackDelivery";
import ViewInvoices from "../components/ViewInvoices";
import EditProfile from "../components/EditProfile";
import ViewAllOrders from "../components/ViewAllOrders";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showTrackDelivery, setShowTrackDelivery] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem(`orders_${user?.email}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Initialize with mock data if no orders exist
      const initialOrders = [
        {
          id: "ORD-001",
          service: "Printing & Branding",
          type: "Business Cards",
          quantity: 500,
          status: "completed",
          date: "2025-10-28",
          price: 250.0,
        },
        {
          id: "ORD-002",
          service: "Food Delivery",
          type: "Office Lunch",
          quantity: 15,
          status: "in-progress",
          date: "2025-10-30",
          price: 75.0,
        },
        {
          id: "ORD-003",
          service: "Recruitment",
          type: "Software Engineer",
          quantity: 2,
          status: "pending",
          date: "2025-10-29",
          price: 200.0,
        },
      ];
      setOrders(initialOrders);
      localStorage.setItem(
        `orders_${user?.email}`,
        JSON.stringify(initialOrders)
      );
    }
  }, [user?.email]);

  // Handle new order submission
  const handleOrderSubmit = (orderData) => {
    const newOrders = [orderData, ...orders];
    setOrders(newOrders);
    localStorage.setItem(`orders_${user?.email}`, JSON.stringify(newOrders));
    setShowOrderForm(false);
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

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: FiShoppingCart,
      color: "#FFD60A",
    },
    {
      label: "Completed",
      value: orders.filter((o) => o.status === "completed").length,
      icon: FiCheckCircle,
      color: "#10B981",
    },
    {
      label: "In Progress",
      value: orders.filter((o) => o.status === "in-progress").length,
      icon: FiClock,
      color: "#3B82F6",
    },
    {
      label: "Total Spent",
      value: `$${orders.reduce((sum, o) => sum + o.price, 0).toFixed(2)}`,
      icon: FiTrendingUp,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-[#FFD60A]">{user?.name}!</span>
          </h1>
          <p className="text-white/70">
            Here's what's happening with your orders
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <stat.icon size={24} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card variant="glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllOrders(true)}
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white">
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
                      <p className="text-white/70 text-sm">{order.service}</p>
                      <p className="text-white/50 text-xs">
                        {order.type} • Qty: {order.quantity} • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#FFD60A] font-bold">
                        ${order.price.toFixed(2)}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-2"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions & Profile */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card variant="glass">
              <h3 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowOrderForm(true)}
                >
                  New Order
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowTrackDelivery(true)}
                >
                  Track Delivery
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowInvoices(true)}
                >
                  View Invoices
                </Button>
              </div>
            </Card>

            {/* Profile Info */}
            <Card variant="glass">
              <h3 className="text-xl font-bold text-white mb-4">Profile</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-white/60 text-sm">Name</p>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Account Type</p>
                  <p className="text-white font-medium capitalize">
                    {user?.role}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowEditProfile(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showOrderForm && (
        <OrderForm
          onClose={() => setShowOrderForm(false)}
          onSubmit={handleOrderSubmit}
        />
      )}

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {showTrackDelivery && (
        <TrackDelivery
          orders={orders}
          onClose={() => setShowTrackDelivery(false)}
        />
      )}

      {showInvoices && (
        <ViewInvoices orders={orders} onClose={() => setShowInvoices(false)} />
      )}

      {showEditProfile && (
        <EditProfile onClose={() => setShowEditProfile(false)} />
      )}

      {showAllOrders && (
        <ViewAllOrders
          orders={orders}
          onClose={() => setShowAllOrders(false)}
          onViewDetails={(order) => setSelectedOrder(order)}
        />
      )}
    </div>
  );
};

export default Dashboard;
