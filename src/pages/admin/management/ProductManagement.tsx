import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { debounce } from "../../../utils/debounce";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const [name, setName] = useState<string>("product");
  const [price, setPrice] = useState<number>(454);
  const [stock, setStock] = useState<number>(22);
  const [photo, setPhoto] = useState<string>(img);
  const [loading, setLoading] = useState<boolean>(false);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  
  const processFile = (file: File) => {
    const reader:FileReader = new FileReader();
    setLoading(true);
    reader.readAsDataURL(file); 
    reader.onloadend = () => {
      if (typeof reader.result === "string") setPhotoUpdate(reader.result);
      setLoading(false);
    };
  };
  const debouncedFileHandler = debounce((file: File) => processFile(file), 300);
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if(file) debouncedFileHandler(file)    
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  };

  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="product_management">
      <section>
        <strong>ID - keifefnkefniefwsds</strong>
        <img src={photo} alt="product" />
        <p>{name}</p>
        {
            stock > 0 ? (<span className="green">{stock} Available</span>) 
            : (<span className="red">{stock} Not Available</span>)
        }
        <h3>${price}</h3>
      </section>
        <div className="form_wrapper">
          <form onSubmit={submitHandler}>
            <h2>Manage-Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {loading && <p>Loading...</p>}
            {photoUpdate && <img src={photoUpdate} alt="product Photo" />}

            <button type="submit">Create</button>
          </form>
        </div>
      </main>
    </div>
  );
};


export default ProductManagement