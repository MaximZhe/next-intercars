'use client'
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import style from './reviewsForm.module.scss'
import { FC, useState } from "react";

interface IErrors {
    review:{
        user:string,
        email:string,
        text:string
    }
    errors:{
        review:{
            user:{
                message: string
            }
        }
    }
}
interface IReviewsForm {
    idDeparture: number,
    idArrival: number
}
const ReviewsForm:FC <IReviewsForm> = ({idDeparture, idArrival}) => {
    const [isLoadingMessage, setIsLoadingMessage] = useState(false);
    const [message, setMessage] = useState('');

    function hiddenMessage() {
        setTimeout(() => setMessage(''), 3000)
    }
    const { register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid } } = useForm<IErrors>({mode: 'onBlur'})
    const handleFormSubmit = async(data: any) => {
        const reviews = data.review;
        const datasReview = {
            SiteId: 2,
            Lang: "RUS",
            CityDepartureId: idDeparture,
            CityArrivalId: idArrival,
            ContactName: reviews.user,
            Email: reviews.email,
            Question: reviews.text
        }
        setIsLoadingMessage(true)
        try{
            const response = await fetch('/api/v1/question/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasReview)
            })
            if(response.ok){
                setMessage('Ваше сообщение будет рассмотрено в ближайшее время')
                hiddenMessage();
            }else{
                setMessage('Произошла ошибка при отправке данных')
            }
            setIsLoadingMessage(false)
        }
        catch(error){
            console.log(error)
        }
        
        
        reset();
    }
    
    const nameUser = watch(`review.user`);
    const emailUser = watch(`review.email`);
    console.log(errors.review?.user?.message)
    
    return (
        <form className={style['reviews-form']} onSubmit={handleSubmit(handleFormSubmit)} >
            <h4 className={style['reviews-form__title']}>
                Форма для вопросов, отзывов и предложений
            </h4>
            <div className={`${style['reviews-form__message']} ${message !== '' ? `${style['reviews-form__message-active']}` : ""}`}>
            <p>{message}</p>
            </div>
            <div className={style['reviews-form__wrapper']}>
                <div className={style['reviews-form__contacts']}>
                    <div className={`${style['reviews-form__input']} `}>
                        <div className={`${style['reviews-form__inner']} `}>
                            <input type='text'
                                {...register('review.user', { required: 'Пожалуйста, введите ваше имя',
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]+$/,
                                    message: 'Можно использовать только буквы',
                                  }
                                 })}
                            />
                            <label className={`${nameUser ? `${style['reviews-form__active']}` : ""}`}>Ваше имя</label>
                        </div>

                        <div className={style['reviews-form__error']}>
                            <ErrorMessage errors={errors} name="review.user" />
                        </div>
                    </div>
                    <div className={style['reviews-form__input']}>
                        <div className={style['reviews-form__inner']}>
                            <input type='email'
                                {...register('review.email', { required: 'Пожалуйста, введите ваш email',pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Укажите @ для адреса электронной почты'
                                } })}
                            />
                            <label className={`${emailUser ? `${style['reviews-form__active']}` : ""}`}>Ваш адрес электронной почты</label>
                        </div>

                        <div className={style['reviews-form__error']}>
                            <ErrorMessage errors={errors} name="review.email" />
                            
                        </div>
                    </div>
                </div>
                <div className={style['reviews-form__input']}>
                    <textarea spellCheck={true} placeholder='Ваш вопрос, отзыв или предложение'
                        {...register('review.text')}>

                    </textarea>
                    
                </div>
            </div>
            <input className={`${style['reviews-form__submit']} ${isLoadingMessage ? style.loading : ''}`} disabled={!isValid}
                type="submit" value= {isLoadingMessage ? 'Отправляется...' : 'Отправить'} />
        </form>
    );
};

export default ReviewsForm;