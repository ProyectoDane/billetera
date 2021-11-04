import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AddRemoveWallet from "../AddRemoveWallet"

import { getBills, getCoins } from "../../dataAccess/Money";
import { getTotalWallet, getDineroWallet } from "../../dataAccess/Wallet";



const AddRemove = ({route}) => {
  
  return(
    <>
      {
        route.params.from === "wallet" ?
        <AddRemoveWallet /> :
        null
      }
    </>
  )
};

export default AddRemove;

const styles = StyleSheet.create({});
