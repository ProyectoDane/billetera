import React, { useEffect } from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import { initialization } from './src/db/queries';

const App = () => {

    useEffect(() => {
        const init = async () => await initialization()

        init()
    }, [])

    return <AppNavigation />
};

export default App;
