import { NavLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const YourOrders = ({ handleDelete, orders, isLoading, isRemovingId }) => {
  const { id } = useParams();

  const cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="mt-24 text-x font-bold px-10 py-5 mb-10 text-center text-yellow-700 bg-stone-100 rounded-2xl md:rounded-full ">
        delivery dates are estimated based on the item`s availability and the
        shipping method selected during checkout. Typically, orders are
        processed within 1-2 business days, and delivery can take anywhere from
        3-7 business days depending on your location. You`ll receive a
        confirmation email with your estimated delivery date once your order is
        shipped.
      </div>
      <div className="px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5">
        {isLoading ? (
          <div className="text-center col-span-5">
            <ClipLoader size={200} />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center col-span-5 bg-red-400 py-3 text-white">
            <span className="font-bold">No order!</span>, do you want to
            <NavLink
              to={`/add-orders/${id}`}
              className="text-blue-200 hover:text-blue-300 underline ml-1"
            >
              add some
            </NavLink>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.order_id} className="flex h-[200px]">
              <div className="flex flex-col space-y-2 items-center justify-center font-bold text-sm w-full bg-yellow-300 rounded-s-2xl">
                <div className="text-x">
                  {cap(order.who) + " " + cap(order.type)}
                </div>
                <div>{cap(order.color)}</div>
                <div>{order.size}</div>
                <div className="flex space-x-2">
                  <select name="" id="">
                    <option>{order.quantity}</option>
                  </select>
                  <div>${order.quantity * order.price}</div>
                </div>
                <div>{order.status}..</div>
                <button
                  onClick={(e) => handleDelete(e, order.order_id)}
                  className="bg-blue-600 px-2 py-1 text-white rounded-xl text-xs font-thin hover:bg-blue-800"
                >
                  {order.order_id === isRemovingId ? 'removing..' :'Remove'}
                </button>
              </div>
              <img
                src={
                  import.meta.env.VITE_PUBLIC_URL +
                  `assets/images/${order.who}/${order.type}/${order.color}-${order.type}.jpeg`
                }
                alt=""
                className="w-1/2 max-w-[250px] -ml-1"
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

YourOrders.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRemovingId: PropTypes.number,
};

export default YourOrders;
