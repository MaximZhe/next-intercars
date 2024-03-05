
import moment from 'moment';
import React, { FC } from 'react';
import style from './reviewsItem.module.scss';

interface IReviewsItem {
    dataItem: {
        id?: number,
        user: string,
        dateReviews: string | any,
        question: string,
        admin: string,
        dateResponse: string | any,
        bodyResponse: string
    }
}

const ReviewsItem: FC<IReviewsItem> = ({ dataItem }) => {
    const defaultdateReviews = moment(dataItem.dateReviews).format('DD MM YYYY HH:mm');
    const defaultdateResponse = moment(dataItem.dateResponse).format('DD MM YYYY HH:mm');

    return (
        <div className={style['reviews-item']}>
            <div className={style['reviews-item__header']}>
                <p className={style['reviews-item__user']}>
                    {dataItem.user}
                </p>
                <p className={style['reviews-item__date']}>
                    {defaultdateReviews}
                </p>
            </div>
            <h3 className={style['reviews-item__title']}>
                {dataItem.question}
            </h3>
            <div className={style['reviews-item-response']}>
                <div className={style['reviews-item-response__header']}>
                    <p className={style['reviews-item-response__admin']}>
                        {dataItem.admin}
                    </p>
                    <p className={style['reviews-item-response__date']}>
                        {defaultdateResponse}
                    </p>
                </div>
                <p className={style['reviews-item-response__text']}>
                    {dataItem.bodyResponse}
                </p>
            </div>
        </div>
    );
};

export default ReviewsItem;