import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import {
  addToCart,
  calculatePrice,
  coupenDiscount,
  removeFromCart,
} from "../redux/reducers/cartReducer";
import { CartItem, CartReducerInitialState } from "../types/types";
import { getDiscount } from "../redux/api-rtk/userAPI";
import axios from "axios";

// const cartItems = [
//   {
//     productId: "kkjllkl",
//     photo: "https://m.media-amazon.com/images/I/71RDgtHsREL._AC_UY218_.jpg",
//     name: "Macbook",
//     price: 5000,
//     stock: 20,
//     quantity: 10,
//   },
// ];

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, subtotal, shippingCharges, tax, total, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const increamentProdQty = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    dispatch(calculatePrice());
  };

  const decreamentProdQty = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    dispatch(calculatePrice());
  };
  const removeProductFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
    dispatch(calculatePrice());
  };
  useEffect(() => {
    if (!couponCode) {
      // Reset the state when the coupon code is empty
      dispatch(coupenDiscount(0)); 
      setIsValidCouponCode(false);
      return;
    }
    const cancelTokenSource = axios.CancelToken.source();
    const timerId = setTimeout(async () => {
      try { 
        const resp = await getDiscount(couponCode, cancelTokenSource.token);
        dispatch(coupenDiscount(resp!.data.discount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      } catch (error) {
        console.error("Failed to apply coupon code:", error);
        dispatch(coupenDiscount(0)); // Reset the discount in case of error
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
      cancelTokenSource.cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode, dispatch]);

  return (
    <div className="cart">
      <div className="rigth">
        {cartItems.length > 0 ? (
          cartItems.map((i, id) => (
            <CartItems
              key={id}
              cartItem={i}
              increamentProdQty={increamentProdQty}
              decreamentProdQty={decreamentProdQty}
              removeProductFromCart={removeProductFromCart}
            />
          ))
        ) : (
          <h1>No Items Added..</h1>
        )}
      </div>
      <div className="left">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
      </div>
    </div>
  );
};

export default Cart;
