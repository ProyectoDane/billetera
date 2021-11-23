import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import MoneyObjectAddRemove from '../../components/MoneyObjectAddRemove/MoneyObjectAddRemove';
// import MoneyObjectPayment from '../../components/MoneyObjectPayment/MoneyObjectPayment';

const WalletManualPaymentBills = ({
  initialMoney,
  actualMoney,
  setActualMoney,
  actualMoneyWallet,
  setActualMoneyWallet,
  totalMoneyWallet,
}) => {
  useEffect(() => {
    if (totalMoneyWallet !== actualMoneyWallet) {
      setActualMoneyWallet(totalMoneyWallet);
    }
    setActualMoney(JSON.parse(JSON.stringify(initialMoney)));
  }, []);

  const handleSub = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity + 1;
    setActualMoneyWallet(actualMoneyWallet + actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  const handleAdd = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity - 1;
    setActualMoneyWallet(actualMoneyWallet - actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        {actualMoney.map((elem, index) => {
          return (
            <MoneyObjectAddRemove
              key={`ManualPayment ${index} - amount: ${elem.amount}`}
              handleAdd={() => handleAdd(elem, index)}
              handleSub={() => handleSub(elem, index)}
              comprar={true}
              {...elem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WalletManualPaymentBills;

// import React, { useState, useContext, useEffect } from 'react';
// import { Text, View, ScrollView } from 'react-native';

// import SingleButton from '../../../../components/SingleButton';
// import MoneyObjectPayment from '../../components/MoneyObjectPayment';
// import { AddRemoveContext } from '../../AddRemoveContext';
// import { ManualPaymentContext } from '../../ManualPaymentContext';
// import { toastNotification } from '../../../../utils/functions/toastNotifcation';
// import { deleteMoneyWallet } from '../../../../dataAccess/Wallet';
// import { formatNum } from '../../../../utils/functions/formatNum';
// import { colors, SCREEN_NAME } from '../../../../constants';

// const WalletManualPaymentBills = ({ navigation }) => {
//   const { totalPaymentWallet, setTotalPaymentWallet } =
//     useContext(ManualPaymentContext);

//   const {
//     actualBillsMoneyWallet,
//     setActualBillsMoneyWallet,
//     setActualBills,
//     actualMoneyWallet,
//     setActualMoneyWallet,
//     setTotalMoneyWallet,
//     setInitialBillsMoneyWallet,
//   } = useContext(AddRemoveContext);

//   const totalPayment = totalPaymentWallet;

//   const [total, setTotal] = useState(totalPayment);
//   const [bills, setBills] = useState([]);

//   useEffect(() => {
//     setBills(JSON.parse(JSON.stringify(actualBillsMoneyWallet)));
//   }, []);

//   // const totalInicial = totalPaymentWallet;

//   const handleSave = async () => {
//     // setIsLoading(true);
//     let subMoney = [];
//     let moneyLength = bills.length;

//     for (let i = 0; moneyLength > i; i++) {
//       let initialValue = actualBillsMoneyWallet[i].quantity;
//       let actualValue = bills[i].quantity;

//       if (initialValue > actualValue) {
//         subMoney.push({
//           money_id: bills[i].id,
//           quantity: initialValue - actualValue,
//         });
//       }
//     }

//     if (subMoney.length) {
//       for (let property in subMoney) {
//         const { money_id, quantity } = subMoney[property];
//         await deleteMoneyWallet(1, money_id, quantity);
//       }
//     }

//     setActualMoneyWallet(actualMoneyWallet - totalPayment);
//     setTotalMoneyWallet(actualMoneyWallet - totalPayment);
//     setActualBillsMoneyWallet(bills);
//     setActualBills(bills);
//     setInitialBillsMoneyWallet(bills);
//     // setActualCoins(actualCoins);
//     toastNotification('SE PAGÓ CORRECTAMENTE!', 'success', 'success');
//     navigation.navigate(SCREEN_NAME.HOME);
//   };

//   return (
//     <View
//       style={{
//         marginBottom: 90,
//       }}>
//       <View style={{ backgroundColor: '#BBB' }}>
//         <Text style={{ fontSize: 30, textAlign: 'center' }}>
//           Total {formatNum(total)}
//         </Text>
//       </View>
//       <ScrollView
//         contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
//         {actualBillsMoneyWallet.map((elem, index) => {
//           if (elem.quantity > 0 && elem.amount <= totalPayment) {
//             return (
//               <MoneyObjectPayment
//                 key={`name: ${elem.image} - amount: ${elem.amount}`}
//                 setBills={setBills}
//                 bills={bills}
//                 index={index}
//                 total={total}
//                 setTotal={setTotal}
//                 {...elem}
//               />
//             );
//           }
//           return null;
//         })}
//       </ScrollView>
//       <View style={{ paddingVertical: 5 }}>
//         <SingleButton
//           icon="money-bill-wave"
//           sizeIcon={22}
//           label="PAGAR"
//           // isLoading={isLoading}
//           disabled={total !== 0}
//           onPress={handleSave}
//           style={{
//             backgroundColor: total !== 0 ? colors.disable : colors.secondary,
//             marginTop: 0,
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default WalletManualPaymentBills;
