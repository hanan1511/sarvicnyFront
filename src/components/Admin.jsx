import React, { useContext, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { StateContext } from '../contexts/ContextProvider.js';

import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Sidebar from './Sidebar.jsx'
import ThemeSettings from './ThemeSettings.jsx'
import '../App.css';
import { Outlet } from 'react-router-dom';

const Admin = () => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } =  useContext(StateContext);

    useEffect(() => {
      const currentThemeColor = localStorage.getItem('colorMode');
      const currentThemeMode = localStorage.getItem('themeMode');
      if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
      }
    }, []);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>

        <div className="flex relative dark:bg-main-dark-bg">

          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>

              <Outlet/>
            </div>
            <Footer />
          </div>
        </div>
    </div>
  )
}

export default Admin