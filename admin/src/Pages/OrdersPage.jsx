import { orderApi } from "../library/api.js";
import { formatDate } from "../library/utils.js";
import { useQuery, useQueryClient, useMutation, } from "@tanstack/react-query";

function OrdersPage() {

  const queryClient = useQueryClient();

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll
  });

  const updateStatusMutation = useMutation({
    mutationFn: orderApi.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ orderId, status: newStatus })
  }
  const orders = ordersData?.orders || [];

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value ?? 0);

  return (
    <div className="space-y-6 ">
      {/*HEADER*/}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Orders
        </h1>
        <p className="text-base-content/70">Manage customers orders</p>
      </div>
      {/*ORDER TABLE*/}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-base-content/60">
              <p className="text-xl font-semibold mb-2">No orders yet</p>
              <p className="text-sm">Orders will appear here once customers make purchases</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customers</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const totalQuantity = order.orderItem.reduce(
                      (sum, item) => sum + item.quantity, 0
                    )
                    return (
                      <tr key={order._id}>
                        <td>
                          <span className="font-medium">#{order._id.slice(-8).toUpperCase()}</span>
                        </td>

                        <td>
                          <div className="font-medium">{order.shippingAddress.fullName}</div>
                          <div className="text-sm opacity-60">
                            {order.shippingAddress.city}{order.shippingAddress.state}</div>
                        </td>

                        <td>
                          <div className="font-medium">{totalQuantity}</div>
                          <div className="text-sm opacity-60">
                            {order.orderItem[0]?.name || "Product"}
                            {order.orderItem.length > 1 &&
                              ` + ${order.orderItem.length - 1} more`}
                          </div>
                        </td>

                        <td>
                          <span className="font-semibold"> {formatRupiah(order.totalPrice)}</span>
                        </td>

                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="select select-sm"
                            disabled={updateStatusMutation.isPending}>
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>

                        <td>
                          <span className="text-sm opacity-60">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                      </tr>
                    )
                  })};
                </tbody>
              </table>
            </div>
          )
          }

        </div>

      </div>

    </div>
  )
}

export default OrdersPage
