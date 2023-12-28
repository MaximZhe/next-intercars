import { FC } from 'react';
import style from './RouteItem.module.scss';
import Link from 'next/link';

interface IDataItem {
    data: {
        id: number,
        value: string,
        price: number
    },
    className: string
}

const RouteItem: FC<IDataItem> = ({ data, className }) => {
    return (
        <div className={`${style['route-card']} ${className}`}>
            <Link
                href='/'
                
                data-item={`${data.id}`}
                legacyBehavior>
                <div className={`${style['route-card__item']} ${className}__item`}>
                    <div className={`${style['route-card__content']} ${className}__content`}>
                        <p className={`${style['route-card__name']} ${className}__name`}>{data.value}</p>
                        <p className={`${style['route-card__price']} ${className}__price`}>от <span>{data.price} RUB</span></p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RouteItem;