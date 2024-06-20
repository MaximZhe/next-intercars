

import ActionIconLine from '../../../icons/image/actions-bg.png';
import ActionIconLineMobail from '../../../icons/image/actions-bg-mobail.png';
import style from './Actions.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const getMainActionData = async () => {
    
    const data = {
        ContentType: "Action",
        Main: true,
        PageSize: 1,
        Page: 0,
        SiteId: 2,
        Lang: "RUS"
    }
    try {
        const response = await fetch('http://api.intercars-tickets.com/api/v1/news/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const dat = await response.json();
        return dat
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
const Actions = async () => {

    const resultActionDatas = await getMainActionData();
    console.log(resultActionDatas?.Result.Collection[0])
    return (
        <section className={style.actions}>
            <div className='container'>
                <div className={style['actions__wrapper']}>
                    <div className={style['actions-content']}>
                        <h3 className={style['actions-content__title']}>
                            {resultActionDatas?.Result.Collection[0].Name}
                        </h3>
                        <p className={style['actions-content__text']}>
                            {resultActionDatas?.Result.Collection[0].DescribeShort}
                        </p>
                    </div>
                    <div className={style['actions__img']} >
                        <Image
                            src={ActionIconLine}
                            width={326}
                            height={140}
                            alt=''
                            className={style['actions__img-desktop']} />
                        <Image
                            src={ActionIconLineMobail}
                            width={204}
                            height={152}
                            alt=''
                            className={style['actions__img-mobail']} />
                    </div>
                    <Link className={style['actions__link']} href={`akcii/${resultActionDatas?.Result.Collection[0].NiceUrl}`}>
                        Узнать подробности
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Actions;