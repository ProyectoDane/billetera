import React, { useState, createContext } from 'react';

export const ManualPaymentContext = createContext();

export const ManualPaymentProvider = ({ children }) => {
  const [totalPaymentWallet, setTotalPaymentWallet] = useState(0);
  const [totalPaymentSavings, setTotalPaymentSavings] = useState(0);

  return (
    <ManualPaymentContext.Provider
      value={{
        totalPaymentWallet,
        setTotalPaymentWallet,
        totalPaymentSavings,
        setTotalPaymentSavings,
      }}>
      {children}
    </ManualPaymentContext.Provider>
  );
};
