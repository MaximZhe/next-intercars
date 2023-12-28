
import Link from 'next/link';
import style from './Application.module.scss'
const Application = () => {
    return (
        <div className={style.applications}>
            <div className={style['applications__container']}>
                <div className={style['applications__wrapper']}>
                    <h2 className={style['applications__title']}>
                        Путешествовать удобнее
                        с приложением <span>Intercars</span>
                    </h2>
                </div>
                <div 
                 className={style['applications__img']} ></div>
                <div className={style['applications-links']}>
                    <Link href='' className={style['applications-links__item']}></Link>
                    <Link href='' className={style['applications-links__item']}></Link>
                </div>
            </div>
        </div>
    );
};

export default Application;