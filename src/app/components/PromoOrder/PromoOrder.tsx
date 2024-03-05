'use client'

import style from './PromoOrder.module.scss';
import { ErrorMessage } from '@hookform/error-message';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';


interface IPromoOrderProps {
    handlePromoCode:(handlePromoCode:string) => void,
}
const PromoOrder:FC<IPromoOrderProps> = ({handlePromoCode}) => {
    const { register, watch,setFocus, resetField, formState: { errors } } = useFormContext();
    const promocode = watch(`PromoCode`);

    const resetPromo = () => {
        handlePromoCode(promocode)
        resetField('PromoCode')
    }
    return (
        <div className={style['promo-order']}>
            <div className={style['promo-order-form']}>
                <div className={style['promo-order-form__box']}>
                    <div className={style['promo-order-form__input']}>
                        <div className={style['promo-order-form__wrapper']}>
                            <input type='text'
                                {...register('PromoCode',)}
                            />
                            <label className={`${promocode ? style.active : ""}`}>Введите промокод</label>
                        </div>

                        <div className={style['promo-order-form__error']}>
                            <ErrorMessage errors={errors} name="PromoCode" />
                        </div>

                    </div>
                    <div className={style['promo-order-form__input']}>
                        <input type='button'
                            value='Применить'
                        onClick={resetPromo}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoOrder;