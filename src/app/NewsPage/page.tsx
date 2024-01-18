
import './NewsPage.scss';


import ItemNewsPage from './ItemNewsPage/ItemNewsPage';




import { useState } from 'react';
import Menu from '../components/Header/Menu/Menu';
import { NewsPageListData, sliderRoutesInternational } from '../constant/constant';
import Button from '../components/UI/Button/Button';
import ArrowRight from '../icons/svg/ArrowRight';
import RouteItem from '../components/RouteItem/RouteItem';
import ButtonRoutes from '../components/UI/Button/ButtonRoutes/ButtonRoutes';
// import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';

const NewsPage = () => {
    const [visibleItems, setVisibleItems] = useState(4);
    const itemsPerPage = 4; 

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };
    
    return (
        <>
            <Menu className='menu_theme_blue' />
            <section className='news'>
                <div className='container'>
                    <div className='news__wrapper'>
                        <div className='news__content'>
                            {/* <Breadcrumbs/> */}
                            

                            <h1 className='news__title'>
                                Новости
                            </h1>
                            {NewsPageListData.slice(0, visibleItems).map((item) => (
                                <ItemNewsPage key={item.id} dataItem={item} />
                            ))}
                            
                            <Button disabled={NewsPageListData.length > visibleItems ? false : true} 
                            type='button'
                            onClick={handleShowMore}
                            className={`news__btn ${NewsPageListData.length > visibleItems ? '' : 'disabled'}`}>
                                <p className='news__btn-text'>Показать еще</p>
                                <ArrowRight className='news__icon' />
                            </Button>
                            
                        </div>
                        <div className='news__promo'>
                            {sliderRoutesInternational.slice(0, 2).map((item) => (

                                <RouteItem key={item.id} data={item} className={'news-route'} />

                            ))}
                            
                            <ButtonRoutes to={{pathname:'/'}} title={'Другие популярные маршруты'} className={'news__more'} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default NewsPage;