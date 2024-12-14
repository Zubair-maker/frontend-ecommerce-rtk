import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api-rtk/userAPI";
import { UserReducerInitialState } from "./types/types";
import Header from "./components/Header";
import Loader, { LoaderLayout } from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
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
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  // console.log("userts", user);
  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const data = await getUser(firebaseUser.uid);
        // console.log("data",data)
        dispatch(userExist(data?.data));
        console.log("loggedin");
      } else dispatch(userNotExist());
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <Header user={user} />
        <Suspense fallback={<LoaderLayout />}>
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
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
