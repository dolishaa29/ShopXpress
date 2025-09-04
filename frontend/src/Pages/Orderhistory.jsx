import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = cookie.get("emtoken");
        const res = await axios.get("http://localhost:9000/orderhistory", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials:true,
        });

        console.log("oder history data--", res);
        
        setOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  {order.orderData.map((item, i) => (
                    <div key={i}>
                      {item.name} ({item.quantity}) - ₹{item.price}
                    </div>
                  ))}
                </td>
                <td>
                  ₹
                  {order.orderData.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
