import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const addToCart = () => {};
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
            <option value="">Category1</option>
            <option value="">Category2</option>
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
          <ProductCard
            productId="154541wudnwd"
            name="macbook"
            price={2500}
            stock={25}
            handler={addToCart}
            photo="https://m.media-amazon.com/images/I/71RDgtHsREL._AC_UY218_.jpg"
          />
        </div>
        <div className="bottom">
          <button onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span>
            {page} of {4}
          </span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default Search;
