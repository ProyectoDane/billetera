import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { getBills, getCoins } from "../../dataAccess/Money";
import { getTotalWallet, getDineroWallet } from "../../dataAccess/Wallet";



const AddRemove = ({route}) => {
  const [bills, setBills] = useState({});
  const [coins, setCoins] = useState({});
  const [selectedMoney, setSelectedMoney] = useState([]);
  const [total, setTotal] = useState(0)
  const [orderMoney, setOrderMoney] = useState([]);


  const getMoneyArray = (moneyArray) => {
    const obj = {};

    moneyArray.forEach((item) => {
      const { amount } = item;
      if(obj[amount]){
        obj[amount]["items"].push(item)
      } else {
        obj[amount] = {items: []}
        obj[amount]["items"].push(item)
      }
      }
    )

    return obj
  }

    //TODO: Tomar las keys de la lista de objetos, y ordenarlas de mayor a menor
    //TODO: capturar al hacer click el id del moneyId
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
      const total = 0;

      if(wallet){
        let money = await getDineroWallet(wallet.moneyId)

        console.log(money)
      }

      // for(let item of wallet){
      //   const { moneyId, quantity, userId } = item
      //   let money = await getDineroWallet(moneyId);
        
      //   console.log(moneyId, money)
      // }
    }

    async function getMoney(){
      const billetes = await getBills();
      const monedas = await getCoins();

      const objBilletes = getMoneyArray(billetes);
      const objMonedas = getMoneyArray(monedas);

      setBills(objBilletes);
      setCoins(objMonedas);
      setSelectedMoney(billetes);
    }

    getMoney();
    getTotal();
  }, [])

  const { from } = route.params

  const onPressBills = () => setSelectedMoney(bills)

  const onPressCoins = () => setSelectedMoney(coins)

  return (
    <View>
      <View>
        <Text>Total ${total}</Text>
      </View>
      {/* <View>
        {
          // selectedMoney.map(({amount, id, image}) => console.log(`id:${id} - ${image}`))
        }
      </View> */}
        <Button
          title="Guardar"
        />
      <View>
        <Button
          title="Billetes"
          onPress={onPressBills}
        />
        <Button
          title="Monedas"
          onPress={onPressCoins}
        />
      </View>
    </View>
  );
};

export default AddRemove;

const styles = StyleSheet.create({});
