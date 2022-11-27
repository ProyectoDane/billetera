import React, {useContext} from 'react';
import {AddRemoveContext} from '../AddRemoveContext';
import {innerSaveAddRemoveSavings} from '../utils';
import {calculateChanges} from '../../../utils/functions/calculateChanges';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {SCREEN_NAME} from '../../../constants';

import AddRemove from './AddRemove';

export default function AddRemoveSavings({navigation}) {
  const {
    actualBillsSavings: actualBills,
    setActualBillsSavings: setActualBills,
    actualCoinsSavings: actualCoins,
    setActualCoinsSavings: setActualCoins,
    totalMoneySavings: initialTotal,
    actualMoneySavings: actualTotal,
    setActualMoneySavings: setActualTotal,
    initialBillsMoneySavings: initialBills,
    initialCoinsMoneySavings: initialCoins,
    currentUser,
    waitRefresh,
  } = useContext(AddRemoveContext);

  const hasUnsavedChanges = calculateChanges(initialBills, initialCoins, actualBills, actualCoins);

  const handleSave = async () => {
    await innerSaveAddRemoveSavings(currentUser.id, initialCoins, actualCoins, initialBills, actualBills);
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
      title={'MIS AHORROS'}
    />
  );
}
