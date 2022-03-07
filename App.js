import React from 'react';
import Root from './Root';

import { AddRemoveProvider } from './src/screens/AddRemove/AddRemoveContext';
import { ManualPaymentProvider } from './src/screens/AddRemove/ManualPaymentContext';
import * as ErrorRecovery from "expo-error-recovery";
import * as Sentry from 'sentry-expo';

const defaultErrorHandler = ErrorUtils.getGlobalHandler();

const globalErrorHandler = (err, isFatal) => {
    console.log("globalErrorHandler called!");
    ErrorRecovery.setRecoveryProps({ info: err });
    console.log(JSON.stringify(err, null, 2));
    defaultErrorHandler(err, isFatal);
};


Sentry.init({
    dsn: 'https://a840209b2ac545c9bcd30ebddff4ad1b@o1160454.ingest.sentry.io/6244941',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

// Access any @sentry/react-native exports via:
// Sentry.Native.*

// Access any @sentry/browser exports via:
// Sentry.Browser.*

// ErrorUtils.setGlobalHandler(globalErrorHandler);

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
