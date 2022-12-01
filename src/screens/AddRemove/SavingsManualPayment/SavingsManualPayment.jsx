import React, {useContext} from 'react';
import {SCREEN_NAME} from '../../../constants';
import {formatNum} from '../../../utils/functions/formatNum';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {AddRemoveContext} from '../AddRemoveContext';
import {ManualPaymentContext} from '../ManualPaymentContext';
import {innerSaveManualPaymentSavings} from '../utils';
import ManualPayment from '../ManualPaymentV2/ManualPayment';

export default function SavingsManualPayment({navigation}) {
  const {
    actualBillsSavings: actualBills,
    setActualBillsSavings: setActualBills,
    actualCoinsSavings: actualCoins,
    setActualCoinsSavings: setActualCoins,
    totalMoneySavings: initialTotal,
    setActualMoneySavings: setActualTotal,
    initialBillsMoneySavings: initialBills,
    initialCoinsMoneySavings: initialCoins,
    currentUser,
    waitRefresh,
  } = useContext(AddRemoveContext);

  const {totalPaymentSavings, setTotalPaymentSavings} = useContext(ManualPaymentContext);

  const handleSave = async () => {
    await innerSaveManualPaymentSavings(currentUser.id, initialCoins, actualCoins, initialBills, actualBills);
    await waitRefresh();
    if (totalPaymentSavings === 0) {
      toastNotification('SE REALIZO EL PAGO CORRECTAMENTE!', 'success', 'success');
    } else {
      toastNotification(
        `ACORDATE DE CARGAR TU VUELTO DE ${formatNum(Math.abs(totalPaymentSavings))} EN TUS AHORROS !`,
        'info',
        'info',
      );
    }
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <ManualPayment
      navigation={navigation}
      initialBills={initialBills}
      initialCoins={initialCoins}
      initialTotal={initialTotal}
      setActualBills={setActualBills}
      setActualCoins={setActualCoins}
      setActualTotal={setActualTotal}
      totalPayment={totalPaymentSavings}
      setTotalPayment={setTotalPaymentSavings}
      onSave={handleSave}
    />
  );
}
