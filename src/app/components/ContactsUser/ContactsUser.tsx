'use client'
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import style from './ContactsUser.module.scss';

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
                        <div className={`${errors['Email'] ? `${style['errors-validate']}` : ''} ${style['contacts-user-form__wrapper']} `}>
                            <input type='email'
                                {...register('Email', { required: 'Пожалуйста, введите адрес электронной почты',
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i,
                                    message: 'Укажите корректный адрес электронной почты'
                                    }
                                 })}
                            />
                            <label className={`${emailUser ? style.active : ""}`}>Адрес электронной почты</label>
                        </div>

                        <div className={style['contacts-user-form__error']}>
                            <ErrorMessage errors={errors} name="Email" />
                        </div>
                    </div>
                    <div className={style['contacts-user-form__input-wrapper']}>
                    <div className={`${errors['Phone'] ? `${style['errors-validate']}` : ''} ${style['contacts-user-form__input']}`}>
                        <div className={`${style['contacts-user-form__wrapper']}  ${errors['Phone'] ? `${style['errors-validate']}` : ''}`}>
                            
                            <input type='tel'
                                
                                {...register('Phone', { required: 'Пожалуйста, введите номер телефона',
                                    pattern: {
                                        value: /^[0-9\s\W]+$/,
                                        message: 'Можно использовать цифры',
                                      }
                                 })}
                                placeholder='+7 000 000 00 00'
                            />
                            <label className={style.active}>Контактный телефон</label>
                        </div>

                        <div className={style['contacts-user-form__error']}>
                            <ErrorMessage errors={errors} name="Phone" />
                        </div>
                    </div>
                    <div className={`${errors['PhoneTwo'] ? `${style['errors-validate']}` : ''} ${style['contacts-user-form__input']}`}>
                        <div className={`${style['contacts-user-form__wrapper']}  ${errors['PhoneTwo'] ? `${style['errors-validate']}` : ''}`}>
                            
                            <input type='tel'
                                
                                {...register('PhoneTwo', {
                                    pattern: {
                                        value: /^[0-9\s\W]+$/,
                                        message: 'Можно использовать цифры',
                                      }
                                 })}
                                placeholder='+7 000 000 00 00'
                            />
                            <label className={style.active}>Дополнительный телефон</label>
                        </div>

                        <div className={style['contacts-user-form__error']}>
                            <ErrorMessage errors={errors} name="PhoneTwo" />
                        </div>
                    </div>
                    </div>
                    
                </div>
                <div className={style['contacts-user-form__check']}>
                    <input
                        type='checkbox'
                        {...register('HasSubscription')}
                    />
                    <label>Хочу получать информацию о скидках и акционных предложениях</label>
                </div>
            </div>

        </div>
    );
};

export default ContactsUser;