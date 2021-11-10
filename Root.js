import React, { useEffect, useContext } from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import { initialization } from './src/db/queries';
import { AddRemoveContext } from "./src/screens/AddRemove/AddRemoveContext";


import { getBills, getCoins } from "./src/dataAccess/Money";
import { getTotalWallet, getDineroWallet } from "./src/dataAccess/Wallet";

const Root = () => {
    const {
            setInitialBillsMoneyWallet,
            setActualBillsMoneyWallet,
            setInitialCoinsMoneyWallet,
            setTotalMoneyWallet,
            setActualMoneyWallet,
    } = useContext(AddRemoveContext)


  useEffect(() => {
    async function getTotal(){
      const wallet = await getTotalWallet();
      let total = 0;
      let money = [];

      if(wallet){
        money = await getDineroWallet(wallet.moneyId)

        for(let property of money){
          const { amount, quantity } = property
          total = total + amount * quantity
        }

        return {
          money,
          total
        }
      } 

      return {
          money,
          total
      }
    }


    async function getMoney(){
      let billetes = await getBills();
      let monedas = await getCoins();

      const { money, total } = await getTotal()

      const idMoney = money.map(({moneyId}) => moneyId)

      let totalBilletes = billetes.map((el) => {
        let indexMoney = idMoney.indexOf(el.id);

        if(indexMoney > -1){
            el.quantity = el.quantity + money[indexMoney].quantity
        }
        return el
      })

      let totalCoins = monedas.map((el) => {
        let indexMoney = idMoney.indexOf(el.id);

        if(indexMoney > -1){
            el.quantity = el.quantity + money[indexMoney].quantity
        }
        return el
      })

      setInitialBillsMoneyWallet(totalBilletes);
      setActualBillsMoneyWallet(totalBilletes);
      setInitialCoinsMoneyWallet(totalCoins);
      setTotalMoneyWallet(total);
      setActualMoneyWallet(total);
    }

    getMoney();
    getTotal();
    initialization()
  },[])

    return (
        <>
            <AppNavigation />
        </>
    )
};

export default Root;
