'use client';

import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {persist } from '../store/store';

const PersistProvider = ({children} : {children: React.ReactNode}) => {
    return <PersistGate loading={null} persistor={persist}>{children}</PersistGate>
};

export default PersistProvider;