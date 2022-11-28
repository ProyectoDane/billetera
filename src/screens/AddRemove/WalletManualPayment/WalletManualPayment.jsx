import React, {useContext} from 'react';
import {SCREEN_NAME} from '../../../constants';
import {formatNum} from '../../../utils/functions/formatNum';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {AddRemoveContext} from '../AddRemoveContext';
import {ManualPaymentContext} from '../ManualPaymentContext';
import {innerSaveManualPayment} from '../utils';
import ManualPayment from '../ManualPaymentV2/ManualPayment';

export default function WalletManualPayment({navigation}) {
  const {
    actualBills,
    setActualBills,
    actualCoins,
    setActualCoins,
    totalMoneyWallet: initialTotal,
    setActualMoneyWallet: setActualTotal,
    initialBillsMoneyWallet: initialBills,
    initialCoinsMoneyWallet: initialCoins,
    currentUser,
    waitRefresh,
  } = useContext(AddRemoveContext);

  const {totalPaymentWallet, setTotalPaymentWallet} = useContext(ManualPaymentContext);

  const handleSave = async () => {
    await innerSaveManualPayment(currentUser.id, initialCoins, actualCoins, initialBills, actualBills);
    await waitRefresh();
    if (totalPaymentWallet === 0) {
      toastNotification('SE REALIZO EL PAGO CORRECTAMENTE!', 'success', 'success');
    } else {
      toastNotification(
        `ACORDATE DE CARGAR TU VUELTO DE ${formatNum(Math.abs(totalPaymentWallet))} EN LA BILLETERA !`,
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
      totalPayment={totalPaymentWallet}
      setTotalPayment={setTotalPaymentWallet}
      onSave={handleSave}
    />
  );
}
