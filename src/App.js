import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import "./App.css";
import Colors from "./components/Colors";
import Layout from "./components/Layout";
import Landing from "./pages/client/Home";
import Header1 from "./components/Header1";
import Footer from "./components/Footer";
import Signup from "./pages/client/Signup";
import Signin from "./pages/client/Signin";
import About from "./pages/client/About";
import Cart from "./pages/client/Cart";
import Shop from "./pages/client/Shop";
import Product from "./pages/client/Product";
import Order from "./pages/client/Order";
import Checkout from "./pages/client/Checkout";
import New from "./pages/client/New";
import Best from "./pages/client/Best";
import Search from "./pages/client/Search";
import Terms from "./pages/client/Terms";
import Privacy from "./pages/client/Privacy";
import CartProvider from "./components/CartContext";
import AdminLayout from "./components/AdminLayout";
import Overview from "./pages/admin/Overview";
import AllProduct from "./pages/admin/Allproduct";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/Orderdetails";
import AddingProduct from "./pages/admin/Addingproduct";
import AllProductDetails from "./pages/admin/AllProductDetails";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const Layout1 = ({ children }) => (
    <>
      <Header1 />
      {children}
      <Footer />
    </>
  );
  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <ThreeCircles
            height="80"
            width="80"
            color={Colors.pink}
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <Layout1>
                        <Landing />
                      </Layout1>
                    }
                  />
                  <Route
                    path="main"
                    element={
                      <Layout1>
                        <Landing />
                      </Layout1>
                    }
                  />
                  <Route
                    path="shop"
                    element={
                      <Layout1>
                        <Shop />
                      </Layout1>
                    }
                  />
                  <Route
                    path="cart"
                    element={
                      <Layout1>
                        <Cart />
                      </Layout1>
                    }
                  />
                  <Route
                    path="about"
                    element={
                      <Layout1>
                        <About />
                      </Layout1>
                    }
                  />
                </Route>

                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                  path="/product/:_id"
                  element={
                    <Layout1>
                      <Product />
                    </Layout1>
                  }
                />
                <Route
                  path="/new"
                  element={
                    <Layout1>
                      <New />
                    </Layout1>
                  }
                />
                <Route
                  path="/best"
                  element={
                    <Layout1>
                      <Best />
                    </Layout1>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Layout1>
                      <Checkout />
                    </Layout1>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <Layout1>
                      <Order />
                    </Layout1>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <Layout1>
                      <Search />
                    </Layout1>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <Layout1>
                      <Privacy />
                    </Layout1>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <Layout1>
                      <Terms />
                    </Layout1>
                  }
                />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="allProduct" element={<AllProduct />} />
                  <Route
                    path="allProductDetails/:_id"
                    element={<AllProductDetails />}
                  />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orderDetails/:_id" element={<OrderDetails />} />
                  <Route path="addingProduct" element={<AddingProduct />} />
                </Route>
              </Routes>
            </Router>
          </CartProvider>
        </div>
      )}
    </div>
  );
};

export default App;
