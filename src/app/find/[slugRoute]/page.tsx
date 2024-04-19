import React, { Suspense } from 'react';
import TicketImg from '../../icons/image/ticket-icon.svg';

import BusSalon from '../../icons/image/bus-salon.jpg';
import RoadIcon from '../../icons/image/road-icon.svg';


import Image from 'next/image';
import style from './routeDescription.module.scss'
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import SearchForm from '@/app/components/SearchForm/SearchForm';
import MapRoute from '@/app/components/MapRoute/MapRoute';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';
import BenefitsIcons from '@/app/components/UI/Benefits-icons/Benefits-icons';
import Link from 'next/link';
import Accordion from '@/app/components/HomePage/FAQ/FAQ';
import { accordionItemsLeft, accordionItemsRight } from '@/app/constant/constant';
import Reviews from '@/app/components/Reviews/Reviews';
import { getRouteContent } from '@/app/api/actionGetRouteContent';
import { getServerSideProps } from '@/app/api/actionCity';
import { parseData } from '@/app/utils/parserContentSeoPage';
import { Metadata } from 'next';

const splitParamsText = (text: string) => {
    const arr = text.split('-');
    return arr
}


const fetchContent = async (cityDepart: number, cityArraval: number) => {
    try {
        const datas = {
            CityDeparture: cityDepart,
            CityArrival: cityArraval,
            SiteVersionId: 2,
            Lang: "RUS"
        }
        const response = await fetch('http://api.intercars-tickets.com/api/v1/content/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas)
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}
interface IParamsContent {
    slugRoute: string;
}

// export async function generateMetadata(
//     {params}: any
//   ): Promise<Metadata> {
  
   
   
   
//     return {
//       title: news.SeoTitle,
//       description: news.SeoDescription,
      
//     }
//   }
const RouteDescriptionPage = async ({ params }: { params: IParamsContent }) => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Поиск билетов', href: `/find/${params.slugRoute}`, active: true },
    ];
   
    const nameCityRoute = splitParamsText(params.slugRoute);
    const resultArrayCitys = await getRouteContent(nameCityRoute[0], nameCityRoute[1]);
    const resultContent = await fetchContent(resultArrayCitys?.cityIdDeparture, resultArrayCitys?.cityIdArrival);
    console.log(resultContent.Result.Routes[0])

    console.log(resultArrayCitys)
    console.log(nameCityRoute)
   
    const resultsContentPage = parseData(resultContent.Result.Page.Html);
    console.log(resultsContentPage)
    return (
        <>
            {/* {isMobile && !isTablet   ? <Menu/> : null} */}

            <section className={style.path}>
                <div className='container'>
                    <div className={style.path__wrapper}>
                        <Breadcrumbs links={links} />
                        <Suspense>
                            <div className={style['path__content']}>
                                <h1 className={style['path__title']}>Поиск билетов по маршруту {resultContent.Result.Routes[0].City1} — {resultContent.Result.Routes[0].City2}</h1>
                                <SearchForm className={style.path__form} citySeoRoute={resultArrayCitys} />
                            </div>
                        </Suspense>


                        <div className={style['path-description']}>
                            <div className={style['path-description__wrapper']}>
                                <div className={style['path-description__content']}>
                                    <h1 className={style['path-description__title']}>
                                        {resultsContentPage[0]['route-title'][0].route__title}
                                    </h1>
                                    <div className={style['path-description-row']}>
                                        <div className={style['path-description-row__item']}>
                                            <p className={style['path-description-row__title']}>
                                                Расстояние
                                            </p>
                                            <p className={style['path-description-row__text']}>
                                                {resultsContentPage[1]['info-route-subtitle'][0]['info-route__subtitle']}
                                            </p>
                                        </div>
                                        <div className={style['path-description-row__line']}></div>
                                        <div className={style['path-description-row__item']}>
                                            <p className={style['path-description-row__title']}>
                                                Среднее время рейса в пути
                                            </p>
                                            <p className={style['path-description-row__text']}>
                                                {resultsContentPage[1]['info-route-subtitle'][1]['info-route__subtitle']}
                                            </p>
                                        </div>
                                        <div className={style['path-description-row__line']}></div>
                                        <div className={style['path-description-row__item']}>
                                            <p className={style['path-description-row__title']}>
                                                Цена билета на автобус
                                            </p>
                                            <p className={style['path-description-row__text']}>
                                                {resultsContentPage[1]['info-route-subtitle'][2]['info-route__subtitle']}
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
                                            {resultsContentPage[3]['schedule-text'].map((item: any, id: number) => {
                                                return (

                                                    <p key={id} className={style['path-description-schedule__text']}>
                                                        {item['schedule__text']}
                                                    </p>
                                                )
                                            })}

                                        </div>
                                    </div>
                                    {resultsContentPage[4]['route-text'].map((item: any, id: number) => {
                                        return (
                                            <p key={id} className={style['path-description__text']}>
                                                {item['route__text']}
                                            </p>
                                        )
                                    })}

                                    <div className={style['path-description__map']}>
                                        <MapRoute  cityStart={resultArrayCitys?.cityDepartName} cityEnd={resultArrayCitys?.cityArravalName}/>
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
                                            {resultsContentPage[3]['schedule-text'].map((item: any, id: number) => {
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
                                {resultsContentPage[7]['buy-ticket-text'].map((item: any, id: number) => {
                                    return (
                                        <p key={id} className={style['path-manual__text']}>
                                            {item['buy-ticket__text']}
                                        </p>
                                    )
                                })}
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
                                <Image src={BusSalon} width={350} height={472} alt='' />
                            </div>
                        </div>
                        <div className={style['path-roads']}>
                            <div className={style['path-roads__colum-left']}>
                                <Image className={style['path-roads__icon']}
                                    src={RoadIcon} width={40} height={40} alt='' />
                                <h3 className={style['path-roads__title']}>
                                    {resultsContentPage[8]['all-routes-title'][0]['all-routes__title']}
                                </h3>
                                <ButtonRoutes className={`${style['path-roads__link']}`} title={'Все маршруты'} to={{ pathname: '/not-found', query: { slug: 'Все маршруты' } }} />
                            </div>
                            <div className={style['path-roads__colum-right']}>
                                <ul className={style['path-roads-list']}>
                                {resultsContentPage[9]['all-routes-item'].map((item: any, id: number) => {
                                    return (
                                       
                                        <li key={id} className={style['path-roads-list__item']}>
                                        <Link href={`/find/${resultsContentPage[10]['all-routes-link'][id]['all-routes__link']}`} className={style['path-roads-list__link']}>
                                            {item['all-routes__item']}
                                        </Link>
                                    </li>
                                    )
                                })}
                                </ul>
                            </div>
                        </div>
                        <div className={style['path__box']}>
                            <Accordion className={[`${style.path__accordion}`, `${style.path__arrow}`]}
                                itemsLeft={accordionItemsLeft}
                                itemsRight={accordionItemsRight} />
                        </div>
                    </div>
                </div>
                <div className={style['path__box']}>
                    <Reviews />
                </div>
            </section>
        </>

    );
};

export default RouteDescriptionPage;