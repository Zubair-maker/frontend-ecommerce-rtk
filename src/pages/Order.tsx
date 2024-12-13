import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHoc";
import { Column } from "react-table";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
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

const Order = () => {
  const [rows] = useState<DataType[]>([
    {
      _id: "dwjdwkjdnwjd",
      amount: 500,
      quantity: 25,
      discount: 10,
      status: <span className="red">Processing</span>,
      action: <Link to={"/orders/dwjdwkjdnwjd"}>{`Views >`}</Link>,
    },
  ]);
  const orderTable = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="order">
      <h1>My Orders</h1>
      {orderTable}
    </div>
  );
};

export default Order;
