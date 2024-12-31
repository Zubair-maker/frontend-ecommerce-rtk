import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHoc";
import { useAllOrderQuery } from "../../redux/api-rtk/orderApi";
import { UserReducerInitialState } from "../../types/types";

interface DataType {
  _id: string;
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Name",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, isError, isLoading } = useAllOrderQuery(user!._id);
  // console.log("object", data?.data);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data)
      setRows(
        data?.data.map((i) => ({
          _id: i._id,
          user: i.user.name,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItem.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transaction",
    true
  )();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return toast.error("Error in Transaction");
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main>{rows.length > 0 ? Table : <p>No Transaction Available</p>}</main>
    </div>
  );
};

export default Transaction;
