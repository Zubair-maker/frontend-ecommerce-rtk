import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useDeleteProductMutation, useProdutDetailsQuery, useUpdateProductMutation } from "../../../redux/api-rtk/productApi";
import { server } from "../../../redux/store";
import { UserReducerInitialState } from "../../../types/types";
import { debounce } from "../../../utils/debounce";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MesssageResponse } from "../../../types/api-types";
import { FaTrash } from "react-icons/fa";

const ProductManagement = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  console.log("params", params);
  const { data } = useProdutDetailsQuery(params.id!);

  const [product, setProduct] = useState({
    _id: "",
    productName: "",
    category: "",
    photo: "",
    stock: 0,
    price: 0,
  });
  console.log("product", product);
  const [loading, setLoading] = useState<boolean>(false);

  const [nameUpdate, setNameUpdate] = useState<string>(product.productName);
  const [priceUpdate, setPriceUpdate] = useState<number>(product.price);
  const [stockUpdate, setStockUpdate] = useState<number>(product.stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [categoryUpdate, setCategoryUpdate] = useState<string>(
    product.category
  );
  const [file, setFile] = useState<File | null>(null);
  // console.log("phhottp", file);
  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const processFile = (file: File) => {
    const reader: FileReader = new FileReader();
    console.log("reader", reader);
    setLoading(true);
    reader.readAsDataURL(file); // Generate a preview
    reader.onloadend = () => {
      if (typeof reader.result === "string") setPhotoUpdate(reader.result);
      setLoading(false);
    };
    setFile(file); // Store the raw file
  };
  const debouncedFileHandler = debounce((file: File) => processFile(file), 300);
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) debouncedFileHandler(file);
  };

  const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    const formData = new FormData();
    if (nameUpdate) formData.set("productName", nameUpdate);
    if (priceUpdate)
      formData.set(
        "price",
        priceUpdate !== undefined ? priceUpdate.toString() : "0"       
      );
    if (stockUpdate)
      formData.set(
        "stock",
        stockUpdate !== undefined ? stockUpdate.toString() : "0"
      );
    if (photoUpdate) formData.append("photo", file!); // Append the raw file
    if (categoryUpdate) formData.set("category", categoryUpdate);
   
      const resp = await updateProduct({ formData, userId: user!._id, productId:data!.data._id});
      if("data" in resp){
         toast.success(resp.data!.message);
         navigate("/admin/product");
      }else{
        const error = resp.error as FetchBaseQueryError;
        const errMassage = error.data as MesssageResponse;
        toast.error(errMassage.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error In update product ");
    }
  };
  
  const deleteProductHandler = async() =>{
    try {
      const resp = await deleteProduct({userId: user!._id, productId:data!.data._id});
      if("data" in resp){
        toast.success(resp.data!.message);
        navigate("/admin/product");
      }else{
        const error = resp.error as FetchBaseQueryError;
        const errMassage = error.data as MesssageResponse;
        toast.error(errMassage.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error In delete product ");
    }
  }
  useEffect(() => {
    if (data) {
      setProduct(data.data);
      setNameUpdate(data.data.productName);
      setStockUpdate(data.data.stock);
      setPhotoUpdate(data.data.photo);
      setPriceUpdate(data.data.price);
      setCategoryUpdate(data.data.category);
    }
    return () => {
      setPhotoUpdate("");
      setNameUpdate("");
      setPriceUpdate(0);
      setStockUpdate(0);
      setCategoryUpdate("");
    };
  }, [data]);

  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="product_management">
        <section>
          <strong>ID - {product._id}</strong>
          <img src={`${server}/${product.photo}`} alt="product" />
          <p>{product.productName}</p>
          {product.stock > 0 ? (
            <span className="green">{product.stock} Available</span>
          ) : (
            <span className="red">{product.stock} Not Available</span>
          )}
          <h3>${product.price}</h3>
        </section>
        <div className="form_wrapper">
          <form onSubmit={submitHandler}>
            <h2>Manage-Product</h2>
            <button className="delete_btn" onClick={deleteProductHandler}>
                <FaTrash />
              </button>
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
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {loading && <p>Loading...</p>}
            {photoUpdate && <img src={photoUpdate} alt="product"/>}

            <button type="submit">Create</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
