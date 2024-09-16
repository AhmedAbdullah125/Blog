import React, { createContext, useContext, useState } from 'react';

// Create a context
const FilteredDataContext = createContext();

// Create a provider component
export const FilteredDataProvider = ({ children }) => {
    const [filtered , setfiltered] = useState([]);
    const [additional , setAdditional] = useState([]);
    const [single , setSingle] = useState("");
    const [page , setPage] = useState(1);
    
    return (
        <FilteredDataContext.Provider value={{page , setPage, filtered,  setfiltered,additional , setAdditional,single , setSingle}}>
            {children}
        </FilteredDataContext.Provider>
    );
};

// Custom hook to use the font size context
export const useFilteredData = () => useContext(FilteredDataContext);