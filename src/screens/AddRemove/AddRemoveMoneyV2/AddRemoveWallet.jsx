import React, {useContext} from 'react';
import {AddRemoveContext} from '../AddRemoveContext';
import {innerSaveAddRemove} from '../utils';
import {calculateChanges} from '../../../utils/functions/calculateChanges';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {SCREEN_NAME} from '../../../constants';

import AddRemove from './AddRemove';

export default function AddRemoveWallet({navigation}) {
  const {
    actualBillsMoneyWallet: actualBills,
    setActualBillsMoneyWallet: setActualBills,
    actualCoinsMoneyWallet: actualCoins,
    setActualCoinsMoneyWallet: setActualCoins,
    totalMoneyWallet: initialTotal,
    actualMoneyWallet: actualTotal,
    setActualMoneyWallet: setActualTotal,
    initialBillsMoneyWallet: initialBills,
    initialCoinsMoneyWallet: initialCoins,
    currentUser,
    waitRefresh,
  } = useContext(AddRemoveContext);

  const hasUnsavedChanges = calculateChanges(initialBills, initialCoins, actualBills, actualCoins);

  const handleSave = async () => {
    await innerSaveAddRemove(currentUser.id, initialCoins, actualCoins, initialBills, actualBills);
    await waitRefresh();
    toastNotification('SE ACTUALIZO EL DINERO CORRECTAMENTE!', 'success', 'success');
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <AddRemove
      navigation={navigation}
      initialBills={initialBills}
      initialCoins={initialCoins}
      actualTotal={actualTotal}
      initialTotal={initialTotal}
      setActualTotal={setActualTotal}
      setActualBills={setActualBills}
      setActualCoins={setActualCoins}
      onSave={handleSave}
      hasUnsavedChanges={hasUnsavedChanges}
      title={'MI BILLETERA'}
    />
  );
}
