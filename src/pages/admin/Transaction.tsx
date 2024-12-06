import { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import TableHOC from "../../components/admin/TableHoc";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
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

const arr: DataType[] = [
  {
    user: "Mofis",
    amount: 6500,
    discount: 46300,
    quantity: 364,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/randomID">Manage</Link>,
  },
  {
    user: "Shanka",
    amount: 699,
    discount: 200,
    status: <span className="green">Shipped</span>,
    quantity: 4,
    action: <Link to="/admin/transaction/randomID">Manage</Link>,
  },
  {
    user: "Marvel",
    amount: 2546,
    discount: 350,
    status: <span className="purple">Delivered</span>,
    quantity: 5,
    action: <Link to="/admin/transaction/randomID">Manage</Link>,
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Transaction",
      true
    ),
    []
  );
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Transaction