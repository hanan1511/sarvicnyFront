// Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function LayoutUser() {
  const location = useLocation();
  console.log(location.pathname);
  const isnotReg = (location.pathname !== '/')||(location.pathname !== '/registerCustomer')||(location.pathname !== '/loginCustomer');

  return (
    <>
      {isnotReg && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}
