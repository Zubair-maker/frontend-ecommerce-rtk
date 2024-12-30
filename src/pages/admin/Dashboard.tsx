import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import Profile from "../../assets/profile.png";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Chart";
import DashboardTable from "../../components/admin/DashboardTable";
import { useStatsQuery } from "../../redux/api-rtk/dashboardApi";
import { UserReducerInitialState } from "../../types/types";

const Dashboard = () => {
   const { user } = useSelector(
      (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

  const {data, isLoading, isError} = useStatsQuery(user!._id);
   
  const stats = data?.stats;
  console.log("stats",stats)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return toast.error("Error in Customers");
  return (
    <div className="admin_container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users" />
          <FaRegBell />
          <img src={user?.photo || Profile} alt="userprofile" />
        </div>

        <section className="widget_container">
          <WidgetItem
            percent={stats!.revenue}
            heading="Revenue"
            amount={true}
            value={stats!.count.revenue}
            color="rgb(0,115,255)"
          />

          <WidgetItem
            percent={stats!.user}
            heading="Users"
            amount={true}
            value={stats!.count.users}
            color="rgb(0 198 202)"
          />

          <WidgetItem
            percent={stats!.order}
            heading="Transactions"
            amount={true}
            value={stats!.count.order}
            color="rgb(255 196 0)"
          />

          <WidgetItem
            percent={stats!.product}
            heading="Products"
            amount={false}
            value={stats!.count.products}
            color="rgb(76 0 255)"
          />
        </section>

        <section className="graph_container">
          <div className="chart_container">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_1={stats!.charts.revenue}
              data_2={stats!.charts.order}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>
          <div className="inventory_container">
            <h2>Inventory</h2>
            <div>
              {stats!.categoryCount.map((item) => {
                return (
                  <CategoryItem
                    key={item.category}
                    heading={item.category}
                    value={`${item!.countPercent}`}
                    color={`hsl(${item.countPercent * 2}, ${item.countPercent}%, 50%)`}
                  />
                )
              })}
            </div>
          </div>
        </section>

        <section className="transsation_container">
          <div className="gender_chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[stats!.userRatio.female,stats!.userRatio.male]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>

          <DashboardTable data={stats!.latestTransaction} />
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
          <HiTrendingUp /> + {`${percent > 10000 ? 9999 : percent}%`}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {`${percent > -10000 ? 9999 : percent}%`}
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
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent > -10000 ? 9999 : percent}%`}
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number | string;
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