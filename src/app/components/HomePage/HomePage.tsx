import React from 'react';
import type { Metadata } from 'next';

import Menu from '../../components/Header/Menu/Menu';



import Actions from './Actions/Actions';
import Info from './Info/Info';
import Advantages from './Advantages/Advantages';
import Accordion from './FAQ/FAQ';

import { accordionItemsLeft, accordionItemsRight } from '@/app/constant/constant';
import Slider from '../UI/Slider/Slider';
import SearchForm from '../SearchForm/SearchForm';
import style from './HomePage.module.scss';

export const metadata: Metadata = {
    title:'Homepage',
    description:'This HomePage'
}

export default function Homepage()  {
    
  return (
    
    <div >
        <div className={style.offer}>
            <div className={style['offer__wrapper']}>
                <Menu />
                <div className='container'>
                    <div className={style['offer__inner']}>
                        <h1 className={style['offer__title']}>
                            Автобусные билеты по лучшим ценам
                        </h1>
                        <SearchForm className={style['offer__form']} />
                    </div>
                </div>
            </div>
        </div>
        <Slider title={'Популярные маршруты'} className={`slider-routes`}/>
        <Actions />
        <Info />
        <Advantages />
        <Accordion
            itemsLeft={accordionItemsLeft}
            itemsRight={accordionItemsRight} />
        
    </div>
);
};
