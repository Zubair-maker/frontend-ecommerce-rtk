import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/CartItems";
import { Link } from "react-router-dom";
import { HiH1 } from "react-icons/hi2";

const cartItems = [
  {
    productId: "kkjllkl",
    photo: "https://m.media-amazon.com/images/I/71RDgtHsREL._AC_UY218_.jpg",
    name: "Macbook",
    price: 5000,
    stock: 20,
    quantity: 10,
  },
];

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValidCouponCode(true);
      } else {
        setIsValidCouponCode(false);
      }

      return () => {
        clearTimeout(timerId);
        setIsValidCouponCode(false);
      };
    }, 1000);
  }, [couponCode]);
  return (
    <div className="cart">
      <div className="rigth">
        {cartItems.length > 0 ? (
          cartItems.map((i, id) => <CartItems key={id} cartItem={i} />)
        ) : (
          <h1>No Items Added..</h1>
        )}
      </div>
      <div className="left">
        <p>Subtotal: ₹{200}</p>
        <p>Shipping Charges: ₹{20}</p>
        <p>Tax: ₹{5}</p>
        <p>
          Discount: <em className="red"> - ₹{10}</em>
        </p>
        <p>
          <b>Total: ₹{500}</b>
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
              ₹{"discount"} off using the <code>{couponCode}</code>
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
