import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';

import WrapperMoney from "../AddRemove/WrapperMoney";
import ItemMoney from "../AddRemove/ItemMoney";

import { getBills, getCoins } from "../../dataAccess/Money";
import { getTotalWallet, getDineroWallet } from "../../dataAccess/Wallet";



const AddRemoveWallet = () => {
  const [bills, setBills] = useState({});
  const [coins, setCoins] = useState({});
  const [selectedMoney, setSelectedMoney] = useState([]);
  const [total, setTotal] = useState(0)
  const [orderBills, setOrderBills] = useState([]);
  const [orderCoins, setOrderCoins] = useState([]);
  const [actualOrder, setActualOrder] = useState([])

  const getMoneyArray = (moneyArray, actualMoney) => {
    let idsActualMoney = actualMoney.map(({moneyId}) => moneyId)
    const obj = {};

    // se creo objeto con clave del valor del dinero
    // se le agregan los items del mismo valor a ese objeto
    moneyArray.forEach((item) => {
        const { amount } = item;
        if(obj[amount]){
          obj[amount]["items"].push(item);
        } else {
          obj[amount] = {items: []};
          obj[amount]["items"].push(item);
        }
      }
    )

    for(let property in obj){
      const { items } = obj[property];


        obj[property].items = items.map((el) => {
            if(idsActualMoney.includes(el.id)){
            let indexActualMoney = idsActualMoney.indexOf(el.id)
                el.quantity = actualMoney[indexActualMoney].quantity
            } else {
                 el.quantity = 0
            }

            return el
        })
    }

    return obj;
  }

    // TODO: capturar al hacer click el id del moneyId
      /*

        ideas sugeridas: [{amount: 100, items: [{...itemEntero}, {...itemEntero}]}]

        <Wrapper amount={100} items={items} handleItem={handleItem}>
          {
            items.map(item => <Item onPress={handleItem} {...item} />)
          }
        </Wrapper>
      */

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
        console.log("getMone")
        let indexBills = [];
        let indexCoins = [];
      let billetes = await getBills();

        console.log(billetes)

      const monedas = await getCoins();
      const { money, total } = await getTotal()

      const objBilletes = getMoneyArray(billetes, money);
      const objMonedas = getMoneyArray(monedas, money);

      for(let property of billetes){
          const {amount} = property
          if(!indexBills.includes(amount)){
              indexBills.push(amount)
          }
      }

        for(let property of monedas){
          const {amount} = property
          if(!indexCoins.includes(amount)){
              indexCoins.push(amount)
          }
      }

       indexBills = indexBills.sort((a,b) => a - b).reverse()
       indexCoins = indexCoins.sort((a,b) => a - b).reverse()


      setTotal(total);
      setBills(objBilletes);
      setCoins(objMonedas);
      setOrderBills(indexBills);
      setOrderCoins(indexCoins)
      setSelectedMoney(objBilletes);
      setActualOrder(indexBills);
    }

    getMoney();
    getTotal();
  }, [])

/*
{
    "1000": {
        title: "BILLETES DE 1000",
        items: [
            {
                ...billeteDeMil
            }
        ]
    },
}


 */


  const onPressBills = () => {
    setActualOrder(orderBills)
    setSelectedMoney(bills)
   };

  const onPressCoins = () => {
      setActualOrder(orderCoins)
      setSelectedMoney(coins)
    };

  
  
  
  
  
  return (
    <View>
      <View>
        <Text>Total ${total}</Text>
      </View>
      <ScrollView>
        {
          !selectedMoney.length &&
            actualOrder.map((el) => {
            return(
                <WrapperMoney key={`valor: ${el}`}>
                    {
                        selectedMoney[el].items.map(elem => 
                            <ItemMoney 
                                key={`${elem.id} + ${elem.image}`} 
                                {...elem}
                            />)
                    }
                </WrapperMoney>)
            })
        }
        <Button
          title="Billetes"
          onPress={onPressBills}
        />
        <Button
          title="Monedas"
          onPress={onPressCoins}
        /> 
      </ScrollView>
        {/* <Button
          title="Guardar"
        /> */}
      <View>
      </View>
    </View>
  );
};

export default AddRemoveWallet;