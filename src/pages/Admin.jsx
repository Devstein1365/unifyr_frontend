import React, { useState, useEffect } from "react";
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
import * as XLSX from "xlsx";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import OrderDetails from "../components/OrderDetails";
import EditOrder from "../components/EditOrder";
import { useAuth } from "../context/AuthContext";
import { adminAPI } from "../services/api";

const Admin = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all orders and stats from backend
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);

        // Load stats
        const statsResponse = await adminAPI.getStats();
        if (statsResponse.success) {
          setStats(statsResponse.stats);
        }

        // Load all orders
        const ordersResponse = await adminAPI.getAllOrders();
        if (ordersResponse.success) {
          setAllOrders(ordersResponse.orders || []);
        }
      } catch (error) {
        console.error("Error loading admin data:", error);
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      loadAdminData();

      // Refresh orders every 30 seconds
      const interval = setInterval(loadAdminData, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Use real orders from backend
  const displayOrders = allOrders;

  const [filterStatus, setFilterStatus] = useState("all");

  // Export to Excel
  const exportToExcel = () => {
    // Prepare data for Excel
    const excelData = filteredOrders.map((order) => ({
      "Order ID": order.id,
      Customer: order.customer,
      Service: order.service,
      Type: order.type,
      Status: order.status.toUpperCase(),
      Date: order.date,
      Price: order.price,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 12 }, // Order ID
      { wch: 20 }, // Customer
      { wch: 18 }, // Service
      { wch: 20 }, // Type
      { wch: 12 }, // Status
      { wch: 15 }, // Date
      { wch: 12 }, // Price
    ];

    // Style header row
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0A192F" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Add metadata
    workbook.Props = {
      Title: "Unifyr Orders Export",
      Subject: "Orders Report",
      Author: "Unifyr Platform",
      CreatedDate: new Date(),
    };

    // Generate filename with current date
    const filename = `Unifyr_Orders_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;

    // Download
    XLSX.writeFile(workbook, filename);
  };

  // Dynamic stats from backend
  const statsDisplay = stats
    ? [
        {
          label: "Total Orders",
          value: stats.totalOrders || 0,
          change: "+12%",
          icon: FiShoppingCart,
          color: "#FFD60A",
        },
        {
          label: "Total Users",
          value: stats.totalUsers || 0,
          change: "+8%",
          icon: FiUsers,
          color: "#3B82F6",
        },
        {
          label: "Revenue",
          value: `$${stats.totalRevenue?.toFixed(0) || 0}`,
          change: "+23%",
          icon: FiDollarSign,
          color: "#10B981",
        },
        {
          label: "Completion Rate",
          value:
            stats.totalOrders > 0
              ? `${Math.round(
                  (stats.completedOrders / stats.totalOrders) * 100
                )}%`
              : "0%",
          change: "+5%",
          icon: FiTrendingUp,
          color: "#F59E0B",
        },
      ]
    : [];

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
      ? displayOrders
      : displayOrders.filter((order) => order.status === filterStatus);

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
          {loading ? (
            <div className="col-span-4 text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD60A] mx-auto"></div>
              <p className="text-white/60 mt-4">Loading stats...</p>
            </div>
          ) : (
            statsDisplay.map((stat, index) => (
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
            ))
          )}
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
              <Button variant="primary" size="sm" onClick={exportToExcel}>
                Export Excel
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
                {loading ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD60A] mx-auto"></div>
                      <p className="text-white/60 mt-4">Loading orders...</p>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center">
                      <p className="text-white/50">
                        No orders found with this status
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.orderId || order.id || order._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-medium">
                        {order.orderId || order.id}
                      </td>
                      <td className="py-4 px-4 text-white/80">
                        {order.customer?.name || order.customer}
                      </td>
                      <td className="py-4 px-4 text-white/80">
                        {order.service}
                      </td>
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
                        {new Date(order.date).toLocaleDateString()}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
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
            // Find the user who owns this order
            const registeredUsers = JSON.parse(
              localStorage.getItem("unifyr_registered_users") || "[]"
            );

            // Find which user has this order
            let orderOwnerEmail = null;
            registeredUsers.forEach((regUser) => {
              const userOrders = localStorage.getItem(
                `orders_${regUser.email}`
              );
              if (userOrders) {
                const orders = JSON.parse(userOrders);
                if (orders.some((o) => o.id === updatedOrder.id)) {
                  orderOwnerEmail = regUser.email;
                }
              }
            });

            if (orderOwnerEmail) {
              // Update the order in the user's localStorage
              const userOrders = JSON.parse(
                localStorage.getItem(`orders_${orderOwnerEmail}`) || "[]"
              );
              const updatedUserOrders = userOrders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
              );
              localStorage.setItem(
                `orders_${orderOwnerEmail}`,
                JSON.stringify(updatedUserOrders)
              );

              // Update the local state
              const updatedAllOrders = allOrders.map((order) =>
                order.id === updatedOrder.id
                  ? { ...updatedOrder, customer: order.customer }
                  : order
              );
              setAllOrders(updatedAllOrders);

              alert(`Order ${updatedOrder.id} updated successfully!`);
            } else {
              alert("Could not find order owner. Order not updated.");
            }

            setEditingOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
