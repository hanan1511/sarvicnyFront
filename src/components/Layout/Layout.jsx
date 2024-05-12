// import { Outlet,useLocation } from 'react-router-dom';

// import React from 'react';
// import NavWork from '../NavBarWork/NavWork.jsx';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// function Layout(){
//     const location = useLocation();
//     console.log(location.pathname);
//     const isnotRegwork=!(location.pathname=='/provider/workerReg'||location.pathname=='/provider/serviceReg');
//     const isnotReg = (location.pathname !== '/')||(location.pathname !== '/registerCustomer')||(location.pathname !== '/loginCustomer');

//     return(
//         <>
//         {
//             location.pathname.includes("/provider")? 
//             <>
//                 {isnotRegwork && <NavWork/>}
//                 <Outlet/>
//             </> 
//             :
//             <>
//                 {isnotReg && <Navbar />}
//                 <Outlet />
//                 <Footer />
//             </>
//         }
//         </>
//     );
// }
// export default Layout;

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavWork from '../NavBarWork/NavWork.jsx';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout() {
    const location = useLocation();
    console.log(location.pathname);
    
    const isProviderPath = location.pathname.startsWith('/provider');
    const isRegistrationPath = ['/', '/registerCustomer', '/loginCustomer','/provider/workerReg','/provider/serviceReg','/provider/waiting'].includes(location.pathname);

    return (
        
        <>
            {isProviderPath ? (
                <>
                    {!isRegistrationPath && <NavWork />}
                    <Outlet />
                </>
            ) : (
                <>
                    {!isRegistrationPath && <Navbar />}
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
}

export default Layout;
