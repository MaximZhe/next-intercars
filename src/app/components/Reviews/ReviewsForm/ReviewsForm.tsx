
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import style from './reviewsForm.module.scss'

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

const ReviewsForm = () => {
    const { register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid } } = useForm<IErrors>({mode: 'onBlur'})
    const handleFormSubmit = (data: any) => {

        console.log(data)
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
            <div className={style['reviews-form__wrapper']}>
                <div className={style['reviews-form__contacts']}>
                    <div className={`${style['reviews-form__input']} `}>
                        <div className={`${style['reviews-form__inner']} `}>
                            <input type='text'
                                {...register('review.user', { required: 'Пожалуйста, введите ваше имя' })}
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
                                {...register('review.email', { required: 'Пожалуйста, введите ваш email' })}
                            />
                            <label className={`${emailUser ? `${style['reviews-form__active']}` : ""}`}>Ваш адрес электронной почты</label>
                        </div>

                        <div className={style['reviews-form__error']}>
                            <ErrorMessage errors={errors} name="review.email" />
                        </div>
                    </div>
                </div>
                <div className={style['reviews-form__input']}>
                    <textarea placeholder='Ваш вопрос, отзыв или предложение'
                        {...register('review.text')}>

                    </textarea>
                    
                </div>
            </div>
            <input className={style['reviews-form__submit']} disabled={!isValid}
                type="submit" value='Отправить' />
        </form>
    );
};

export default ReviewsForm;