
import { useQuery } from "@tanstack/react-query";
import { orderApi, statsApi } from "../library/api.js";
import {
  Banknote,
  Package2Icon,
  ShoppingBagIcon,
  User2Icon,
} from "lucide-react";
import { capitalizeText, formatDate, getOrderStatusBadge } from "../library/utils.js";

function DashboardPage() {
  const {
    data: ordersData,
    isLoading: ordersLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });

  const {
    data: statsData,
    isLoading: statsLoading,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: statsApi.getDashboard,
  });

  // Ambil maksimal 5 pesanan terbaru.
  // Pastikan backend mengurutkan pesanan dari yang terbaru.

  const recentOrders = (ordersData?.orders ?? []).slice(0, 5);

  // Format angka menjadi Rupiah.

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(value ?? 0);

  const statsCard = [
    {
      name: "Total Revenue",
      value: statsLoading
        ? "..."
        : formatRupiah(statsData?.totalRevenue || 0),
      icon: <Banknote className="size-8" />,
    },
    {
      name: "Total Orders",
      value: statsLoading ? "..." : (statsData?.totalOrders || 0),
      icon: <ShoppingBagIcon className="size-8" />,
    },
    {
      name: "Total Customers",
      value: statsLoading ? "..." : (statsData?.totalCustomers || 0),
      icon: <User2Icon className="size-8" />,
    },
    {
      name: "Total Products",
      value: statsLoading ? "..." : (statsData?.totalProducts || 0),
      icon: <Package2Icon className="size-8" />,
    },
  ];

  return (
    <div className="space-y-6">

      {/* STATS */}

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
        {statsCard.map((stat) => (
          <div key={stat.name} className="stat">
            <div className="stat-figure text-primary">
              {stat.icon}
            </div>

            <div className="stat-title">
              {stat.name}
            </div>

           <div className="stat-value text-xl">
            {stat.name === "Total Revenue" ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-normal">Rp</span>
                <span>{stat.value}</span>
                </div> ) : ( stat.value)}
                </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS dapat ditampilkan di bagian ini */}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title ">Recent Orders</h2>

            {ordersLoading ? (                                               
              <div className="flex justify-center py-8">                     
                <span className="loading loading-spinner loading-lg"/>

              </div>
            ) : recentOrders.length === 0 ? (                                                   
              <div className="text-center py-8 text-base-content/60">No orders yet</div>        
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Item</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  
<tbody>
  {recentOrders.map((order) => {
    const items = order.orderItem ?? [];

    return (
      <tr key={order._id}>
        <td>
          <span className="font-medium">
            #{order._id.slice(-8).toUpperCase()}
          </span>
        </td>

        <td>
          <div className="font-medium">
            {order.shippingAddress?.fullName ?? "Unknown"}
          </div>
          <div className="text-sm opacity-60">
            {items.length} item(s)
          </div>
        </td>

        <td>
          <div className="text-sm">
            {items[0]?.name ?? "No items"}
            {items.length > 1 &&
              ` +${items.length - 1} more`}
          </div>
        </td>

        <td>
          <span className="font-semibold">
            Rp{formatRupiah(order.totalPrice)}
          </span>
        </td>

        <td>
          <div
            className={`badge ${getOrderStatusBadge(order.status)}`}
          >
            {capitalizeText(order.status)}
          </div>
        </td>

        <td>
          <span className="text-sm opacity-60">
            {formatDate(order.createdAt)}
          </span>
        </td>
      </tr>
    );
  })}
</tbody>

                </table>
              </div>

            )}
        </div>
      </div>
    </div>
  )
};

export default DashboardPage;
