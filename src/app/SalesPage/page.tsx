'use client';
import style from './SalesPage.module.scss';
import ItemSalesPage from './ItemSalesPage/ItemSalesPage';
import { useState } from 'react';
import Menu from '../components/Header/Menu/Menu';
import { SalesPageListData, sliderRoutesInternational } from '../constant/constant';
import RouteItem from '../components/RouteItem/RouteItem';
import ButtonRoutes from '../components/UI/Button/ButtonRoutes/ButtonRoutes';
import Button from '../components/UI/Button/Button';
import ArrowRight from '../icons/svg/ArrowRight';



const SalesPage = () => {
    
    const [visibleItems, setVisibleItems] = useState(4);
    const itemsPerPage = 4; 

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.sales}>
                <div className='container'>
                    <div className={style['sales__wrapper']}>
                        <div className={style['sales__content']}>
                          
                            <h1 className={style['sales__title']}>
                                Выгодные предложения Intercars
                            </h1>
                            {SalesPageListData.slice(0, visibleItems).map((item) => (
                                <ItemSalesPage key={item.id} dataItem={item} />
                            ))}
                            
                            <Button disabled={SalesPageListData.length > visibleItems ? false : true} 
                            type='button'
                            onClick={handleShowMore}
                            className={`${style['sales__btn']} ${SalesPageListData.length > visibleItems ? '' : style.disabled}`}>
                                <p className={style['sales__btn-text']}>Показать еще</p>
                                <ArrowRight className={style['sales__icon']} />
                            </Button>
                            
                        </div>
                        <div className={style['sales__promo']}>
                            {sliderRoutesInternational.slice(0, 2).map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['sales-route__item']}`} />

                            ))}
                            
                            <ButtonRoutes to={{pathname:'/not-found'}} title={'Другие популярные маршруты'} className={`${style['sales__more']}`} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SalesPage;