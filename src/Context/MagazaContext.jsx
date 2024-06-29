import React, { createContext } from 'react'
import all_product from "../Components/Assets/all_product"

export const MagazaContext = createContext(null);

const MagazaContextProvider = (props) => {

    const contextValue = {all_product};

    return(
        <MagazaContext.Provider value={contextValue}>
            {props.children}
        </MagazaContext.Provider>
    )
}

export default MagazaContextProvider;