import React from 'react';

import { AddRemoveProvider } from './src/screens/AddRemove/AddRemoveContext';

import Root from './Root';


const App = () => {
 
    return (
        <AddRemoveProvider>
            <Root />
        </AddRemoveProvider>
    )
};

export default App;
