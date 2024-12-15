import { server } from "../redux/store";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

// const servre = "dnwdnwidiwd";

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) => {
  return (
    <div className="product_card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>${price}</span>
      <button onClick={()=>handler()}>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
