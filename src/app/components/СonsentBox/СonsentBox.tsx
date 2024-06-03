
import { useFormContext } from 'react-hook-form';

import style from './СonsentBox.module.scss';
import Link from 'next/link';
const СonsentBox = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <>
            <div className={style['promo-order-form__checkboxs']}>
                    <div className={style['promo-order-form__check']}>
                        <input
                            type='checkbox'
                            {...register('termsAcceptedPolity', { required: 'Пожалуйста, примите условия' })}
                        />
                        <label>Принимаю условия <Link href='/'>пользовательского соглашения и политики конфеденциальности</Link></label>
                    </div>
                    <div className={style['promo-order-form__check']}>
                        <input
                            type='checkbox'
                            {...register('termsAcceptedProcessing', { required: 'Пожалуйста, примите условия' })}
                        />
                        <label>Даю согласие на <Link href='/'>обработку персональных данных</Link> </label>
                    </div>
                </div>
            
        </>
    );
};

export default СonsentBox;