import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductProps = {
  productId: string;
  photo: string;
  productName: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

// const servre = "dnwdnwidiwd";

const ProductCard = ({
  productId,
  photo,
  productName,
  price,
  stock,
  handler,
}: ProductProps) => {
  return (
    <div className="product_card">
      <img src={`${server}/${photo}`} alt={productName} />
      <p>{productName}</p>
      <span>${price}</span>
      <button
        onClick={() =>
          handler({ productId, photo, productName, price, stock, quantity: 1 })
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
