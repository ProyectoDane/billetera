import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from "../ItemMoney";
import { AddRemoveContext } from "../../AddRemoveContext";


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

const AddRemoveWalletBills = () => {
  const {
    totalMoneyWallet,
    initialBillsMoneyWallet,
  } = useContext(AddRemoveContext)

  const [bills, setBills] = useState(() => {
    let newBills = [...initialBillsMoneyWallet]
    return newBills
  });
  const [total, setTotal] = useState(totalMoneyWallet);


  const handleAdd = (elem, index) => {
    let newBills = bills;
    newBills[index].quantity = newBills[index].quantity + 1
    setTotal(total + newBills[index].amount)
    setBills(newBills)
  }

  const handleSub = (elem, index) => {
    let newBills = bills;
    newBills[index].quantity = newBills[index].quantity - 1
    setTotal(total - newBills[index].amount)
    setBills(newBills)
  }

  const handleSave = () => {
    console.log("bills", bills)
    console.log("initial", initialBillsMoneyWallet)
    // let addMoney = [];
    // let subMoney = [];
    // let moneyLength = bills.length;

    // for(let i = 0; moneyLength > i; i++){
    //   let initialValue = initialBills[i];
    //   let actualValue = bills[i];

    //   console.log("initial",initialValue)
    //   console.log("actual",actualValue)

    //   if(initialValue > actualValue){
    //     subMoney.push({
    //       money_id: bills.id,
    //       quantity: initialValue - actualValue
    //     })
    //   }
    //   if(actualValue > initialValue){
    //     addMoney.push({
    //       money_id: bills.id,
    //       quantity: actualValue - initialValue
    //     })
    //   }
    // }

    // console.log("add", addMoney)
    // console.log("sub", subMoney)
  }

  return (
    <View style={{marginBottom: 60}}>
      <View>
        <Text>Total ${total}</Text>
        <Button
          title="Guardar"
          onPress={() => handleSave()}
        />
      </View>
      
      <ScrollView>
        {
          bills.map((elem, index) => {
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

export default AddRemoveWalletBills;