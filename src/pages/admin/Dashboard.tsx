import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import Profile from "../../assets/profile.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../../assets/data.json";
import { BarChart, DoughnutChart } from "../../components/admin/Chart";
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable from "../../components/admin/DashboardTable";

const Dashboard = () => {
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users" />
          <FaRegBell />
          <img src={Profile} alt="userprofile" />
        </div>

        <section className="widget_container">
          <WidgetItem
            percent={50}
            heading="Revenue"
            amount={true}
            value={3500}
            color="rgb(0,115,255)"
          />

          <WidgetItem
            percent={40}
            heading="Users"
            amount={true}
            value={3500}
            color="rgb(0 198 202)"
          />

          <WidgetItem
            percent={70}
            heading="Transactions"
            amount={true}
            value={3500}
            color="rgb(255 196 0)"
          />

          <WidgetItem
            percent={30}
            heading="Products"
            amount={false}
            value={3500}
            color="rgb(76 0 255)"
          />
        </section>

        <section className="graph_container">
          <div className="chart_container">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>
          <div className="inventory_container">
            <h2>Inventory</h2>
            <div>
              {data.categories.map((item) => (
                <CategoryItem
                  key={item.heading}
                  heading={item.heading}
                  value={item.value}
                  color={`hsl(${item.value * 2}, ${item.value}%,50%)`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="transsation_container">
          <div className="gender_chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>

          <DashboardTable data={data.transaction} />
        </section>
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget_Info">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> + {percent}%
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%
        </span>
      )}
    </div>

    <div
      className="widget_circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category_item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;