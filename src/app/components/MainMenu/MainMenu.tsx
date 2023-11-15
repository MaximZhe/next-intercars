import Link from 'next/link';
import React from 'react';

const MainMenu = () => {
    return (
        <div className="container-fluid px-0 main-menu">
          <div id="top-nav">
            <div className="wrapper p-relative">
              <div className="burger-menu">
                <div id="nav-icon2">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <nav className="d-flex px-standart ">
                <div className="nav-item"><Link href="/">Главная</Link></div>
                <div className="nav-item"><Link href="/RoutePageMinsk">RouteMinsk</Link></div>
                <div className="nav-item"><Link href="/RoutePageKirow">RouteKirow</Link></div>
                <div className="nav-item"><Link href="/RoutePageKamensk">RouteKamensk</Link></div>
                
              </nav>
            </div>
          </div>
        </div>
      );
};

export default MainMenu;