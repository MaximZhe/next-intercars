import { FC } from 'react';
import style from './SlideItem.module.scss';
import Link from 'next/link';

interface IDataItem {
    data: {
        id: number,
        value: string,
        price: number
    },
    className?: string
}

const SlideItem: FC<IDataItem> = ({ data, className }) => {
    return (
        <div className={`${style['slider-main']} `}>
            <Link
                href='/'
                
                
                legacyBehavior>
                <div data-item={`${data.id}`} className={`${style['slider-main__item']} `}>
                    <div className={`${style['slider-main__content']} `}>
                        <p className={`${style['slider-main__name']} `}>{data.value}</p>
                        <p className={`${style['slider-main__price']} `}>от <span>{data.price} RUB</span></p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SlideItem;