import React, {useContext, useState} from 'react';
import {SCREEN_NAME} from '../../../constants';
import {formatNum} from '../../../utils/functions/formatNum';
import getMoney from '../../../utils/functions/loadMoneyToContext';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {AddRemoveContext} from '../AddRemoveContext';
import {ManualPaymentContext} from '../ManualPaymentContext';
import {innerSaveManualPaymentSavings} from '../utils';
import ManualPaymentBaseScreen from "../components/ManualPaymentBaseScreen/ManualPaymentBaseScreen";

export default function SavingsManualPayment({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBillsSavings,
    setActualBillsSavings,
    actualCoinsSavings,
    setActualCoinsSavings,
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
  } = useContext(AddRemoveContext);

  const { totalPaymentSavings, setTotalPaymentSavings } =
    useContext(ManualPaymentContext);

  const context = useContext(AddRemoveContext);


  const handleSave = async () => {
    setIsLoading(true);

    await innerSaveManualPaymentSavings( context.currentUser.id,
      initialCoinsMoneySavings,
      actualCoinsSavings,
      initialBillsMoneySavings,
      actualBillsSavings,
    );
    await getMoney(context);

    if (totalPaymentSavings === 0) {
      toastNotification(
        'SE REALIZO EL PAGO CORRECTAMENTE!',
        'success',
        'success',
      );
    } else {
      toastNotification(
        `ACORDATE DE CARGAR TU VUELTO DE ${formatNum(
          Math.abs(totalPaymentSavings),
        )} EN TUS AHORROS !`,
        'info',
        'info',
      );
    }
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
      <ManualPaymentBaseScreen
          actualBills={actualBillsSavings}
          setActualBills={setActualBillsSavings}
          actualCoins={actualCoinsSavings}
          setActualCoins={setActualCoinsSavings}
          initialBillsMoneyWallet={initialBillsMoneySavings}
          initialCoinsMoneyWallet={initialCoinsMoneySavings}
          totalPaymentWallet={totalPaymentSavings}
          setTotalPaymentWallet={setTotalPaymentSavings}
          handleSave={handleSave}
      />
  );
}
