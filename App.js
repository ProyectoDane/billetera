import React from 'react';
import Root from './Root';

import { AddRemoveProvider } from './src/screens/AddRemove/AddRemoveContext';
import { ManualPaymentProvider } from './src/screens/AddRemove/ManualPaymentContext';
import * as ErrorRecovery from "expo-error-recovery";

const defaultErrorHandler = ErrorUtils.getGlobalHandler();

const globalErrorHandler = (err, isFatal) => {
    console.log("globalErrorHandler called!");
    ErrorRecovery.setRecoveryProps({ info: err });
    console.log(JSON.stringify(err, null, 2));
    defaultErrorHandler(err, isFatal);
};

ErrorUtils.setGlobalHandler(globalErrorHandler);

const App = ({ exp }) => {
  return (
    <AddRemoveProvider>
      <ManualPaymentProvider>
        <Root />
      </ManualPaymentProvider>
    </AddRemoveProvider>
  );
};
export default App;
