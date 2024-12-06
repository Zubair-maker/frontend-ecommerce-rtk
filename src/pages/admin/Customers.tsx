import { ReactElement, useCallback, useState } from "react";
import { Column } from "react-table";
import { FaTrash } from "react-icons/fa";
import TableHOC from "../../components/admin/TableHoc";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface DataType {
  avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
}

const column: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img = "https://randomuser.me/api/portraits/men/78.jpg";
const img2 = "https://randomuser.me/api/portraits/women/88.jpg";

const arr: DataType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="male"
      />
    ),
    name: "John Marchel",
    email: "Marchelr@example.com",
    gender: "Male",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="female"
      />
    ),
    name: "Malwie Scoot",
    email: "Malwiem@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      column,
      data,
      "dashboard-product-box",
      "Customers",
      true
    ),
    []
  );

  return (
    <div className="admin_container">
      <AdminSidebar/>
      <main>{Table()}</main>
    </div>
  );
};

export default Customers;