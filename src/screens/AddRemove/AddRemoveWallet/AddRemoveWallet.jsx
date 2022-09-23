import * as React from 'react';
import { useContext } from 'react';
import { AddRemoveContext } from '../AddRemoveContext';
import { innerSaveAddRemove } from '../utils';
import getMoney from '../../../utils/functions/loadMoneyToContext';
import { toastNotification } from '../../../utils/functions/toastNotifcation';
import { SCREEN_NAME } from '../../../constants';
import AddRemoveBaseScreen from '../components/AddRemoveBaseScreen/AddRemoveBaseScreen';

export default function AddRemoveWallet({ navigation }) {
  const {
    actualBills, //array: billetes en la instancia
    setActualBills,
    actualCoins, //array: coins en la instancia
    setActualCoins,
    totalMoneyWallet, //number: El total guardado en la BD
    actualMoneyWallet, //number: El total antes de guardar (auxiliar)
    setActualMoneyWallet,
    initialBillsMoneyWallet, //array: billetes iniciales (guardados en la BD)
    initialCoinsMoneyWallet, //array: coins  iniciales (guardados en la BD)
  } = useContext(AddRemoveContext);

  const context = useContext(AddRemoveContext);

  const handleSave = async () => {
    await innerSaveAddRemove(initialCoinsMoneyWallet, actualCoins, initialBillsMoneyWallet, actualBills);
    await getMoney(context);
    toastNotification('SE ACTUALIZO EL DINERO CORRECTAMENTE!', 'success', 'success');
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <AddRemoveBaseScreen
      navigation={navigation}
      actualBills={actualBills}
      setActualBills={setActualBills}
      actualCoins={actualCoins}
      setActualCoins={setActualCoins}
      totalMoneyWallet={totalMoneyWallet} //number: El total guardado en la BD
      actualMoneyWallet={actualMoneyWallet} //number: El total antes de guardar (auxiliar)
      setActualMoneyWallet={setActualMoneyWallet}
      initialBillsMoneyWallet={initialBillsMoneyWallet} //array: billetes iniciales (guardados en la BD)
      initialCoinsMoneyWallet={initialCoinsMoneyWallet} //array: coins  iniciales (guardados en la BD)
      handleSave={handleSave}
    />
  );
}
