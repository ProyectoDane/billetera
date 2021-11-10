import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';

import ItemMoney from "../ItemMoney";

import { getCoins } from "../../../../dataAccess/Money";
import { getTotalWallet, getDineroWallet } from "../../../../dataAccess/Wallet";



const AddRemoveWalletBills = () => {
  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState({});
  const [total, setTotal] = useState(0)

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
      const monedas = await getCoins();
      const { money, total } = await getTotal()

      const idMoney = money.map(({moneyId}) => moneyId)

      let totalMonedas = monedas.map((el) => {
        let indexMoney = idMoney.indexOf(el.id);

        if(indexMoney > -1){
            el.quantity = el.quantity + money[indexMoney].quantity
        }
        return el
      })

      setTotal(total);
      setCoins(totalMonedas);
      setLoading(false)
    }

    getMoney();
    getTotal();
  }, [])


  return (
    <View>
      <View>
        <Text>Total ${total}</Text>
      </View>
      
      <ScrollView>
        {
          loading ? 
          <Text>Loading</Text> :
          coins.map(elem => 
              <ItemMoney 
                  key={`${elem.id} + ${elem.image}`} 
                  {...elem}
              />)
        }
      </ScrollView>
        <Button
          title="Guardar"
        />
      <View>
      </View>
    </View>
  );
};

export default AddRemoveWalletBills;