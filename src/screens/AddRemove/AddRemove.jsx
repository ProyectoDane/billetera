import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AddRemoveWalletBills from "./components/AddRemoveWalletBills"
import AddRemoveSavingsBills from "./components/AddRemoveSavingsBills"


import { getBills, getCoins } from "../../dataAccess/Money";
import { getTotalWallet, getDineroWallet } from "../../dataAccess/Wallet";



const AddRemove = ({route}) => {
  
  return(
    <>
      {
        route.params.from === "wallet" ?
        <>
          <AddRemoveWalletBills />
        </> :
        <>
          <AddRemoveSavingsBills />
        </>
      }
    </>
  )
};

export default AddRemove;

const styles = StyleSheet.create({});
