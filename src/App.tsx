import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase";
import NotFound from "./pages/NotFound";
import { getUser } from "./redux/api-rtk/userAPI";
import { userExist, userNotExist } from "./redux/reducers/userReducer";
import { UserReducerInitialState } from "./types/types";

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
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const data = await getUser(firebaseUser.uid);
        // console.log("data",data)
        dispatch(userExist(data?.data));
        // console.log("loggedin");
      } else {
        dispatch(userNotExist());
      }
      setAuthLoading(false);
    });
  }, []);

  if (loading || authLoading) {
    // Show loader while fetching user or checking auth state
    return <Loader />;
  }

  return (
    <>
      <BrowserRouter>
        <Header user={user} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/login"
              element={
                ////user ? false : true
                <ProtectedRoute isAuthenticated={!user}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              //user ? true : false
              element={<ProtectedRoute isAuthenticated={!!user} />}
            >
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={!!user}
                  adminRoute={true}
                  isAdmin={user?.role === "admin"}
                />
              }
            >
              <Route path="admin/dashboard" element={<Dashboard />} />
              <Route path="admin/customer" element={<Customers />} />
              <Route path="admin/transaction" element={<Transaction />} />
              {/* barcharts routs */}
              <Route path="/admin/chart/bar" element={<BarCharts />} />
              <Route path="/admin/chart/pie" element={<PieCharts />} />
              <Route path="/admin/chart/line" element={<LineCharts />} />
              {/* management routes */}
              <Route path="/admin/product/new" element={<NewProduct />} />
              <Route path="admin/product" element={<Product />} />
              <Route
                path="/admin/product/:id"
                element={<ProductManagement />}
              />
              <Route
                path="/admin/transaction/:id"
                element={<TransactionManagement />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
