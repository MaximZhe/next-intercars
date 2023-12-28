
'use client'
import { useMatchMedia } from '../hooks/useMatchMedia';
import Menu from '../components/Header/Menu/Menu';
import ListRates from '../components/ListRates/ListRates';



const SearchResultPage = () => {
    const { isMobile,isTablet } = useMatchMedia();
    return (
        <>
        
        {isMobile && !isTablet   ? <Menu/> : null}
           <ListRates/>
        </>
    );
};

export default SearchResultPage;