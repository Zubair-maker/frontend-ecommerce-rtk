import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/admin/Loading";

const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/Header"));

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
