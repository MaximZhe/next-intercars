'use client'
import React, { FC, useEffect, useState } from 'react';
import TicketImg from '../../icons/image/ticket-icon.svg';

import RoadIcon from '../../icons/image/road-icon.svg';


import Image from 'next/image';
import style from './routeDescription.module.scss'
import MapRoute from '@/app/components/MapRoute/MapRoute';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';
import BenefitsIcons from '@/app/components/UI/Benefits-icons/Benefits-icons';
import Link from 'next/link';
import SliderSeo from '../UI/SliderSeo/SliderSeo';
import { splitParamsText } from '@/app/utils/splitCityNameSearch';

interface IParamsContent {
    resultsContentPage: any,
    resultArrayCitys?: any,
    resultContent: any
}
/*убираем дублирующие значения времени рейсов*/
function splitTimeRoute(data: any) {
    const scheduleItems = data
    const halfLength = scheduleItems.length / 2;
    const halfScheduleItems = scheduleItems.slice(0, halfLength);
    return halfScheduleItems
}
const ContentSeoRouteClient: FC<IParamsContent> = ({ resultsContentPage, resultArrayCitys, resultContent }) => {
    const [result, setResult] = useState<any>([]);
    const [resultScheduleItems, setResultScheduleItems] = useState([]);
    const [citysMap, setCitysMap] = useState<string[]>([]);
    useEffect(() => {
        if (resultsContentPage) {
            setResult(resultsContentPage);

        } else {
            console.log('ошибка получения контента')
        }
    }, [resultsContentPage])
    useEffect(() => {
        if (result && result[3] && result[3]['schedule-text']) {
            const scheduleItemsRoute = splitTimeRoute(result[3]['schedule-text']);
            if (scheduleItemsRoute) {
                setResultScheduleItems(scheduleItemsRoute)
            }else{
                console.log('ошибка получения таблицы времени')
            }
        }else{
            console.log('идет получение контента таблицы времени')
        }
    }, [result])

    useEffect(() => {
        if (resultArrayCitys && resultArrayCitys.cityDepartName && resultArrayCitys.cityArravalName) {
            console.log(resultArrayCitys.cityDepartName, resultArrayCitys.cityArravalName)
            const cityStart = splitParamsText(resultArrayCitys.cityDepartName);
            const cityEnd = splitParamsText(resultArrayCitys.cityArravalName);
            console.log(cityStart[0],cityEnd[0])
            
            if (cityStart && cityEnd) {
                setCitysMap([cityStart[0], cityEnd[0]])
            
            } else {
                console.log('ошибка получения городов')
            }
            
        }
    }, [resultArrayCitys])
    useEffect(() => {
        if(citysMap){
            console.log(citysMap)
        }
    },[citysMap])
    return (
        <>{result ? (
            <>
                <div className={style['path-description']}>
                    <div className={style['path-description__wrapper']}>
                        <div className={style['path-description__content']}>
                            <h1 className={style['path-description__title']}>
                                {result && result[0] && result[0]['route-title'] ? result[0]['route-title'][0]?.route__title : ''}
                            </h1>
                            <div className={style['path-description-row']}>
                                <div className={style['path-description-row__item']}>
                                    <p className={style['path-description-row__title']}>
                                        Расстояние
                                    </p>
                                    <p className={style['path-description-row__text']}>
                                        {result && result[1] && result[1]['info-route-subtitle'][0]['info-route__subtitle'] ? result[1]['info-route-subtitle'][0]['info-route__subtitle'] : ''}
                                    </p>
                                </div>
                                <div className={style['path-description-row__line']}></div>
                                <div className={style['path-description-row__item']}>
                                    <p className={style['path-description-row__title']}>
                                        Среднее время рейса в пути
                                    </p>
                                    <p className={style['path-description-row__text']}>
                                        {result && result[1] && result[1]['info-route-subtitle'][1]['info-route__subtitle'] ? result[1]['info-route-subtitle'][1]['info-route__subtitle'] : ''}
                                    </p>
                                </div>
                                <div className={style['path-description-row__line']}></div>
                                <div className={style['path-description-row__item']}>
                                    <p className={style['path-description-row__title']}>
                                        Цена билета на автобус
                                    </p>
                                    <p className={style['path-description-row__text']}>
                                        {result && result[1] && result[1]['info-route-subtitle'][2]['info-route__subtitle'] ? result[1]['info-route-subtitle'][2]['info-route__subtitle'] : ''}
                                    </p>
                                </div>
                            </div>
                            <div className={`${style['path-description-schedule']} ${style['path-description-schedule--mobail']}`}>
                                <div className={style['path-description-schedule__header']}>
                                    <p className={style['path-description-schedule__title']}>
                                        Отправление
                                    </p>
                                    <p className={style['path-description-schedule__title']}>
                                        Прибытие
                                    </p>
                                </div>
                                <div className={style['path-description-schedule__content']}>
                                    {resultScheduleItems.map((item: any, id: number) => {
                                        return (

                                            <p key={id} className={style['path-description-schedule__text']}>
                                                {item['schedule__text']}
                                            </p>
                                        )
                                    })}

                                </div>
                            </div>
                            {result && result[4] && result[4]['route-text'] ? result[4]['route-text'].map((item: any, id: number) => {
                                return (
                                    <p key={id} className={style['path-description__text']}>
                                        {item['route__text']}
                                    </p>
                                )
                            }) : null}

                            <div className={style['path-description__map']}>
                                {citysMap && citysMap[0] && citysMap[1] ? <MapRoute cityStart={citysMap[0]} cityEnd={citysMap[1]} arrayStopsCity={[]} /> : null}

                            </div>
                        </div>
                        <div className={style['path-description__info']}>
                            <div className={style['path-description-schedule']}>
                                <div className={style['path-description-schedule__header']}>
                                    <p className={style['path-description-schedule__title']}>
                                        Отправление
                                    </p>
                                    <p className={style['path-description-schedule__title']}>
                                        Прибытие
                                    </p>
                                </div>
                                <div className={style['path-description-schedule__content']}>
                                    {resultScheduleItems.map((item: any, id: number) => {
                                        return (
                                            <p key={id} className={style['path-description-schedule__text']}>
                                                {item['schedule__text']}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={style['path-description-list']}>
                                <h4 className={style['path-description-list__title']}>Остановки по маршуту</h4>
                                {resultContent.Result.Routes[0].AllStops.map((item: any) => {
                                    return (
                                        <div key={item.Name} className={style['path-description-list__item']}>
                                            <p className={style['path-description-list__city']}>
                                                {item.City}
                                            </p>
                                            <p className={style['path-description-list__street']}>
                                                {item.Name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style['path-manual']}>
                    <div className={style['path-manual__col-left']}>
                        <Image className={style['path-manual__icon']} src={TicketImg} width={40} height={40} alt='' />
                        <h3 className={style['path-manual__title']}>
                            Как купить билет на автобус
                        </h3>
                        <ButtonRoutes className={`${style['path-manual__link']}`} title={'Инструкция'} to={{ pathname: '/not-found', query: { slug: 'Новости' } }} />
                    </div>
                    <div className={style['path-manual__col-right']}>
                        {result && result[7] && result[7]['buy-ticket-text'] ? result[7]['buy-ticket-text'].map((item: any, id: number) => {
                            return (
                                <p key={id} className={style['path-manual__text']}>
                                    {item['buy-ticket__text']}
                                </p>
                            )
                        }) : null}
                    </div>
                </div>
                <div className={style['path-benefits']}>
                    <div className={style['path-benefits__colum-left']}>
                        <h3 className={style['path-benefits__title']}>
                            Преимущества компании Intercars
                        </h3>
                        <p className={style['path-benefits__content']}>
                            В первую очередь следует выделить удобство.
                            От вас потребуется просто выбрать дату
                            поездки. Останется только подобрать
                            подходящее место. Рейсы, которые
                            представлены на сайте, организуются
                            надежными компаниями. Вы можете выбрать
                            автобус со всеми необходимыми удобствами.
                            К примеру, с кондиционером, доступом к
                            интернету. Есть варианты с
                            дополнительными местами для багажа.
                        </p>
                        <div className={style['path-benefits__icons']}>
                            <BenefitsIcons />
                        </div>
                        <h4 className={style['path-benefits__text']}>
                            Почему продолжительность рейса может сильно отличаться?
                        </h4>
                        <ul className={style['path-benefits-list']}>
                            <p className={style['path-benefits-list__title']}>
                                Это может быть связано с:
                            </p>
                            <li className={style['path-benefits-list__item']}>
                                временем погрузки и выгрузки;
                            </li>
                            <li className={style['path-benefits-list__item']}>
                                выбранным компанией маршрутом;
                            </li>
                            <li className={style['path-benefits-list__item']}>
                                наличием остановок на пути следования;
                            </li>
                            <li className={style['path-benefits-list__item']}>
                                дорожной ситуацией в городах (маршрут
                                может проходить по загруженным дорогам).
                            </li>
                        </ul>
                    </div>
                    <div className={style['path-benefits__colum-right']}>
                        <SliderSeo className={''} />
                    </div>
                </div>
                <div className={style['path-roads']}>
                    <div className={style['path-roads__colum-left']}>
                        <Image className={style['path-roads__icon']}
                            src={RoadIcon} width={40} height={40} alt='' />
                        <h3 className={style['path-roads__title']}>
                            {result && result[8] && result[8]['all-routes-title'][0]['all-routes__title'] ? result[8]['all-routes-title'][0]['all-routes__title'] : ''}
                        </h3>
                        <ButtonRoutes className={`${style['path-roads__link']}`} title={'Все маршруты'} to={{ pathname: '/not-found', query: { slug: 'Все маршруты' } }} />
                    </div>
                    <div className={style['path-roads__colum-right']}>
                        <ul className={style['path-roads-list']}>
                            {result && result[9] && result[9]['all-routes-item'] ? resultsContentPage[9]['all-routes-item'].map((item: any, id: number) => {
                                return (

                                    <li key={id} className={style['path-roads-list__item']}>
                                        <Link href={`/find/${result[10]['all-routes-link'][id]['all-routes__link']}`} className={style['path-roads-list__link']}>
                                            {item['all-routes__item']}
                                        </Link>
                                    </li>
                                )
                            }) : null}
                        </ul>
                    </div>
                </div>
            </>

        ) : (
            null)
        }

        </>
    );
};

export default ContentSeoRouteClient;