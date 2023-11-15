import React from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title:'Автобус Киров - Москва: расписание, стоимость билета от 3000 рублей',
    description:'Узнайте актуальное расписание ежедневных рейсов и бронируйте удобные места в нашем автобусе Киров - Москва. Билеты на поездку доступны для онлайн-покупки из Кирова в Москву',
    keywords:'Киров Москва, автобус Киров Москва, расписание автобусов Киров Москва, Киров Москва расписание'
}
const RoutePageKirow = () => {
    return (
        <div>
            <section className="route">
    <div className="route__row">
        <div className="route__content">
            <h2 className="route__title">
                Расписание автобусов Киров &mdash; Москва</h2>
            <div className="info-route">
                <p className="info-route__col">
                    <span className="info-route__title">Расстояние</span><span className="info-route__subtitle"> 950 км</span></p>
                <div className="info-route__line">
                    &nbsp;</div>
                <p className="info-route__col">
                    <span className="info-route__title">Среднее время рейса в пути</span><span className="info-route__subtitle"> ~13 часов.</span></p>
                <div className="info-route__line">
                    &nbsp;</div>
                <p className="info-route__col">
                    <span className="info-route__title">Цена билета на автобус</span><span className="info-route__subtitle"> от 3000 RUB</span></p>
            </div>
            <div className="schedule schedule--mobail">
                
            </div>
            <div className="route__text">
                Поездка из промышленного сердца Кирова в культурную столицу России, Москву, стала невероятно удобной и доступной благодаря новому автобусному маршруту, предоставляемому нашей компанией. Широкий спектр удобств, высокий уровень комфорта и надежность - вот что делает наш автобусный маршрут идеальным выбором для всех типов путешественников.

                <p className="route__text">
                    {`С автовокзала "Киров", расположенного на улице Комсомольская, дом 42, автобус отправляется ежедневно в 16:00 в направлении Москвы. С учетом регулярных остановок, чтобы пассажиры могли отдохнуть, путешествие длится в среднем 13 часов, приближаясь к своему завершению на остановке "Метро Новокосино" - улица Городецкая в 05:00 утра. Дополнительные пересадки не требуются, обеспечивая пассажирам беззаботное и непрерывное путешествие.`}</p>
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
            <a className="btn btn--instruction" href="#">Инструкция</a></div>
        <div className="buy-ticket__col">
            <div className="buy-ticket__text">
                Цена на билеты начинается от 3000 рублей и остается окончательной, без дополнительных сборов и комиссий. У нас есть простая и удобная онлайн-система заказа билетов, позволяющая вам приобрести билет и оформить заявку на маршрут, не выходя из дома. Мы стремимся обеспечить нашим клиентам лучший сервис и комфортные условия, начиная с момента покупки билета и до момента прибытия в пункт назначения.
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
                Путешествие в наших автобусах не только удобно, но и комфортно. Кондиционеры, оснащенные системами охлаждения и подогрева воздуха, гарантируют приятную атмосферу в любое время года. Удобные сиденья с откидывающимися спинками, подставками для ног и подлокотниками обеспечивают пассажирам оптимальное удобство во время поездки. Каждое сиденье также оснащено индивидуальной системой освещения, позволяя каждому пассажиру настроить своё освещение по своему желанию.
</div>
            <div className="benefits__icons">
                </div>
            <p className="benefits__list-title">
                Мы гордимся тем, что обеспечиваем безопасное путешествие для наших пассажиров. Наши опытные водители и высококвалифицированный персонал следят за тем, чтобы каждое путешествие было максимально безопасным и комфортным. Мы уделяем большое внимание техническому обслуживанию автобусов, чтобы убедиться, что каждый наш клиент чувствует себя спокойно и уверенно во время поездки.</p>
        </div>
        </div>
</section>

<p>
    &nbsp;</p>
            
        </div>
    );
};

export default RoutePageKirow;