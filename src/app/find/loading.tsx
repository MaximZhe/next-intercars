'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';
const Loading = () => {
    
    return (
        <>
           <GridLoader color={'#0243A6'} loading={ true} size={10}/> 
        </>
    );
};

export default Loading;