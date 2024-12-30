import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { debounce } from "../../../utils/debounce";
import { useCreateProductMutation } from "../../../redux/api-rtk/productAPI";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/types";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MesssageResponse } from "../../../types/api-types";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const navigate = useNavigate();
  const [productName, setProductName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [file, setFile] = useState<File | null>(null); // Store raw file instead of Base64 string
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // console.log("phhottp", file,photoPreview);
  const [createProduct] = useCreateProductMutation();

  const processFile = (file: File) => {
    const reader: FileReader = new FileReader();
    console.log("reader",reader)
    setLoading(true);
    reader.readAsDataURL(file); // Generate a preview
    reader.onloadend = () => {
      if (typeof reader.result === "string") setPhotoPreview(reader.result);
      setLoading(false);
    };
    setFile(file); // Store the raw file
  };

  const debouncedFileHandler = debounce((file: File) => processFile(file), 300);
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) debouncedFileHandler(file);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [productName, price, stock, category].some((v: any) => v === "")
    ) {
      alert("please fill all the fields!");
      return;
    }
    const formData = new FormData();
    formData.set("productName", productName);
    formData.set("price", price !== undefined ? price.toString() : "0");
    formData.set("stock", stock !== undefined ? stock.toString() : "0");
    formData.append("photo", file!); // Append the raw file
    formData.set("category", category);
    try {
      const resp = await createProduct({ id: user!._id, formData });
      if ("data" in resp) {
        toast.success(resp.data!.message);
        navigate("/admin/product");
      } else {
        const error = resp.error as FetchBaseQueryError;
        const errMassage = error.data as MesssageResponse;
        toast.error(errMassage.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign In Error");
    }
  };
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="product_management">
        <div className="form_wrapper">
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {loading && <p>Loading...</p>}
            {photoPreview && <img src={photoPreview} alt="product Photo" />}

            <button type="submit">Create</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewProduct;
