import React, { useContext, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Cart from './Cart.jsx';
import Chat from './Chat.jsx';
import Notification from './Notification.jsx';
import UserProfile from './UserProfile.jsx';
import'../index.css';
import avatar from '../data/avatar.jpg';


import { StateContext } from '../contexts/ContextProvider.js';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } =  useContext(StateContext);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
<div className="d-flex justify-content-between p-2 ms-md-6 me-md-6 position-relative">
  <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
  <div className="d-flex">
    <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
    <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
    <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
    <TooltipComponent content="Profile" position="BottomCenter">
      <div
        className="d-flex align-items-center gap-2 cursor-pointer p-1 hover-bg-light-gray rounded-lg"
        onClick={() => handleClick('userProfile')}
      >
        {/* <img
          className="rounded-circle w-8 h-8"
          src={av
          alt="user-profile"
        /> */}
        <p>
          <span className="text-gray-400 text-14">Hi,</span>{' '}
          <span className="text-gray-400 font-weight-bold ms-1 text-14">
            Hassan
          </span>
        </p>
        <MdKeyboardArrowDown className="text-gray-400 text-14" />
      </div>
    </TooltipComponent>

    {isClicked.cart && (<Cart />)}
    {isClicked.chat && (<Chat />)}
    {isClicked.notification && (<Notification />)}
    {isClicked.userProfile && (<UserProfile />)}
  </div>
</div>
  );
};

export default Navbar;
