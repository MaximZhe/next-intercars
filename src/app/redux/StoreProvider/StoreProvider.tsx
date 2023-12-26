'use client';

import { Provider } from 'react-redux';
import {setupStore } from '../store/store';
const store = setupStore();

const StoreProvider = ({children} : {children: React.ReactNode}) => {
    return <Provider store={store}>{children}</Provider>
    
};

export default StoreProvider;