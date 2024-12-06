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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="header">
      <Link to={"/"}>Home</Link>
      <Link to={"/search"}>
        <FaSearch />
      </Link>
      <Link to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {user?.id ? (
        <>
          <button onClick={()=>setIsOpen((prev)=>!prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user?.role === "admin" && <Link to={"/admin/dashboard"}>Admin</Link>}
              <Link to={"/orders"}>Orders</Link>
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
