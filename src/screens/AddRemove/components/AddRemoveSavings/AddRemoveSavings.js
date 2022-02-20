import * as React from 'react';
import {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AddRemoveContext} from '../../AddRemoveContext';
import {innerSaveAddRemoveSavings} from '../../utils';
import getMoney from '../../../../utils/functions/loadMoneyToContext';
import {toastNotification} from '../../../../utils/functions/toastNotifcation';
import {SCREEN_NAME} from '../../../../constants';
import AddRemoveBaseScreen from "../AddRemoveBaseScreen/AddRemoveBaseScreen";

export default function AddRemoveSavings({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBillsSavings,
    setActualBillsSavings,
    actualCoinsSavings,
    setActualCoinsSavings,
    totalMoneySavings,
    actualMoneySavings,
    setActualMoneySavings,
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
  } = useContext(AddRemoveContext);

  const context = useContext(AddRemoveContext);

  const handleSave = async () => {
    setIsLoading(true);

    await innerSaveAddRemoveSavings(
      initialCoinsMoneySavings,
      actualCoinsSavings,
      initialBillsMoneySavings,
      actualBillsSavings,
    );
    await getMoney(context);
    toastNotification(
      'SE ACTUALIZO EL DINERO CORRECTAMENTE!',
      'success',
      'success',
    );
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
      <AddRemoveBaseScreen
                           actualBills={actualBillsSavings}
                           setActualBills={setActualBillsSavings}
                           actualCoins={actualCoinsSavings}
                           setActualCoins={setActualCoinsSavings}
                           totalMoneyWallet={totalMoneySavings} //number: El total guardado en la BD
                           actualMoneyWallet={actualMoneySavings} //number: El total antes de guardar (auxiliar)
                           setActualMoneyWallet={setActualMoneySavings}
                           initialBillsMoneyWallet={initialBillsMoneySavings} //array: billetes iniciales (guardados en la BD)
                           initialCoinsMoneyWallet={initialCoinsMoneySavings} //array: coins  iniciales (guardados en la BD)
                           handleSave={handleSave} />
  );
}

