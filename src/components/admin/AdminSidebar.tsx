import { IconType } from "react-icons";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import {
  RiDashboardFill,
  RiFile2Fill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside>
      <h2>logo</h2>
      <div className="main_admin_wrapper">
        <h5>Dashboard</h5>
        <ul>
          <Li
            url="/admin/dashboard"
            text="Dashboard"
            Icon={RiDashboardFill}
            location={location}
          />

          <Li
            url="/admin/product"
            text="Product"
            Icon={RiShoppingBag3Fill}
            location={location}
          />

          <Li
            url="/admin/customer"
            text="Customer"
            Icon={IoIosPeople}
            location={location}
          />

          <Li
            url="/admin/transaction"
            text="Transaction"
            Icon={RiFile2Fill}
            location={location}
          />
        </ul>
      </div>

      <div className="main_admin_wrapper">
        <h5>Charts</h5>
        <ul>
          <Li
            url="/admin/chart/bar"
            text="Bar"
            Icon={FaChartBar}
            location={location}
          />

          <Li
            url="/admin/chart/pie"
            text="Pie"
            Icon={FaChartPie}
            location={location}
          />

          <Li
            url="/admin/chart/line"
            text="Line"
            Icon={FaChartLine}
            location={location}
          />
        </ul>
      </div>
    </aside>
  );
};

interface liProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, location, text, Icon }: liProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url) ? "#e1e1ad" : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;