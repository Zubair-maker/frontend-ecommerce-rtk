import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useOrderStatusUpdateMutation,
  useSingleOrderQuery,
} from "../../../redux/api-rtk/orderApi";
import { Order, UserReducerInitialState } from "../../../types/types";
import { OrderItemType } from "../../../utils/type";
import { server } from "../../../redux/store";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MesssageResponse } from "../../../types/api-types";
import { FaTrash } from "react-icons/fa";

const defOrder: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 140,
  total: 0,
  orderItem: [],
  user: { name: "", _id: "" },
  _id: "",
};
const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useSingleOrderQuery(params.id!);

  const [updateOrderStatus] = useOrderStatusUpdateMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  // console.log("Transactio", data?.data);
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItem,
    user: { name },
    status,
    tax,
    subTotal,
    total,
    discount,
    shippingCharges,
  } = data?.data || defOrder;

  const statusHandler = async () => {
    const resp = await updateOrderStatus({
      adminId: user!._id,
      orderId: data!.data._id,
    });
    if ("data" in resp) {
      toast.success(resp.data!.message);
      navigate("/admin/transaction");
    } else {
      const error = resp.error as FetchBaseQueryError;
      const errMassage = error.data as MesssageResponse;
      toast.error(errMassage.message);
    }
  };

  const deleteHandler = async () => {
    const resp = await deleteOrder({
      adminId: user!._id,
      orderId: data!.data._id,
    });
    if ("data" in resp) {
      toast.success(resp.data!.message);
      navigate("/admin/transaction");
    } else {
      const error = resp.error as FetchBaseQueryError;
      const errMassage = error.data as MesssageResponse;
      toast.error(errMassage.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="product_management">
        <section style={{ padding: "2rem" }}>
          <h2>Order Items</h2>
          {orderItem?.map((item) => (
            <ProductCard
              name={item.productName}
              photo={item.photo}
              _id={item._id}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </section>
        <div className="order_info">
          <button style={{color:"red",position:"absolute",right:"5rem",top:"4.7rem",width:"40px"}} onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h2>Order Info</h2>width: 40px;
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country}-${pinCode}`}
          </p>
          <h5>Amount Info:</h5>
          <p>SubTotal: {subTotal}</p>
          <p>ShippingCharges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info:</h5>
          <p>
            Status:&nbsp;
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button onClick={statusHandler}>Process-Status</button>
        </div>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transaction-product-card">
    <img src={`${server}/${photo}`} alt={name} />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
