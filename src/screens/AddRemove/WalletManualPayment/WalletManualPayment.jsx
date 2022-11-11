import React, {useContext, useState} from 'react';
import {SCREEN_NAME} from '../../../constants';
import {formatNum} from '../../../utils/functions/formatNum';
import getMoney from '../../../utils/functions/loadMoneyToContext';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {AddRemoveContext} from '../AddRemoveContext';
import {ManualPaymentContext} from '../ManualPaymentContext';
import {innerSaveManualPayment} from '../utils';
import ManualPaymentBaseScreen from "../components/ManualPaymentBaseScreen/ManualPaymentBaseScreen";

export default function WalletManualPayment({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBills,
    setActualBills,
    actualCoins,
    setActualCoins,
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
  } = useContext(AddRemoveContext);
    const { totalPaymentWallet, setTotalPaymentWallet } =
        useContext(ManualPaymentContext);

  const context = useContext(AddRemoveContext);

  const handleSave = async () => {
    setIsLoading(true);

    await innerSaveManualPayment( context.currentUser.id,
      initialCoinsMoneyWallet,
      actualCoins,
      initialBillsMoneyWallet,
      actualBills,
    );
    await getMoney(context);

    if (totalPaymentWallet === 0) {
      toastNotification(
        'SE REALIZO EL PAGO CORRECTAMENTE!',
        'success',
        'success',
      );
    } else {
      toastNotification(
        `ACORDATE DE CARGAR TU VUELTO DE ${formatNum(
          Math.abs(totalPaymentWallet),
        )} EN LA BILLETERA !`,
        'info',
        'info',
      );
    }
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <ManualPaymentBaseScreen
        actualBills={actualBills}
        setActualBills={setActualBills}
        actualCoins={actualCoins}
        setActualCoins={setActualCoins}
        initialBillsMoneyWallet={initialBillsMoneyWallet}
        initialCoinsMoneyWallet={initialCoinsMoneyWallet}
        totalPaymentWallet={totalPaymentWallet}
        setTotalPaymentWallet={setTotalPaymentWallet}
        handleSave={handleSave}
    />
  );
}
