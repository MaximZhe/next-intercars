'use client';
import Image from 'next/image';
import Menu from '../../components/Header/Menu/Menu';
import { listImagesRoutes } from '../../constant/imagesRoute';
import './SingleSalesPage.scss';
import { salesSingleListInfo, sliderRoutesInternational } from '../../constant/constant';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Link from 'next/link';

// import { useParams } from 'react-router-dom';

interface ISingleSalesProps {
    params:{
        slug: string,
        
    }
    
}
const SingleSalesPage:FC<ISingleSalesProps> = ({params}) => {
    const router = useRouter();
console.log(Link)
console.log(decodeURIComponent(params.slug))
    const selectedImage = listImagesRoutes.find((image) => image.id === params.slug);
    const imageUrl = selectedImage?.uri;

    return (
        <>
            <Menu className='menu_theme_blue' />
            <section className='sales-single'>
                <div className='container'>
                    <div className='sales-single__wrapper'>
                        <div className='sales-single__content'>
                            {/* <Breadcrumbs /> */}
                            <div className='sales-single__item'>
                                <p className='sales-single__subject'>
                                    Акция
                                </p>
                                <h1 className='sales-single__main-title'>
                                    Поездки в Санкт-Петербург вместе с Intercars!
                                </h1>
                                {imageUrl ? <Image src={imageUrl} className='sales-single__img' alt='' /> : null}
                                <p className='sales-single__text'>
                                    Только 20 апреля дарим возможность приобрести билеты в
                                    Санкт-Петербург по приятной цене!
                                    <span className='sales-single__value'>СКИДКА 50%</span>
                                    на поездки Минск-Санкт-Петербург-Минск
                                </p>
                                <h2 className='sales-single__title-list'>
                                    Рейсы, участвующие в акции:
                                </h2>
                                <ul className='sales-single-list'>
                                    <li className='sales-single-list__item'>
                                        Минск-Санкт-Петербург: 20:00 (через день)
                                    </li>
                                    <li className='sales-single-list__item'>
                                        Санкт-Петербург-Минск: 21:15 (через день)
                                    </li>
                                </ul>
                                <p className='sales-single__company'>
                                    Перевозчик - IP BayerTrans (УНП 800004566)
                                </p>
                                <div className='sales-single-promo'>
                                    <h3 className='sales-single-promo__title'>
                                        Используйте промокод:
                                        <span className='sales-single-promo__name'>ПИТЕР</span>
                                    </h3>
                                    <ul className='sales-single-promo__list'>
                                        <li className='sales-single-promo__item'>
                                            Время действия промокода: в 11:00 до 23:59 20 апреля 2023
                                        </li>
                                        <li className='sales-single-promo__item'>
                                            Период поездки: 01.05.2023 - 31.07.2023
                                        </li>
                                        <li className='sales-single-promo__item'>
                                            Исключения: 03.05.2023 - 10.05.2023
                                        </li>
                                    </ul>

                                </div>
                                <p className='sales-single__info'>
                                    Количество акционных мест ограничено и указывается под кнопкой Купить. Количество ационных мест зависит от заполняемости автобуса.
                                </p>
                                <p className='sales-single__info'>
                                    ВНИМАНИЕ! При покупке акционного билета по промокоду необходимо оставлять тариф по умолчанию.
                                </p>
                                <h3 className='sales-single__title-list'>
                                    Условия акции и других спецпредложений:
                                </h3>
                                <ul className='sales-single-list-info'>
                                    {salesSingleListInfo.map((item, index) => (
                                        <li key={index} className='sales-single-list-info__item'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='sales-single__promo'>
                            {sliderRoutesInternational.slice(0, 2).map((item) => (
                                <RouteItem key={item.id} data={item} className={'sales-route'} />
                            ))}
                            <ButtonRoutes to={{pathname:'/'}} title={'Другие популярные маршруты'} className={'sales__more'} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SingleSalesPage;