import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__row">
              <div className="footer__content-col">
                <div className="footer__content-title">
                  <span>Информация</span>
                </div>
                <div className="footer__content-links" style={{display: "flex", justifyContent: "center"}}>
                  <Link href="/">
                    Главная
                  </Link>
                  <Link href="/">
                    О компании
                  </Link>
                 
                </div>
              </div>
              
            </div>
          </div>
          <div className="footer__bottom" style={{background: "#007bff",textAlign: "center"}}>
            <div className="footer__row">
              <div className="footer__copyright">
                <p>
                  <span>{`© 2021, OOO "БайерТранс"`}</span>
                </p>
                <p>
                  <span>Российская Федерация, г. Москва, Пр-т Ленинградский, д.37/3, ИНН 7714294648</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      );
};

export default Footer;