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
  const [userId, setUserId] = useState(() => {
    // Retrieve userId from localStorage if it exists
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  useEffect(() => {
    // Store userId in localStorage whenever it changes
    if (userId) {
      localStorage.setItem('userId', JSON.stringify(userId));
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
