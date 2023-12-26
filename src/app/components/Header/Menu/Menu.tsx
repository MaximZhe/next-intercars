'use client'


import './Menu.scss'
import { FC, useState } from 'react';

import Link from 'next/link';
import ArrowIcon from '@/app/icons/svg/ArrowIcon';
import UserIcon from '@/app/icons/svg/UserIcon';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { setLanguageValue } from '@/app/redux/slice/languageSlice';

interface IMenuProps{
    className?: string
}

const Menu:FC<IMenuProps> = ({className}) => {
   
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const { language } = useAppSelector((state: { languageReduser: any; }) => state.languageReduser);
    const { isShow } = useAppSelector((state: { stateMobileMenuReduser: any; }) => state.stateMobileMenuReduser);
    const dispatch = useAppDispatch();
    return (
        <div className={`nav ${!isShow ? 'hide' : 'show'} ${className ? className : ''} `}>
            <div className='container'>
                
                    <div className={`user user--mobail`}>
                        <UserIcon className='user__icon' />
                        <p className='user__text'>Личный кабинет</p>
                    </div>
                <nav className='menu'>
                    <div className='menu__wrapper'>
                        <button className={`menu__item ${isOpenDropdown ? 'active' : ''}`}
                            type='button'
                            onMouseEnter={() => setIsOpenDropdown(true)}
                            onMouseLeave={() => setIsOpenDropdown(false)}>Акции и новости
                            <ArrowIcon className='menu__icon' />
                        </button>
                        <div className='menu-dropdown'
                            onMouseEnter={() => setIsOpenDropdown(true)}
                            onMouseLeave={() => setIsOpenDropdown(false)}>
                            <Link href='/promos'  className='menu-dropdown__link'>
                                Акции
                            </Link>
                            <Link href='/news'  className='menu-dropdown__link'>
                                Новости
                            </Link>
                            <Link href='' className='menu-dropdown__link'>
                                Программа лояльности
                            </Link>
                        </div>
                    </div>
                    <Link className='menu__item' href='/'>Сотрудничество</Link>
                    <Link className='menu__item' href='/pay'>Оплата</Link>
                    <Link className='menu__item' href='/rules' >Правила</Link>
                </nav>
                
                    <div className="dropdown-menu dropdown-menu--mobail">
                        <button type='button'
                            className={`dropdown-item ${language=== 'RUS' ? 'active' : ''}`}
                            onClick={() => dispatch(setLanguageValue('RUS'))}>
                            RUS
                        </button>
                        <button type='button'
                            className={`dropdown-item ${language === 'EN' ? 'active' : ''}`}
                            onClick={() => dispatch(setLanguageValue('EN'))}>
                            EN
                        </button>
                        <button type='button'
                            className={`dropdown-item ${language === 'PL' ? 'active' : ''}`}
                            onClick={() => dispatch(setLanguageValue('PL'))}>
                            PL
                        </button>
                    </div> 
            </div>

        </div>
    );
};

export default Menu;