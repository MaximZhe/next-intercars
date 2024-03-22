import React from 'react';
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




const RouteDescriptionPage = () => {

    
    return (
        <>
        {/* {isMobile && !isTablet   ? <Menu/> : null} */}
            
            <section className={style.path}>
                <div className='container'>
                    <div className={style.path__wrapper}>
                        <Breadcrumbs links={[]} />
                        <SearchForm className={style.path__form} />
                        <div className={style['path-description']}>
                            <div className={style['path-description__wrapper']}>
                                <div className={style['path-description__content']}>
                                    <h1 className={style['path-description__title']}>
                                        Маршрут Минск — Москва
                                    </h1>
                                    <div className={style['path-description-row']}>
                                        <div className={style['path-description-row__item']}>
                                            <p className={style['path-description-row__title']}>
                                                Расстояние
                                            </p>
                                            <p className={style['path-description-row__text']}>
                                                550 км
                                            </p>
                                        </div>
                                        <div className={style['path-description-row__line']}></div>
                                        <div className={style['path-description-row__item']}>
                                            <p className={style['path-description-row__title']}>
                                                Среднее время рейса в пути
                                            </p>
                                            <p className={style['path-description-row__text']}>
                                                9-10 часов
                                            </p>
                                        </div>
                                        <div className={style['path-description-row__line']}></div>
                                        <div className={style['path-description-row__item']}>
                                            <p className={style['path-description-row__title']}>
                                                Цена билета на автобус
                                            </p>
                                            <p className={style['path-description-row__text']}>
                                                от 90 BYN
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
                                            <p className={style['path-description-schedule__text']}>
                                                22:45
                                            </p>
                                            <p className={style['path-description-schedule__text']}>
                                                06:00
                                            </p>
                                            <p className={style['path-description-schedule__text']}>
                                                22:45
                                            </p>
                                            <p className={style['path-description-schedule__text']}>
                                                06:00
                                            </p>
                                        </div>
                                    </div>
                                    <p className={style['path-description__text']}>
                                        Уже давно прошли те времена, когда междугородний
                                        транспорт был крайне некомфортабельным и ненадежным.
                                        Сегодня для перевозки пассажиров между двумя
                                        столицами используется преимущественно новая
                                        техника, которая проходит обязательное
                                        обслуживание. Вы можете не переживать по поводу
                                        того, что сильно опоздаете. Среднее время в
                                        пути составляет 9-11 часов, что не так уж и много.
                                        Расстояние между мегаполисами чуть более 700 км,
                                        дорожное покрытие находится в хорошем состоянии.
                                    </p>
                                    <div className={style['path-description__map']}>
                                        <MapRoute />
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
                                            <p className={style['path-description-schedule__text']}>
                                                22:45
                                            </p>
                                            <p className={style['path-description-schedule__text']}>
                                                06:00
                                            </p>
                                            <p className={style['path-description-schedule__text']}>
                                                22:45
                                            </p>
                                            <p className={style['path-description-schedule__text']}>
                                                06:00
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style['path-description-list']}>
                                        <h4 className={style['path-description-list__title']}>Остановки по маршуту</h4>
                                        <div className={style['path-description-list__item']}>
                                            <p className={style['path-description-list__city']}>
                                                Минск
                                            </p>
                                            <p className={style['path-description-list__street']}>
                                                Центральный автовокзал, ул. Бобруйская, 6
                                            </p>
                                        </div>
                                        <div className={style['path-description-list__item']}>
                                            <p className={style['path-description-list__city']}>
                                                Минск
                                            </p>
                                            <p className={style['path-description-list__street']}>
                                                Центральный автовокзал, ул. Бобруйская, 6
                                            </p>
                                        </div>
                                        <div className={style['path-description-list__item']}>
                                            <p className={style['path-description-list__city']}>
                                                Минск
                                            </p>
                                            <p className={style['path-description-list__street']}>
                                                Центральный автовокзал, ул. Бобруйская, 6
                                            </p>
                                        </div>
                                        <div className={style['path-description-list__item']}>
                                        <p className={style['path-description-list__city']}>
                                                Минск
                                            </p>
                                            <p className={style['path-description-list__street']}>
                                                Центральный автовокзал, ул. Бобруйская, 6
                                            </p>
                                        </div>
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
                                <ButtonRoutes className={`${style['path-manual__link']}`} title={'Инструкция'} to={{ pathname: '/not-found', query: {slug:'Новости'} }}/>
                            </div>
                            <div className={style['path-manual__col-right']}>
                                <p className={style['path-manual__text']}>
                                    Система автоматически выделит
                                    самые выгодные предложения.
                                    Если у компании имеются
                                    акционные предложения, то
                                    вы обязательно увидите их.
                                    Хотите купить билет на автобус до Москвы из Минска?
                                    Этот процесс не
                                    отнимет у вас много времени.
                                </p>
                                <p className={style['path-manual__text']}>
                                    Если у вас возникнут какие-либо вопросы,
                                    то сотрудники обязательно на них ответят.
                                    Они расскажут, как оформить покупку.
                                    Данные на сайте обновляются на постоянной основе.
                                    Здесь появляется информация только об
                                    актуальных рейсах. Купить обратный билет
                                    на автобус Москва - Минск.
                                </p>
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
                                    Маршруты в Москву из других городов
                                </h3>
                                <ButtonRoutes className={`${style['path-roads__link']}`} title={'Все маршруты'} to={{ pathname: '/not-found', query: {slug:'Все маршруты'} }} />
                            </div>
                            <div className={style['path-roads__colum-right']}>
                                <ul className={style['path-roads-list']}>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
                                    <li className={style['path-roads-list__item']}>
                                        <Link href='/' className={style['path-roads-list__link']}>
                                            Могилев - Москва
                                        </Link>
                                    </li>
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