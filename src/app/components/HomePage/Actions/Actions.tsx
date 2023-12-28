

import ActionIconLine  from '../../../icons/image/actions-bg.png';
import ActionIconLineMobail  from '../../../icons/image/actions-bg-mobail.png';
import style from './Actions.module.scss';
import Image from 'next/image';
import Link from 'next/link';


const Actions = () => {

    return (
        <section className={style.actions}>
            <div className='container'>
                <div className={style['actions__wrapper']}>
                    <div className={style['actions-content']}>
                        <h3 className={style['actions-content__title']}>
                            Акция к 23 февраля!
                        </h3>
                        <p className={style['actions-content__text']}>
                            Скидки Минск-Варшава-Минск
                        </p>
                    </div>
                    <div className={style['actions__img']} >
                        <Image 
                        src={ActionIconLine} 
                        width={326} 
                        height={140} 
                        alt=''
                        className={style['actions__img-desktop']}/>
                        <Image 
                        src={ActionIconLineMobail} 
                        width={204} 
                        height={152} 
                        alt=''
                        className={style['actions__img-mobail']}/>
                    </div>
                    <Link className={style['actions__link']} href=''>
                        Узнать подробности
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Actions;