import React from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Breadcrumbs from '../components/UI/Breadcrumbs/Breadcrumbs';


export const metadata: Metadata = {
    title:'Автобус Ошмяны - Минск: расписание, стоимость билета от 1000 рублей',
    description:'Узнайте актуальное расписание ежедневных рейсов и бронируйте удобные места в нашем автобусе Ошмяны - Минск. Билеты на поездку доступны для онлайн-покупки на нашем сайте, обеспечивая удобство и надежность.',
    keywords:'ошмяны минск, автобус ошмяны минск, расписание автобусов ошмяны минск, ошмяны минск расписание'
}
const RoutePageMinsk = () => {
    return (
        <>
        <Head>
    <meta name="google-site-verification" content="google67984ba37c9a9849.html" />
    
  </Head>
  <div>
            
<section className="route">
    <div className="route__row">
        <Breadcrumbs/>
        <div className="route__content">
            <h2 className="route__title">
                Расписание автобусов Ошямны &mdash; Минск</h2>
            <div className="info-route">
                <p className="info-route__col">
                    <span className="info-route__title">Расстояние</span><span className="info-route__subtitle"> 130 км</span></p>
                <div className="info-route__line">
                    &nbsp;</div>
                <p className="info-route__col">
                    <span className="info-route__title">Среднее время рейса в пути</span><span className="info-route__subtitle"> 2 часов.</span></p>
                <div className="info-route__line">
                    &nbsp;</div>
                <p className="info-route__col">
                    <span className="info-route__title">Цена билета на автобус</span><span className="info-route__subtitle"> от 1000 RUB</span></p>
            </div>
            <div className="route__text">
                Расстояние между городами отправления и назначения, Ошмяны и Минск, составляет 130 км. Наш автобус обычно следует без остановок, но мы готовы учитывать потребности наших пассажиров и при необходимости делаем небольшие перерывы в пути. Наша компания гордится использованием современных и надежных автобусов, обеспечивая ваше комфортное и безопасное путешествие. Для нас, безопасность в пути - это преимущество, которое мы несомненно ценим и о котором мы всегда помним.
                <p className="route__text">
                    Однако, помимо комфорта и безопасности, существуют правила поведения, которые необходимо соблюдать во время путешествия. Мы просим наших пассажиров проявлять уважение к другим пассажирам и водителям, а также следовать всем указаниям персонала. Это включает в себя ношение ремней безопасности во время движения, убирание мусора за собой, и уважительное общение друг с другом. Все эти меры помогают создать приятную атмосферу в автобусе и гарантируют безопасность каждого пассажира.</p>
            </div>
            
        </div>
        <div className="route__details">
            
            <div className="route-stops">
                <h3 className="route-stops__title">
                    Остановки по маршруту</h3>
                
                <br />
                <p className="buy-ticket__text">
                    Оплату можно провести удобным способом. Для последующей посадки вам не нужно распечатывать документ. Достаточно продемонстрировать его со смартфона или другого устройства.</p>
            </div>
        </div>
    </div>
</section>
<section className="buy-ticket">
    <div className="buy-ticket__row">
        <div className="buy-ticket__col">
            
            
            <h3 className="buy-ticket__title">
                Как купить билет на автобус</h3>
            <Link className="btn btn--instruction" href="#">Инструкция</Link></div>
        <div className="buy-ticket__col">
            <div className="buy-ticket__text">
                Цена на билет Ошмяны - Минск начинается от 1000 RUB. Мы предлагаем удобный способ покупки билетов через наш официальный сайт, что позволяет избежать походов в кассу. Просто заполните короткую анкету с вашими персональными данными и произведите онлайн-оплату. Во время бронирования у вас есть возможность выбрать предпочтительное место в автобусе, чтобы сделать ваше путешествие еще более комфортным.
            </div>
        </div>
    </div>
</section>
<section className="benefits">
    <div className="benefits__row">
        <div className="benefits__wrapper">
            <h3 className="benefits__title">
                Дополнительная информация на автобус</h3>
            <div className="benefits__text">
                Автобус отправляется два раза в день: в 6:05 и 11:30 от автостанции в Ошмянах, расположенной по адресу ул. Советская, д. 123. Время в пути составляет около 2 часов, а прибытие в пункт назначения происходит в 8:00 и 13:30 соответственно. Мы призываем всех пассажиров быть внимательными к предоставленной информации о расписании и местах высадки, чтобы путешествие прошло гладко и комфортно для каждого.</div>
            <div className="benefits__icons">
                
                </div>
            <p className="benefits__list-title">
                Мы ценим ваше время и комфорт, и поэтому стремимся обеспечить наилучший сервис для всех наших пассажиров. Мы приглашаем вас путешествовать с нами и наслаждаться комфортной поездкой, зная, что ваша безопасность и удовлетворение - наша главная цель.</p>
        </div>
        
        </div>
</section>
</div> 
  </>
         
    );
};

export default RoutePageMinsk;