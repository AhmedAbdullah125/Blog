import React, { createContext, useContext, useState } from 'react';

// Create a context
const CookiesContext = createContext();

// Create a provider component
export const CookiesProvider = ({ children }) => {
    const [display , setDisplay] = useState(false);
    
    return (
        <CookiesContext.Provider value={{display , setDisplay}}>
            {children}
        </CookiesContext.Provider>
    );
};

// Custom hook to use the font size context
export const useCookies = () => useContext(CookiesContext);