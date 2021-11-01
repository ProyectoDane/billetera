import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { getBills, getCoins } from "../../dataAccess/Money";


const AddRemove = ({route}) => {
  const [bills, setBills] = useState({});
  const [coins, setCoins] = useState({});
  const [selectedMoney, setSelectedMoney] = useState([]);


    const getMoneyArray = (moneyArray) => {
      const obj = {};

      moneyArray.forEach((item) => {
        console.log(item)
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

  useEffect(() => {

    async function getMoney(){
      const billetes = await getBills();
      const monedas = await getCoins();

      const objBilletes = getMoneyArray(billetes);
      const objMonedas = getMoneyArray(monedas);

      console.log(objMonedas)
         
      /*
        ideas sugeridas: [{amount: 100, items: [{...itemEntero}, {...itemEntero}]}]

        <Wrapper amount={100} items={items} handleItem={handleItem}>
          {
            items.map(item => <Item onPress={handleItem} {...item} />)
          }
        </Wrapper>
      */
      // billetes = billetes.forEach((item) => console.log(item))

      setBills(objBilletes);
      setCoins(objMonedas);
      setSelectedMoney(billetes);
    }

    getMoney()
  }, [])

  const { from } = route.params

  const onPressBills = () => setSelectedMoney(bills)

  const onPressCoins = () => setSelectedMoney(coins)

  return (
    <View>
      <View>
        <Text>Total</Text>
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
