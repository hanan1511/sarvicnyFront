import React, { useEffect } from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Admin from "./components/Admin.jsx";
import Area from "./pages/Charts/Area.jsx";
import Bar from "./pages/Charts/Bar.jsx";
import Pie from "./pages/Charts/Pie.jsx";
import Line from "./pages/Charts/Line.jsx";
import Pyramid from "./pages/Charts/Pyramid.jsx";
import ColorMapping from "./pages/Charts/ColorMapping.jsx";
import Financial from "./pages/Charts/Financial.jsx";
import Stacked from "./pages/Charts/Stacked.jsx";
import Calendar from "./pages/Calendar.jsx";
import Ecommerce from "./pages/Ecommerce.jsx";
import Orders from "./pages/Orders.jsx";
import Employees from "./pages/Employees.jsx";
import Customers from "./pages/Customers.jsx";
import Kanban from "./pages/Kanban.jsx";
import Editor from "./pages/Editor.jsx";
import ColorPicker from "./pages/ColorPicker.jsx";
import Notfound from "./pages/Notfound.jsx";
import Criteria from "./pages/Criteria.jsx";
import RequestDet from "./pages/RequestDet.jsx";
import Providers from "./pages/Providers.jsx";
import Service from "./pages/Service.jsx";
import OrderDet from "./pages/OrderDet.jsx";
import Availability from "./components/AddAvailability/Availability.jsx";
import WorkerReg from "./components/WorkerReg/WorkerReg.jsx";
import Table from "./components/Tables/Table.jsx";
import ServicReg from "./components/ServiceReg/ServiceReg.jsx";
import ReqDetails from "./components/ReqDetails/ReqDetails.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Landpage from "./components/Landpage/Landpage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import LayoutUser from "./components/LayoutUser/Layout.jsx";
import Guest from "./components/Guest/Guest.jsx";
import Home from "./components/Home/Home.jsx";
import RegisterCustomer from "./components/RegisterCustomer/RegisterCustomer";
import LoginCustomer from "./components/LoginCustomer/LoginCustomer";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout";
import ServicesCriteria from "./components/servicesCriteria/servicesCriteria";
import ServiceDescription from "./components/serviceDescription/serviceDescription";
import Workers from "./components/Workers/Workers";
import ResponsePage from "./components/payment";
import DashBoard from "./components/DashBoardAdmin/DashBoard.jsx";
import { Waiting } from "./components/ServiceReg/waiting.jsx";
import Box from "./components/orderStatus/orderStatus.jsx";
import { OrdersCust } from "./components/orders/Orders.jsx";
import { AppProvider } from "./components/context/AppContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CustomerProfile from "./components/customerProfile/customerProfile.jsx";
import ServiceSubset from "./components/ServiceSubset/ServiceSubset.jsx";
import Feedback from "./components/Feedback/FeedbackForm.jsx";
import CancledOrders from "./pages/CancledOrders.jsx";
import SuggestedWorker from "./pages/SuggestedWorker.jsx";
import AssignedWorker from "./components/AssignedWorker/AssignedWorker.jsx";
import Policy from "./components/Policy/Policy.jsx";
import RefundOrders from"./pages/RefundOrders.jsx";
import ServiceForProv from "./pages/serviceProvider.jsx";
let routers = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <Ecommerce /> },
      { path: "ecommerce", element: <Ecommerce /> },
      { path: "orders", element: <Orders /> },
      { path: "customers", element: <Employees /> },
      { path: "Providers Requests", element: <Customers /> },
      { path: "ServiceForProv", element: <ServiceForProv/> },
      { path: "kanban", element: <Kanban /> },
      { path: "editor", element: <Editor /> },
      { path: "calendar", element: <Calendar /> },
      { path: "color-picker", element: <ColorPicker /> },
      { path: "line", element: <Line /> },
      { path: "area", element: <Area /> },
      { path: "bar", element: <Bar /> },
      { path: "pie", element: <Pie /> },
      { path: "financial", element: <Financial /> },
      { path: "color-mapping", element: <ColorMapping /> },
      { path: "pyramid", element: <Pyramid /> },
      { path: "stacked", element: <Stacked /> },
      { path: "criteria", element: <Criteria /> },
      { path: "reqdet", element: <RequestDet /> },
      { path: "service Providers", element: <Providers /> },
      { path: "canceledOrders", element: <CancledOrders/> },
      { path: "RefundOrders", element: <RefundOrders/> },
      { path: "suggestedWorkers", element: <SuggestedWorker/> },
      { path: "service", element: <Service /> },
      { path: "orderdet", element: <OrderDet /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/provider",
    element: <Layout />,
    children: [
      { index: true, element: <Landpage /> },
      { path: "serviceReg", element: <ServicReg /> },
      { path: "workerReg", element: <WorkerReg /> },
      { path: "table", element: <Table /> },
      { path: "addAvailability", element: <Availability /> },
      { path: "reqdetail", element: <ReqDetails /> },
      { path: "profile", element: <Profile /> },
      { path: "waiting", element: <Waiting /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Guest /> },
      { path: "home", element: <Home /> },
      { path: "registerCustomer", element: <RegisterCustomer /> },
      { path: "loginCustomer", element: <LoginCustomer /> },
      { path: "cart", element: <Cart /> },
      { path: "customerProfile", element: <CustomerProfile /> },
      { path: "checkout", element: <Checkout /> },
      { path: "criteria/:id", element: <ServicesCriteria /> },
      { path: "subservice", element: <ServiceSubset /> },
      { path: "service", element: <ServiceDescription /> },
      { path: "workers", element: <Workers /> },
      { path: "reAssignedWorker", element: <AssignedWorker/> },
      { path: "pay", element: <ResponsePage /> },
      { path: "status", element: <Box /> },
      { path: "ordersCust", element: <OrdersCust /> },
      { path: "custProfile", element: <CustomerProfile/> },
      { path: "policy", element: <Policy/> },
      { index: "*", element: <Notfound /> },
      
    ],
  },
]);

const App = () => {
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "Aewy0wiq_hv6DYE9VDdJirqFv6X_Dr6sK0c1RWpQljq4vpM8CaJ6GoSssx_XFJTxA1VcTZ2wxy7B0hnV",
        }}
      >
        <AppProvider>
          <RouterProvider router={routers} />
        </AppProvider>
      </PayPalScriptProvider>
    </>
  );
};

export default App;
