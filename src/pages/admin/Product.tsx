import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHoc";
import { useAllAdminProdutsQuery } from "../../redux/api-rtk/productApi";
import { server } from "../../redux/store";
import { UserReducerInitialState } from "../../types/types";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
// const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";
// const arr: DataType[] =[{photo:<img src={img}/>,name: "Puma Shoes",price:690,stock:3,action:<Link to="/admin/product/sajkn">Manage</Link>}];

const Product = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data } = useAllAdminProdutsQuery(user!._id);
  // console.log("data", isLoading);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data)
      setRows(
        data.data.map((i) => ({
          photo: <img key={i._id} src={`${server}/${i.photo}`} />,
          name: i.productName,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();
  // if (isLoading) {
  //   return <>ejfnjefnjwfnwjfn</>;
  // }
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main>{rows.length > 0 ? Table : <p>No products available</p>}</main>
      <Link to="/admin/product/new" className="plus-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
