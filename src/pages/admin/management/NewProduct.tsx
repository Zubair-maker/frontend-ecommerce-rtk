import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { debounce } from "../../../utils/debounce";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  
  const processFile = (file: File) => {
    const reader:FileReader = new FileReader();
    setLoading(true);
    reader.readAsDataURL(file); //readAsDataURL-Reads the file as a Base64-encoded string.
    //onloadend-Triggered when the file reading is complete.The reader.result holds the Base64-encoded string.
    reader.onloadend = () => {
      if (typeof reader.result === "string") setPhoto(reader.result);
      setLoading(false);
    };
  };
  const debouncedFileHandler = debounce((file: File) => processFile(file), 300);
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if(file) debouncedFileHandler(file)    
  };
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="product_management">
        <div className="form_wrapper">
          <form>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {loading && <p>Loading...</p>}
            {photo && <img src={photo} alt="product Photo" />}

            <button type="submit">Create</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewProduct;