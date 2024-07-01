// // AppContext.js
// import React, { createContext, useState, useContext } from 'react';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);

//   return (
//     <AppContext.Provider value={{ userId, setUserId }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);


// AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let [userId, setUserId] = useState(() => {
    // Retrieve userId from localStorage if it exists
    return localStorage.getItem('userId') || null;
  });

  useEffect(() => {
    // Store userId in localStorage whenever it changes
    if (userId) {
      userId = userId.toString().replace(/"/g, '');
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

