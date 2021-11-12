import React from 'react';
import Root from './Root';

import { AddRemoveProvider } from './src/screens/AddRemove/AddRemoveContext';

const App = () => {
  return (
    <AddRemoveProvider>
      <Root />
    </AddRemoveProvider>
  );
};
export default App;
