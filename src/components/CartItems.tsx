import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItem: any;
  increamentProdQty: (cartItem: CartItem) => void;
  decreamentProdQty: (cartItem: CartItem) => void;
  removeProductFromCart: (productId: string) => void;
};

const CartItems = ({
  cartItem,
  increamentProdQty,
  decreamentProdQty,
  removeProductFromCart,
}: CartItemProps) => {
  const { productId, photo, name, price, quantity } = cartItem;
  console.log("cartitem",productId , quantity)
  return (
    <div className="cart_item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>${price}</span>
      </article>
      <div>
        <button onClick={() => decreamentProdQty(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => increamentProdQty(cartItem)}>+</button>
      </div>
      <button onClick={() => removeProductFromCart(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItems;
