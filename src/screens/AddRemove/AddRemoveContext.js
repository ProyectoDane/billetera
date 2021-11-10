import React, {useState, createContext} from "react";

export const AddRemoveContext = createContext();

export const AddRemoveProvider = ({children}) => {
    const [actualBills, setActualBills] = useState([])
    const [actualCoins, setActualCoins] = useState([])
    const [totalMoneyWallet, setTotalMoneyWallet] = useState(0);
    const [actualMoneyWallet, setActualMoneyWallet] = useState(0);
    const [initialBillsMoneyWallet, setInitialBillsMoneyWallet] = useState([])
    const [actualBillsMoneyWallet, setActualBillsMoneyWallet] = useState([])
    const [initialCoinsMoneyWallet, setInitialCoinsMoneyWallet] = useState([])
    const [actualCoinsMoneyWallet, setActualCoinsMoneyWallet] = useState([])

    const [actualBillsSavings, setActualBillsSavings] = useState([])
    const [actualCoinsSavings, setActualCoinsSavings] = useState([])
    const [totalMoneySavings, setTotalMoneySavings] = useState(0);
    const [actualMoneySavings, setActualMoneySavings] = useState(0);
    const [initialBillsMoneySavings, setInitialBillsMoneySavings] = useState([])
    const [actualBillsMoneySavings, setActualBillsMoneySavings] = useState([])
    const [initialCoinsMoneySavings, setInitialCoinsMoneySavings] = useState([])
    const [actualCoinsMoneySavings, setActualCoinsMoneySavings] = useState([])

    return(
        <AddRemoveContext.Provider value={{
            //Savings
                actualBillsSavings, 
                setActualBillsSavings,
                actualCoinsSavings,
                setActualCoinsSavings,
                totalMoneySavings,
                setTotalMoneySavings,
                actualMoneySavings,
                setActualMoneySavings,
                initialBillsMoneySavings, 
                setInitialBillsMoneySavings,
                actualBillsMoneySavings,
                setActualBillsMoneySavings,
                initialCoinsMoneySavings,
                setInitialCoinsMoneySavings,
                actualCoinsMoneySavings,
                setActualCoinsMoneySavings, 
            //Wallet
                actualBills,
                setActualBills,
                actualCoins,
                setActualCoins,
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
                actualCoinsMoneyWallet,
                setActualCoinsMoneyWallet
            }}
        >
            {children}
        </AddRemoveContext.Provider>
    )
}