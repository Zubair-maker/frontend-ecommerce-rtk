import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/admin/Loading";

const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/Header"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Order = lazy(() => import("./pages/Order"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Product = lazy(() => import("./pages/admin/Product"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/TransactionManagement")
);
const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />

            <Route>
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>

            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/customer" element={<Customers />} />
            <Route path="admin/product" element={<Product />} />
            <Route path="admin/transaction" element={<Transaction />} />

            {/* barcharts routs */}
            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />

            {/* management routes */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
