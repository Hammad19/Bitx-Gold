import React, { useContext } from "react";

/// React router dom
import {  Routes, Route, Outlet  } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
//import Main from './layouts/Main';

import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";



//Crypto


import Buy from './components/Crypto/Buy';
import Sell from './components/Crypto/Sell';
import Stake from './components/Crypto/Stake';


//admin
import Requests from "./components/Crypto/Requests";






//Redux
//import Todo from "./pages/Todo";

// Widget




import BonusReferral from "./components/Crypto/BonusReferral";



/// Pages
//import Registration from "./pages/Registration";
//import Login from "./pages/Login";
//import ForgotPassword from "./pages/ForgotPassword";

import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import AdminHome from "./components/Dashboard/AdminHome";
import StakingReferral from "./components/Crypto/StakingReferral";




const Markup = () => {

  const state = useSelector((state) => state);
  const allroutes = [
    /// Dashboard
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    
    
    //Crypto
    
    {url:"buy", component: <Buy/>},
    {url:"sell", component: <Sell/>},
    {url:"stake", component: <Stake/>},
    {url:"bonus-referral", component: <BonusReferral/>},
    {url:"staking-referral", component: <StakingReferral/>},

    //admin
    { url: "admindashboard", component: <AdminHome /> },
    {url:"requests", component: <Requests/>},
    


    
	/////Demo
    // { url: "sidebar-primary", component: <Theme1 /> },
    // { url: "horizontal-sidebar", component: <Theme2 /> },
    // { url: "nav-header", component: <Theme3 /> },
    // { url: "secondary-header", component: <Theme4 /> },
    // { url: "sidebar-theme", component: <Theme5/> },
    // { url: "primary-theme", component: <Theme6/> },
    // { url: "nav-theme", component: <Theme7/> },
    // { url: "sidebar-mini", component: <Theme8 /> },
	
	// /// Apps
  //   { url: "app-profile", component: <AppProfile /> },
  //   { url: "edit-profile", component: <EditProfile /> },
  //   { url: "email-compose", component: <Compose /> },
  //   { url: "email-inbox", component: <Inbox /> },
  //   { url: "email-read", component: <Read /> },
  //   { url: "app-calender", component: <Calendar /> },
  //   { url: "post-details", component: <PostDetails /> },

  // /// Shop
  //   { url: "ecom-product-grid", component: <ProductGrid /> },
  //   { url: "ecom-product-list", component: <ProductList /> },
  //   { url: "ecom-product-detail", component: <ProductDetail /> },
  //   { url: "ecom-product-order", component: <ProductOrder /> },
  //   { url: "ecom-checkout", component: <Checkout /> },
  //   { url: "ecom-invoice", component: <Invoice /> },
  //   { url: "ecom-customers", component: <Customers /> },
//
    // ///// Chart
    // { url: "chart-sparkline", component: <SparklineChart /> },
    // { url: "chart-chartjs", component: <ChartJs /> },    
    // { url: "chart-apexchart", component: <ApexChart /> },
    
    
//
    ///// pages
    //{ url: "page-register", component: Registration },
    //{ url: "page-lock-screen", component: <LockScreen /> },
    ////{ url: "page-login", component: Login },
    //{ url: "page-forgot-password", component: <ForgotPassword /> },
    //{ url: "page-error-400", component: <Error400 /> },
    //{ url: "page-error-403", component: <Error403 /> },
    //{ url: "page-error-404", component: <Error404 /> },
    //{ url: "page-error-500", component: <Error500 /> },
    //{ url: "page-error-503", component: <Error503 /> },
  ];
  //let path = window.location.pathname;
  //path = path.split("/");
  //path = path[path.length - 1];

  //let pagePath = path.split("-").includes("page");
  //const { menuToggle } = useContext(ThemeContext);

  return (
    <>
        <Routes>
            <Route  element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`${data.url}`}
                    element={data.component}
                  />
                ))}
            </Route>
        </Routes>
        <ScrollToTop />
        
    </>
  );
};


function MainLayout(){
  const { menuToggle } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${ menuToggle ? "menu-toggle" : ""}`}>  
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            <Outlet />                
          </div>
      </div>
      <Footer />
    </div>
  )

};

export default Markup;
