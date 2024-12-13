import Header from "../components/Header";
import YourOrders from "../components/YourOrders";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const YourOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemovingId, setIsRemovingId] = useState(null);
  const { id } = useParams();
  const address_id = id;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://my-app-backend-dusky.vercel.app/fb/select-order?address_id=${address_id}`
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            if (error.error === "No order!") {
              toast.warning("No order Added");
              return [];
            }
            throw new Error("Error fetching Orders");
          });
        }

        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setOrders(data);
        console.log("Order Fetched successfully", data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error Fetching ordes", err);
      });
  }, [address_id]);

  const handleDelete = (e, order_id) => {
    e.preventDefault();
    setIsRemovingId(order_id);
    const url = `https://my-app-backend-dusky.vercel.app/fb/delete-order?order_id=${order_id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error deleting order");
        }
        setOrders(orders.filter((order) => order.order_id !== order_id));
        setIsRemovingId(null);
        console.log("Order deleted successfully");
      })
      .catch((error) => {
        setIsRemovingId(null);
        console.error("Error deleting order", error);
      });
  };

  return (
    <div>
      <Header />
      <YourOrders
        handleDelete={handleDelete}
        orders={orders}
        isLoading={isLoading}
        isRemovingId={isRemovingId}
      />
    </div>
  );
};

export default YourOrdersPage;
