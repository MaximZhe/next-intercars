'use client'
import { FC, useState } from 'react';

import SocialButtons from '../UI/SocialButtons/SocialButtons';
import Application from './Application/Application';
import style from './Footer.module.scss';
import { IRouteItem } from '../../types/types';
import PaymentOption from '../UI/PaymentOption/PaymentOption';
import ArrowIcon from '@/app/icons/svg/ArrowIcon';
import ButtonRoutes from '../UI/Button/ButtonRoutes/ButtonRoutes';
import EmailContacts from '../ContactsItemsLinks/EmailContacts/EmailContacts';
import PhoneContacts from '../ContactsItemsLinks/PhoneContacts/PhoneContacts';
import Link from 'next/link';



interface IRoutesList {
    routes: IRouteItem[],
}

const Footer: FC<IRoutesList> = ({ routes }) => {
    
    const [isOpenRoutes, setIsOpenRoutes] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    
    return (
        <footer className={style.footer}>
            <div className='container-fluid'>
            {/* {location.pathname === '/find' || location.pathname === '/list-result-routes/choice-tickets' ? null : <Application />} */}
                <div className={style['footer__wrapper']}>
                    <div className={style['footer__top']}>
                        <div className={style['footer-contacts']}>
                            <h3 className={style['footer__title']}>
                                Контакты
                            </h3>
                            <ul className={`${style['footer__list']}   ${style['footer-contacts__list']}`}>
                                <li className={style['footer-contacts__item']}>
                                    <PhoneContacts className={`${style['footer-contacts__phone']}`}
                                    // eslint-disable-next-line react/no-children-prop
                                    children={['+7 499 350 80 16','+8 800 777 74 15']}/>
                                </li>
                                <li className={style['footer-contacts__item']}>
                                    125167, г. Москва,
                                    Пр-т Ленинградский, д.37/3
                                </li>
                                <li className={style['footer-contacts__item']}>
                                    <EmailContacts href={'mailto:direction@intercars.ru&body=Здравствуйте?subject=вопрос'} 
                                    // eslint-disable-next-line react/no-children-prop
                                    className={`${style['footer-contacts__email']}`} children={'direction@intercars.ru'}/>  
                                </li>
                            </ul>
                            <SocialButtons
                                className={`${style['footer-social']}`}
                                telegram={'https://'}
                                twitter={'https://'}
                                vk={'https://'} />
                        </div>
                        <div className={`${style['footer-routes']} ${isOpenRoutes ? style.active : ''}`}>
                            <h3 className={style['footer__title']}
                                onClick={() => setIsOpenRoutes(prev => !prev)}>
                                Маршруты
                                <ArrowIcon className={`${style['footer-icon__mobail']} ${isOpenRoutes ? style.active : ''}`} />
                            </h3>
                            <ul className={`${style['footer__list']} ${style['footer-routes__list']}`}>
                                {routes.map((item) =>
                                    <li key={item.id} className={style['footer-routes__item']}>
                                        <Link href={`/route/${item.id}`} className={style['footer-routes__link']}>{item.value}</Link>
                                    </li>)}
                            </ul>
                            <ButtonRoutes to={{pathname:'/not-found'}} title={'Все маршруты'} className={style['footer-routes__more']}/>
                        </div>
                        <div className={`${style['footer-nav']}  ${isOpenInfo ? style.active : ''}`}>
                            <h3 className={style['footer__title']}
                                onClick={() => setIsOpenInfo(prev => !prev)}>
                                Информация
                                <ArrowIcon className={`${style['footer-icon__mobail']}`} />
                            </h3>
                            <nav className={style['footer-nav__wrapper']}>
                                <ul className={`${style['footer__list']} ${style['footer-nav__menu']}`}>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/'  className={style['footer-nav__link']}>
                                            Главная
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/news'  className={style['footer-nav__link']}>
                                            Новости
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/not-found' className={style['footer-nav__link']}>
                                            Программа лояльности
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/promos'  className={style['footer-nav__link']}>
                                            Акции
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/not-found' className={style['footer-nav__link']}>
                                            Сотрудничество
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/pages/agreement'  className={style['footer-nav__link']}>
                                            Правила
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/not-found' className={style['footer-nav__link']}>
                                            Как оплатить
                                        </Link>
                                    </li>
                                    <li className={style['footer-nav__item']}>
                                        <Link href='/pages/kontakts'  className={style['footer-nav__link']}>
                                            Контакты
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <SocialButtons
                                className={`${style['footer-social']} ${style['mobail']}`}
                                telegram={'https://'}
                                twitter={'https://'}
                                vk={'https://'} />
                    </div>
                    <div className={style['footer__bottom']}>
                        <div className={style['footer-company']}>
                            <p className={style['footer-company__text']}>
                                © 2023, OOO «БайерТранс»
                            </p>
                            <p className={style['footer-company__text']}>
                                Российская Федерация, г.Москва, Пр-т Ленинградский, д. 37/3, ИНН 7 714 294 648
                            </p>
                        </div>
                        <PaymentOption className={style['footer-payment']}/>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;