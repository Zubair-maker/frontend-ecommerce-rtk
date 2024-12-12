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
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>${price}</span>
      <button>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
