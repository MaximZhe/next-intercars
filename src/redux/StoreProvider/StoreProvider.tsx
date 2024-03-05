'use client';

import { Provider } from 'react-redux';
import {setupStore } from '../store/store';
import { persistStore } from 'redux-persist';
const store = setupStore();

persistStore(store);
const StoreProvider = ({children} : {children: React.ReactNode}) => {
    return <Provider store={store}>{children}</Provider>
    
};

export default StoreProvider;