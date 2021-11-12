import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from "../ItemMoney";
import { AddRemoveContext } from "../../AddRemoveContext";
import { insertMoneyToSavings,deleteMoneySavings } from "../../../../dataAccess/Savings"


const MoneyObject = (elem) => {
  const [total, setTotal] = useState(elem.quantity)

  const add = () => setTotal(total + 1)
  const sub = () => setTotal(total - 1)

  return(
      <View>
        <ItemMoney 
            {...elem}
        />
        <TouchableOpacity
          disabled={elem.quantity === 0}
          onPress={() => {
              sub();
              elem.handleSub();
            }}
        >
          <AntDesign 
            name="minuscircle"
            size={20} 
            color={elem.quantity === 0? "grey" : "red"} 
          />
        </TouchableOpacity>
        <Text>{total}</Text>
        <TouchableOpacity
          onPress={() => {
              add();
              elem.handleAdd();
            }}
        >
          <AntDesign 
            name="pluscircle"
            size={20} 
            color="green" 
          />
        </TouchableOpacity>
      </View>
  )
}

const AddRemoveSavingsCoins = () => {
  const {
    actualBillsSavings,
    setActualBillsSavings,
    actualCoinsSavings,
    setActualCoinsSavings,
    totalMoneySavings,
    setTotalMoneySavings,
    actualMoneySavings,
    setActualMoneySavings,
    initialCoinsMoneySavings,
    setInitialCoinsMoneySavings,
  } = useContext(AddRemoveContext)


  useEffect(() => {
    if(totalMoneySavings !== actualMoneySavings){
      setActualMoneySavings(totalMoneySavings)
    }
    setActualCoinsSavings(JSON.parse(JSON.stringify(initialCoinsMoneySavings)));
  }, [])

  const handleAdd = (elem, index) => {
    let newCoins = actualCoinsSavings;
    newCoins[index].quantity = newCoins[index].quantity + 1
    setActualMoneySavings(actualMoneySavings + newCoins[index].amount)
    setActualCoinsSavings(newCoins)
  }

  const handleSub = (elem, index) => {
    let newCoins = actualCoinsSavings;
    newCoins[index].quantity = newCoins[index].quantity - 1
    setActualMoneySavings(actualMoneySavings - newCoins[index].amount)
    setActualCoinsSavings(newCoins)
  }

  const handleSave = async() => {
    let addMoney = [];
    let subMoney = [];
    let moneyLength = actualCoinsSavings.length;

    for(let i = 0; moneyLength > i; i++){
      let initialValue = initialCoinsMoneySavings[i].quantity;
      let actualValue = actualCoinsSavings[i].quantity;

      if(initialValue > actualValue){
        subMoney.push({
          money_id: actualCoinsSavings[i].id,
          quantity: initialValue - actualValue
        })
      }
      if(actualValue > initialValue){
        addMoney.push({
          money_id: actualCoinsSavings[i].id,
          quantity: actualValue - initialValue
        })
      }
    }

    if(addMoney.length){
      for(let property in addMoney){
        const { money_id, quantity } = property
        await insertMoneyToSavings(1,money_id,quantity)
      }
    }

    if(subMoney.length){
      for(let property in addMoney){
        const { money_id, quantity } = property
        await deleteMoneySavings(1,money_id,quantity)
      }
    }

    setActualMoneySavings(actualMoneySavings)
    setTotalMoneySavings(actualMoneySavings)
    setInitialCoinsMoneySavings(actualCoinsSavings)
    setActualCoinsSavings(actualCoinsSavings)
    setActualBillsSavings(actualBillsSavings)
  }

  return (
    <View style={{marginBottom: 60}}>
      <View>
        <Text>Total ${actualMoneySavings}</Text>
        <Button
          title="Guardar"
          onPress={() => handleSave()}
        />
      </View>
      
      <ScrollView>
        {
          actualCoinsSavings.map((elem, index) => {
            return <MoneyObject 
                    key={`name: ${elem.image} - amount: ${elem.amount}`}
                    handleAdd={() => handleAdd(elem,index)} 
                    handleSub={() => handleSub(elem,index)}
                    {...elem}
                  />
            }
          )
        }
      </ScrollView>
      </View>
  );
};

export default AddRemoveSavingsCoins;