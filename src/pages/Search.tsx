import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useProductCategoryQuery,
  useSearchProductQuery,
} from "../redux/api-rtk/productAPI";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart, calculatePrice } from "../redux/reducers/cartReducer";

const Search = () => {
  const dispatch = useDispatch();

  const { data: categories } = useProductCategoryQuery("");
  // console.log("category", categories?.data);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const { data: searchProduct } = useSearchProductQuery({
    search,
    sort,
    price: maxPrice,
    page,
    category,
  });
  // console.log("searchProd", searchProduct?.data.data);
  const addToCartFunc = (cartItem:CartItem) => {
     if(cartItem.stock < 1) return toast.error("Out of stock");
     dispatch(addToCart(cartItem));
     dispatch(calculatePrice());
     toast.success("Product added")
  };
  return (
    <div className="search_page">
      <aside>
        <h2>Filters</h2>
        <div>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={50000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category:</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories?.data.map((item) => (
              <option value={item}>{item.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products:</h1>
        <input
          type="text"
          placeholder="search products.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search_pro_lits">
          {searchProduct && searchProduct.data.products.length > 0 ? (
            searchProduct.data.products.map((item) => (
              <ProductCard
                key={item._id}
                productId={item._id}
                productName={item.productName}
                price={item.price}
                stock={item.stock}
                handler={addToCartFunc}
                photo={item.photo}
              />
            ))
          ) : (
            <p className="no-products-found">No products found!!</p>
          )}
        </div>

        {searchProduct && searchProduct?.data.totalPage > 1 && (
          <div className="bottom">
            <button onClick={() => setPage((prev) => prev - 1)}>Prev</button>
            <span>
              {page} of {searchProduct?.data.totalPage}
            </span>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
