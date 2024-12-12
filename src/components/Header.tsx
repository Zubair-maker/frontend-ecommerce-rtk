import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

const user = { id: "FaSignInAlt", role: "admin" };

const Header = () => {
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

      {user?.id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div className="order_wrapper">
              {user?.role === "admin" && (
                <Link to={"/admin/dashboard"} onClick={()=>setIsOpen(false)}>Admin</Link>
              )}
              <Link to={"/orders"} onClick={()=>setIsOpen(false)}>Orders</Link>
              <button>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
