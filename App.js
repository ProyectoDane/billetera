import React from 'react';
import Root from './Root';

import { AddRemoveProvider } from './src/screens/AddRemove/AddRemoveContext';
import { ManualPaymentProvider } from './src/screens/AddRemove/ManualPaymentContext';

const App = () => {
  return (
    <AddRemoveProvider>
      <ManualPaymentProvider>
        <Root />
      </ManualPaymentProvider>
    </AddRemoveProvider>
  );
};
export default App;
