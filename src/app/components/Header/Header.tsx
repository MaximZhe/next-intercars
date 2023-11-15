import React from 'react';
import Logo from '../../../../public/logo-n.png';
import Image from 'next/image'
import Link from 'next/link';
const Header = () => {
    return (
        <div className="wrapper">
          <div className="header__inner">
            <div className="header__logo">
              <Link href="/">
                <Image width={250} src={Logo} alt='Intercars'/>
              </Link>
            </div>
            <div className="header__numbers">
              <Link href="tel:+7 (499) 350 80 16">+7 (499) 350 80 16</Link>
              <Link href="tel:8 800 777 74 15">8 800 777 74 15</Link>
            </div>
            <div className="header__time">
              <span>
                <span>
                  Время работы:<br />
                  <b>Пн-вс,</b> c <b>9:00</b> до <b>22:00</b>
                </span>
              </span>
            </div>
            <div className="header__user">
              <Link href="/">
                
                <span>
                  <span>Личный кабинет</span>
                </span>
              </Link>
            </div>
            <div className="menu-mob" >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      );
};

export default Header;