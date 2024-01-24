'use client'
import style from './NewsPage.module.scss';


import ItemNewsPage from './ItemNewsPage/ItemNewsPage';




import { useState } from 'react';
import Menu from '../../components/Header/Menu/Menu';
import { NewsPageListData, sliderRoutesInternational } from '../../constant/constant';
import Button from '../../components/UI/Button/Button';
import ArrowRight from '../../icons/svg/ArrowRight';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';
// import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';

const NewsPage = () => {
    const [visibleItems, setVisibleItems] = useState(4);
    const itemsPerPage = 4; 

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };
    
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.news}>
                <div className='container'>
                    <div className={style['news__wrapper']}>
                        <div className={style['news__content']}>
                            {/* <Breadcrumbs/> */}
                            

                            <h1 className={style['news__title']}>
                                Новости
                            </h1>
                            {NewsPageListData.slice(0, visibleItems).map((item) => (
                                <ItemNewsPage key={item.id} dataItem={item} />
                            ))}
                            
                            <Button disabled={NewsPageListData.length > visibleItems ? false : true} 
                            type='button'
                            onClick={handleShowMore}
                            className={`${style['news__btn']} ${NewsPageListData.length > visibleItems ? '' : style.disabled}`}>
                                <p className={style['news__btn-text']}>Показать еще</p>
                                <ArrowRight className={style['news__icon']} />
                            </Button>
                            
                        </div>
                        <div className={style['news__promo']}>
                            {sliderRoutesInternational.slice(0, 2).map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['news-route__item']}`} />

                            ))}
                            
                            <ButtonRoutes to={{pathname:'/404'}} title={'Другие популярные маршруты'} className={`${style['news__more']}`} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default NewsPage;