import style from './Bonuses.module.scss';

import Menu from '../../components/Header/Menu/Menu';
import { sliderRoutesInternational } from '../../constant/constant';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';


import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';


const links = [
    { label: 'Главная', href: '/' },
    { label: 'Программа лояльности', href: '/pages/programma-loyalnosti', active: true },
];
const BonusesPage = () => {

    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style.bonuses}>
                <div className='container'>
                    <div className={style['bonuses__wrapper']}>
                        <div className={style['bonuses__content']}>
                            <Breadcrumbs links={links} />
                            <h1 className={style['bonuses__title']}>
                                Программа лояльности
                            </h1>
                            <div className={style['bonuses-info']}>
                                <h2 className={style['bonuses-info__main-title']}>
                                    Бонусная программа БайерТранс
                                </h2>
                                <p className={style['bonuses-info__subtitle']}>Для постоянных клиентов компании была разработана Бонусная программа.</p>
                                <div className={style['bonuses-info__important']}>
                                    <p className={style['bonuses-info__text']}>
                                        На данный момент карточку постоянного клиента можно
                                        получить, совершив разовую покупку билета на рейс компании
                                        по полной стоимости
                                        в мобильном приложении или в офисе компании
                                        (<Link href='https://play.google.com/store/apps/details?id=org.nativescript.Intercars&referrer=utm_source%3Dintercarsrur%26utm_medium%3Dpravila%26utm_campaign%3Dssylka-v-pravilah%26anid%3Dadmob' target='__blank'>Android</Link>,
                                        <Link href='https://apps.apple.com/by/app/intercars-билеты-на-автобус/id1525584784' target='__blank'>IOS</Link>).
                                    </p>
                                </div>

                                <h3 className={style['bonuses-list-title']}>
                                    Карточка постоянного клиента даёт право на:
                                </h3>
                                <ul className={style['bonuses-list']}>
                                    <li className={style['bonuses-list__item']}>
                                        Приобретение последующего билета со скидкой 10% (за исключением праздничных периодов, которые определяет компания).
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Бесплатную 7-ую поездку при условии использования карточки для приобретения шести билетов на рейсы нашей компании (6 поездок) в течение 2-х лет.
                                        <span> Билеты должны быть оформлены на держателя данной карты</span>.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Другие бонусы, скидки и индивидуальные предложения, которые компания может предлагать на своё усмотрение.
                                    </li>
                                </ul>
                                <h3 className={style['bonuses-list-title']}>
                                    Условия использования карточки постоянного клиента:
                                </h3>
                                <ul className={style['bonuses-list']}>
                                    <li className={style['bonuses-list__item']}>
                                        Карточка выдается только при покупке билета по полной стоимости и только на рейсы компании.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Условием выдачи карточки является приобретение билета по полной стоимости в офисе либо на сайте компании БайерТранс и только на рейсы компании.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Скидки по карточке постоянного клиента не суммируются с другими скидками (в том числе возврастными), акциями и спецпредложениями.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        При последующем приобретении билета по программе лояльности, в карточке делается пометка и ставится штамп компании.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Билеты, приобретенные на сайте по полной стоимости, также учитываются в программе. Для этого билеты должны быть приобретены <b>после</b> получения карточки и предоставлены позже сотруднику компании в офисе для получения соответствующей отметки.
                                    </li>
                                    <li className={style['bonuses-list__item']}>
                                        Карточка постоянного клиента является именной.
                                    </li>
                                </ul>
                            </div>



                        </div>
                        <div className={style['bonuses__promo']}>
                            {sliderRoutesInternational.slice(0, 2).map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['bonuses-route__item']}`} />

                            ))}

                            <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['bonuses__more']}`} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default BonusesPage;