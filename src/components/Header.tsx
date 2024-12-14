import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="header">
      <Link to={"/"} onClick={() => setIsOpen(false)}>
        Home
      </Link>
      <Link to={"/search"} onClick={() => setIsOpen(false)}>
        <FaSearch />
      </Link>
      <Link to={"/cart"} onClick={() => setIsOpen(false)}>
        <FaShoppingBag />
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div className="order_wrapper">
              {user?.role === "admin" && (
                <Link to={"/admin/dashboard"} onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              )}
              <Link to={"/orders"} onClick={() => setIsOpen(false)}>
                Orders
              </Link>
              <button>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
