import { FC } from 'react';
import { Link } from 'react-router-dom';
import './ActionCardItem.scss';

interface IDataItem {
    data: {
        id: number,
        title: string,
        content: string,
    },
    className: string
}

const ActionCardItem: FC<IDataItem> = ({ data, className }) => {
    return (
        <div className={`action-item-card ${className}`}>
            <h2 className={`action-item-card__title ${className}__title`}>
                {data.title}
            </h2>
            <p className={`action-item-card__text ${className}__text`}>
                {data.content}
            </p>
            <Link to='/' className={`action-item-card__link ${className}__link`} data-item={`${data.id}`} >
                <span>Узнать подробности</span>
            </Link>
        </div>

    );
};

export default ActionCardItem;