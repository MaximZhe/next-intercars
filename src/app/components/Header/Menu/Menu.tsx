'use client'


import style from './Menu.module.scss'
import { FC, useState } from 'react';

import Link from 'next/link';
import ArrowIcon from '@/app/icons/svg/ArrowIcon';
import UserIcon from '@/app/icons/svg/UserIcon';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { setLanguageValue } from '@/redux/slice/languageSlice';

interface IMenuProps{
    className?: string
}

const Menu:FC<IMenuProps> = ({className}) => {
   
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const { language } = useAppSelector((state: { languageReduser: any; }) => state.languageReduser);
    const { isShow } = useAppSelector((state: { stateMobileMenuReduser: any; }) => state.stateMobileMenuReduser);
    const dispatch = useAppDispatch();
    console.log(isShow)
    return (
        <div className={`${style.nav} ${!isShow ? style.hide : style.show} ${className ? className : ''} `}>
            <div className='container'>
                
                    <div className={`${style.user} ${style['user--mobail']}`}>
                        <UserIcon className={style['user__icon']} />
                        <p className={style['user__text']}>Личный кабинет</p>
                    </div>
                <nav className={style.menu}>
                    <div className={style['menu__wrapper']}>
                        <button className={`${style['menu__item']} ${isOpenDropdown ? style.active : ''}`}
                            type='button'
                            onMouseEnter={() => setIsOpenDropdown(true)}
                            onMouseLeave={() => setIsOpenDropdown(false)}>Акции и новости
                            <ArrowIcon className={style['menu__icon']} />
                        </button>
                        <div className={style['menu-dropdown']}
                            onMouseEnter={() => setIsOpenDropdown(true)}
                            onMouseLeave={() => setIsOpenDropdown(false)}>
                            <Link href='/promos'  className={style['menu-dropdown__link']}>
                                Акции
                            </Link>
                            <Link href='/news'  className={style['menu-dropdown__link']}>
                                Новости
                            </Link>
                            <Link href='' className={style['menu-dropdown__link']}>
                                Программа лояльности
                            </Link>
                        </div>
                    </div>
                    <Link className={style['menu__item']} href='/'>Сотрудничество</Link>
                    <Link className={style['menu__item']} href='/pay'>Оплата</Link>
                    <Link className={style['menu__item']} href='/rules' >Правила</Link>
                </nav>
                
                    <div className={`${style['dropdown-menu']} ${style['dropdown-menu--mobail']}`}>
                        <button type='button'
                            className={`${style['dropdown-item']} ${language=== 'RUS' ? 'active' : ''}`}
                            onClick={() => dispatch(setLanguageValue('RUS'))}>
                            RUS
                        </button>
                        <button type='button'
                            className={`${style['dropdown-item']}  ${language === 'EN' ? 'active' : ''}`}
                            onClick={() => dispatch(setLanguageValue('EN'))}>
                            EN
                        </button>
                        <button type='button'
                            className={`${style['dropdown-item']} ${language === 'PL' ? 'active' : ''}`}
                            onClick={() => dispatch(setLanguageValue('PL'))}>
                            PL
                        </button>
                    </div> 
            </div>

        </div>
    );
};

export default Menu;