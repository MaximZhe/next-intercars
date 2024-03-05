'use client'

import React, { useState } from 'react';
import Button from '../UI/Button/Button';

import ReviewsItem from './ReviewsItem/ReviewsItem';

import ReviewsForm from './ReviewsForm/ReviewsForm';
import style from './reviews.module.scss';
import { ReviewsData } from '@/app/constant/constant';
import ArrowRight from '@/app/icons/svg/ArrowRight';
const Reviews = () => {
    const [visibleItems, setVisibleItems] = useState(2);
    const itemsPerPage = 2;

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };
    return (
        <div className={style.reviews}>
            <div className={style.reviews__content}>
                <h3 className={style.reviews__title}>
                    Комментарии, вопросы и отзывы пользователей
                </h3>
                {ReviewsData.slice(0, visibleItems).map((item) => (
                    <ReviewsItem key={item.id} dataItem={item} />
                ))}

                <Button disabled={ReviewsData.length > visibleItems ? false : true}
                    type='button'
                    onClick={handleShowMore}
                    className={`${style.reviews__btn} ${ReviewsData.length > visibleItems ? '' : 'disabled'}`}>
                    <p className={style['reviews__btn-text']}>Показать еще</p>
                    <ArrowRight className={style.reviews__icon} />
                </Button>

            </div>
            <ReviewsForm />
        </div>
    );
};

export default Reviews;