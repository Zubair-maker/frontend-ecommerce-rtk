import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHoc";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api-rtk/userAPI";
import { server } from "../../redux/store";
import { MesssageResponse } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/types";

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

const Customers = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isError, isLoading } = useAllUsersQuery(user!._id);
  const [deleteUser] = useDeleteUserMutation();
  const [rows, setRows] = useState<DataType[]>([]);
  // console.log("data", data?.data);
  const deleteUserHandler = async (userId: string) => {
    const resp = await deleteUser({ userId, adminId: user!._id });
    if ("data" in resp) {
      toast.success(resp.data!.message);
    } else {
      const error = resp.error as FetchBaseQueryError;
      const errMassage = error.data as MesssageResponse;
      toast.error(errMassage.message);
    }
  };
  useEffect(() => {
    if (data)
      setRows(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.data.map((i: any) => ({
          avatar: <img src={i.photo} alt="userPhoto" />,
          name: i.name,
          gender: i.gender,
          email: i.email,
          role: i.role,
          action: (
            <button onClick={() => deleteUserHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Customers",
    true
  )();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return toast.error("Error in Customers");
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
