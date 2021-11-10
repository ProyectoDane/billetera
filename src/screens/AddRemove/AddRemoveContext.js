import React, {useState, createContext} from "react";

export const AddRemoveContext = createContext();

export const AddRemoveProvider = ({children}) => {
    const [totalMoneyWallet, setTotalMoneyWallet] = useState(0);
    const [actualMoneyWallet, setActualMoneyWallet] = useState(0);
    const [initialBillsMoneyWallet, setInitialBillsMoneyWallet] = useState([])
    const [actualBillsMoneyWallet, setActualBillsMoneyWallet] = useState([])
    const [initialCoinsMoneyWallet, setInitialCoinsMoneyWallet] = useState([])

    return(
        <AddRemoveContext.Provider value={{
                totalMoneyWallet,
                setTotalMoneyWallet,
                actualMoneyWallet,
                setActualMoneyWallet,
                initialBillsMoneyWallet,
                setInitialBillsMoneyWallet,
                actualBillsMoneyWallet,
                setActualBillsMoneyWallet,
                initialCoinsMoneyWallet,
                setInitialCoinsMoneyWallet,
            }}
        >
            {children}
        </AddRemoveContext.Provider>
    )
}