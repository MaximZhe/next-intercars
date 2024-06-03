

// import Image from 'next/image';
// import IconTicket from '../icons/image/ticket-icon.svg';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';

import style from './GoodOrderPage.module.scss';
import Link from 'next/link';
import { sliderRoutesInternational } from '../../constant/constant';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import Menu from '../../components/Header/Menu/Menu';
import { getOrderStatus } from '@/app/api/getOrderStatus';


const splitStatusMassage = (text: string) => {
    const massage = text.split(':')
    return massage
}
const GoodOrderPage = async ({params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) => {

    const rr = params
    const searchParamsOrder = searchParams
    const status = await getOrderStatus({ orderId: searchParamsOrder.orderId !== undefined ? searchParamsOrder.orderId : '0581a5a7-6b91-7cfa-b98d-6eb101f423bb' })
    const massageStatus = splitStatusMassage(status.Result.Status)
    console.log(status)
    return (
        <>
            <Menu responsive={true} />
            <section className={style['ending-order']}>
                <div className='container'>
                    <div className={style['ending-order__wrapper']}>
                        <div className={style['ending-order__info']}>
                            <Breadcrumbs links={[]} />
                            <div className={style['ending-order__content']}>
                            
                                {status.Result?.Success === true && status.Result.Status === "2: Проведена полная авторизация суммы заказа" ? (
                                    <>
                                        {/* <Image width={48} height={42} alt='' src={IconTicket} className={style['ending-order__icon']} /> */}
                                        <h1 className={style['ending-order__title']}>
                                            Спасибо за покупку на нашем сайте!
                                        </h1>
                                        <p className={style['ending-order__text']}>
                                            В ближайшее время вы получите письмо с
                                            билетами на элетронную почту  <a href={'mailto:name@mail.com&body=Здравствуйте?subject=вопрос'}>name@mail.com</a>
                                        </p>
                                        <p className={style['ending-order__text']}>
                                            <span>Внимание!</span> Письма с электронными билетами могут
                                            попадать в папку “Спам”.
                                        </p>
                                        <p className={style['ending-order__text']}>
                                            Если Вы не получили письмо, свяжитесь с нами
                                            по телефонам <a href='tel:+74993508016'>+7 499 350 80 16</a>,
                                            <a href='tel:+88007777415'>+8 800 777 74 15</a>
                                        </p>
                                        <Link href={'/'} className={style['ending-order__link']}>
                                            Продолжить поиск билетов
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                    {/* <Image width={48} height={42} alt='' src={IconTicket} className={style['ending-order__icon']} /> */}
                                    <h1 className={style['ending-order__title']}>
                                            Платеж не прошел.
                                            
                                        </h1>
                                        <p className={style['ending-order__text']}>
                                            Причина: {massageStatus[1]}
                                        </p>
                                        
                                        
                                        <Link href={'/'} className={style['ending-order__link']}>
                                            Вернуться на главную страницу
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={style['ending-order__promo']}>
                            {sliderRoutesInternational.slice(0, 1).map((item) => (

                                <RouteItem key={item.id} data={item} className={`${style['ending-order-route__item']}`} />

                            ))}

                            <ButtonRoutes to={{ pathname: '/404' }} title={'Другие популярные маршруты'} className={`${style['ending-order__more']}`} />
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default GoodOrderPage;