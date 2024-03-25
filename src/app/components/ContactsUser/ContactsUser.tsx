'use client'
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import style from './ContactsUser.module.scss';
import InputMask from 'react-input-mask';
const ContactsUser = () => {
    const { register, watch, formState: { errors } } = useFormContext();

    const emailUser = watch(`Email`);
    const phoneUser = watch(`Phone`);


    return (
        <div className={style['contacts-user']}>
            <h3 className={style['contacts-user__title']}>
                Контактные данные
            </h3>
            <p className={style['contacts-user__subtitle']}>
                Эти данные будут использоваться для отправки информации о билетах
            </p>
            <div className={style['contacts-user-form']}>
                <div className={style['contacts-user-form__box']}>
                    <div className={style['contacts-user-form__input']}>
                        <div className={style['contacts-user-form__wrapper']}>
                            <input type='email'
                                {...register('Email', { required: 'Пожалуйста, введите адрес электронной почты' })}
                            />
                            <label className={`${emailUser ? style.active : ""}`}>Адрес электронной почты</label>
                        </div>

                        <div className={style['contacts-user-form__error']}>
                            <ErrorMessage errors={errors} name="Email" />
                        </div>
                    </div>
                    <div className={style['contacts-user-form__input']}>
                        <div className={`${style['contacts-user-form__wrapper']}  ${errors['Phone'] ? `${style['errors-validate']}` : ''}`}>
                            
                            <InputMask type='tel'
                                mask="+7 999 999 99 99"
                                {...register('Phone', { required: 'Пожалуйста, введите номер телефона' })}
                                placeholder='+7 000 000 00 00'
                            />
                            <label className={style.active}>Контактный телефон</label>
                        </div>

                        <div className={style['contacts-user-form__error']}>
                            <ErrorMessage errors={errors} name="Phone" />
                        </div>
                    </div>
                </div>
                <div className={style['contacts-user-form__check']}>
                    <input
                        type='checkbox'
                        {...register('TermsAccepted')}
                    />
                    <label>Хочу получать информацию о скидках и акционных предложениях</label>
                </div>
            </div>

        </div>
    );
};

export default ContactsUser;