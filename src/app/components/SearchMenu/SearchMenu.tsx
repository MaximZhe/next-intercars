'use client'

import React from 'react';
import Menu from '../Header/Menu/Menu';
import { useMatchMedia } from '@/app/hooks/useMatchMedia';



const SearchMenu = () => {
    const { isMobile,isTablet } = useMatchMedia();
    return (
        <>
        {isMobile && !isTablet   ? <Menu/> : null}
        </>
    );
};

export default SearchMenu;