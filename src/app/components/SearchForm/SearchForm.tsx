"use client"

import axios from 'axios';

import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './SearchForm.module.scss';




import { setDataRoute } from '@/redux/slice/getRoutesSlice';
import { useAppDispatch } from '@/app/hooks/redux';
import { useRouter } from 'next/navigation';
import ArrowForm from '@/app/icons/svg/ArrowForm';
import CalendarIcon from '@/app/icons/svg/CalendarIcon';
import { defaultCityForm, defaultDateForm } from '@/app/constant/constant';


const initialStateResultCity = {
    Id: 0,
    Name: '',
    Coordinates: {
        Latitude: '',
        Longitude: ''
    }
}

export interface ICityDataProps {
    Result: [
        {
            Id: number,
            Name: string,
            Coordinates: {
                Latitude: string,
                Longitude: string
            }
        }
    ],
    Error: null
}
export interface IFetchDataRoutes {
    SearchId?: string,
    CityDeparture: number,
    CityArrival: number,
    Date: string,
    Carriers?: number[],
    IsDynamic?: boolean,
    Lang?: string
}
export interface IRouteData {
    Result: {
        CarrierRoutes: [],
        CityArrival: number,
        CityDeparture: number
        Date: string,
        Id: string,
        IsActive: boolean,
        IsDynamic: boolean,
        SaveDate: string
    },
    Error: null
}
interface ISearchForm {
    className: string,
}
const SearchForm:FC <ISearchForm> = ({ className }) => {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/list-result-routes', undefined);
      };
   console.log(handleSuccess)

    const dispatch = useAppDispatch();
    const [cityDepartureValue, setCityDepartureValue] = useState<string>('');
    const [cityArrivalValue, setCityArrivalValue] = useState<string>('');
    const [cityDepartureData, setCityDepartureData] = useState<ICityDataProps>({
        Result: [initialStateResultCity],
        Error: null
    });
    const [cityArrivalData, setCityArrivalData] = useState<ICityDataProps>({
        Result: [initialStateResultCity],
        Error: null
    });
    const TodayDate = new Date();
    const defaultDate = moment(TodayDate).format('DD.MM.YYYY');
    const defaultNextDate = moment(TodayDate).add(1, 'd').format('DD.MM.YYYY');

    const [date, setDate] = useState(defaultDate);
    const [isCalendarShow, setCalendarShow] = useState(false)
    const [isButtonClicked, setButtonClicked] = useState(false);


    // Функция для проверки, является ли дата прошедшей
    const isPastDate = (date: any) => {
        return date < TodayDate;
    };
    


    // Функция для определения, можно ли кликнуть по дате
    const tileDisabled = ({ date }: { date: any }) => {
        return isPastDate(date);
    };

    const formatedDateFetch = (date: any) => {
        const formetedDate = moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
        return formetedDate
    }
    const handleDepartureChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCityDepartureValue(e.target.value);
        console.log(e.target.value)
    };

    const handleArrivalChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCityArrivalValue(e.target.value);

    };
    console.log(cityArrivalValue)
    const handleDateChange = (selectedDate: any) => {
        const newDate = moment(selectedDate).format('DD.MM.YYYY');
        setDate(newDate);
        setCalendarShow(prevState => !prevState);
    };

    useEffect(() => {
        const fetchCityDeparture = async (cityDeparture: string) => {
            try {
                const data = {
                    name: cityDeparture,
                    lang: 'RUS'
                }
                const response = await axios.post('/api/v1/cities/find', data);
                const dat = response.data;
                setCityDepartureData(dat);
                console.log(dat)
            }
            catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
        if (cityDepartureValue.length > 3) {
            fetchCityDeparture(cityDepartureValue);
        }
        const fetchCityArrival = async (cityArrival: string) => {
            try {
                const data = {
                    name: cityArrival,
                    lang: 'RUS'
                }
                const response = await axios.post('/api/v1/cities/find', data);
                const dat = response.data;
                setCityArrivalData(dat);
                console.log(dat)
            }
            catch (error) {

                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
        if (cityArrivalValue.length > 3) {
            fetchCityArrival(cityArrivalValue);
        }
    }, [cityArrivalValue, cityDepartureValue])
    const fetchData = async () => {
        const newDateFormated = formatedDateFetch(date);
        try {
            const datas: IFetchDataRoutes = {
                CityDeparture: cityDepartureData.Result[0].Id,
                CityArrival: cityArrivalData.Result[0].Id,
                Date: newDateFormated,
                IsDynamic: true,
            };
            console.log(datas)
            const response = await axios.post('/api/v1/routes/search', datas);
            const dat = response.data;
            dispatch(setDataRoute(dat));
            handleSuccess();

        } catch (error) {

            console.error('Ошибка при отправке данных на сервер:', error);
        } finally {
            setCityDepartureValue('');
            setCityArrivalValue('');
        }
    };

    if (isButtonClicked) {
        fetchData();
        setButtonClicked(false);
    }
    const handleSubmit = () => {
        setButtonClicked(true);
    };
    console.log(Calendar)
    return (
        <>
            <form className={`${styles['form-search']} ${className}`}>
                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']}>Откуда</label>
                    <div className={styles['form-search__container']}>
                        <input className={styles['form-search__input']}
                            id="departure"
                            name='departure'
                            type="text"
                            value={cityDepartureValue}
                            onChange={handleDepartureChange}
                            placeholder='Пункт отправления'
                        />
                        <ArrowForm className={styles['form-search__image']} />
                    </div>
                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setCityDepartureValue(defaultCityForm.Minsk)}>{defaultCityForm.Minsk}</button>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setCityDepartureValue(defaultCityForm.Mosсow)}>{defaultCityForm.Mosсow}</button>
                    </div>

                </div>

                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']}>Куда</label>

                    <input
                        className={styles['form-search__input']}
                        id="arrival"
                        name='arrival'
                        type="text"
                        value={cityArrivalValue}
                        onChange={handleArrivalChange}
                        placeholder='Пункт назначения'
                    />
                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>

                        <button className={styles['form-search__btn']} type='button' onClick={() => setCityArrivalValue(defaultCityForm.Minsk)}>{defaultCityForm.Minsk}</button>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setCityArrivalValue(defaultCityForm.Mosсow)}>{defaultCityForm.Mosсow}</button>
                    </div>
                </div>

                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']}>Когда</label>
                    <div className={styles['form-search__container']}>
                        <input
                            className={styles['form-search__input']}
                            id="date"
                            name='date'
                            type="text"
                            value={date}
                            readOnly
                            onClick={() => setCalendarShow(true)}
                        />
                        <div className={styles['form-search__icon-wrapper']}
                        onClick={() => setCalendarShow(prevState => !prevState)}>
                            <CalendarIcon
                                className={styles['form-search__icon']}
                            />
                        </div>

                    </div>

                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setDate(defaultDate)}>{defaultDateForm.Today}</button>
                        <button className={styles['form-search__btn']} type='button' onClick={() => setDate(defaultNextDate)}>{defaultDateForm.Tomorrow}</button>
                    </div>
                    {isCalendarShow ?
                        <div className={styles['form-search__calendar']}>
                            <Calendar
                                onClickDay={handleDateChange}
                                value={TodayDate}
                                tileDisabled={tileDisabled}

                            />
                        </div>
                        : null}

                </div>
                <div className={styles['form-search__wrapper']}>
                    <button className={styles['form-search__btn-submit']} type='button' onClick={handleSubmit}>Найти билеты</button>
                </div>
            </form>
        </>
    );
};

export default SearchForm;