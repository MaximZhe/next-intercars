"use client"

import axios from 'axios';

import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './SearchForm.module.scss';

import { setDataRoute } from '@/redux/slice/getRoutesSlice';
import {setCityDepartureName} from '@/redux/slice/cityDepartureSlice';
import { useAppDispatch } from '@/app/hooks/redux';
import { useRouter } from 'next/navigation';
import ArrowForm from '@/app/icons/svg/ArrowForm';
import CalendarIcon from '@/app/icons/svg/CalendarIcon';
import { defaultCityForm, defaultDateForm } from '@/app/constant/constant';
import { IFetchDataRoutes } from '@/app/types/types';
import { formatedDateFetch } from '@/app/utils/formatedDateFetch';
import { getServerSideProps } from '@/app/utils/actionCity';
import { useDebounce } from '@/app/hooks/useDebounce';
import { setCityArrivalName } from '@/redux/slice/cityArrivalSlice';
import { setDateSearchRoute } from '@/redux/slice/dateSearchRouteSlice';



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

interface ISearchForm {
    className: string,
    searchProps?:any,
    
}

interface IDataCity {
    Name:string,
    Id: number,
    Coordinates: {
        Latitude: null | string,
        Longitude: null | string
      }
}    

const SearchForm:FC <ISearchForm> = ({ className, searchProps}) => {
    
    const router = useRouter();
    const handleSuccess = (cityNameDeparture:string, cityNameArrival:string, valueDate:string) => {
        router.push(`/find/${cityNameDeparture}-${cityNameArrival}?date=${valueDate}`, undefined);
      };
      
    const dispatch = useAppDispatch();
    const [cityArray, setCityArray] = useState([]);
    const [cityDepartSearch, setCityDepartSearch] = useState([]);
    const [IDepartureSelect, setIDepartureSelect] = useState({name:'',isCurrent:false});
    const [IArrivalSelect, setIArrivalSelect] = useState({name:'',isCurrent:false});
    const [citySearchArrival, setCitySearchArrival] = useState([]);
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
    const [isAnimatedArrow, setIsAnimatedArrow] = useState(false);
    const [isSelectedChange, setIsSelectedChange] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [isErrorSearchDeparture, setIsErrorSearchDeparture] = useState(false);
    const [isErrorSearchArrival, setIsErrorSearchArrival] = useState(false);
    const TodayDate = new Date();

    const defaultDate = moment(TodayDate).format('DD.MM.YYYY');
    const defaultNextDate = moment(TodayDate).add(1, 'd').format('DD.MM.YYYY');

    const [date, setDate] = useState<any>(defaultDate);
    const [updateDate, setUpdateDate] = useState<any>((new Date()));
    const [isCalendarShow, setCalendarShow] = useState(false)
    const [isButtonClicked, setButtonClicked] = useState(false);
    
    useEffect(() => {
        if(searchProps && searchProps.citySearchArrival && searchProps.citySearchDeparture){
            setCityDepartureValue(searchProps.citySearchDeparture);
            setCityArrivalValue(searchProps.citySearchArrival);
        } else {
            if(searchProps && searchProps.citySearchArrival !== undefined && searchProps.citySearchDeparture !== undefined){
                setCityDepartureValue(searchProps.citySearchDeparture);
                setCityArrivalValue(searchProps.citySearchArrival);
            } else {
                return;
            }
        }
    }, [searchProps]);
    useEffect(() => {
        if(searchProps && searchProps.dateSearch){
            const formattedDate = moment(searchProps.dateSearch, 'DD.MM.YYYY').toDate();
            const dateObject = new Date(formattedDate);
            console.log(dateObject);
            setUpdateDate(dateObject);
            // const newDate = moment(searchProps.dateSearch).format('DD.MM.YYYY');
            setDate(searchProps.dateSearch);

        } else {
            if(searchProps && searchProps.dateSearch !== undefined){
                const formattedDate = moment(searchProps.dateSearch, 'DD.MM.YYYY').toDate();
                const dateObject = new Date(formattedDate);
                setUpdateDate(dateObject);
                setDate(searchProps.dateSearch);
            } else {
                return;
            }
        }
    }, [searchProps]);
    // Функция для проверки, является ли дата прошедшей
    const isPastDate = (date: any) => {
        return date < TodayDate;
    };
    
   
    useEffect(() => {
        const animatedIcon = setTimeout(() => {
            setIsAnimatedArrow(false);
        }, 300);

        return () => {
            clearTimeout(animatedIcon);
        }
    },[isAnimatedArrow])
    // Функция для определения, можно ли кликнуть по дате
    const tileDisabled = ({ date }: { date: any }) => {
        return isPastDate(date);
    };

    const debbounceDeparture = useDebounce(cityDepartureValue, 300);
    const debbounceArrival = useDebounce(cityArrivalValue, 300);
    const handleDateChange = (selectedDate: any) => {
        const newDate = moment(selectedDate).format('DD.MM.YYYY');
        setUpdateDate(selectedDate);
        setDate(newDate);
        setCalendarShow(prevState => !prevState);
        dispatch(setDateSearchRoute(newDate));
        dispatch(setCityDepartureName(debbounceDeparture));
        dispatch(setCityArrivalName(debbounceArrival));
        console.log(newDate)
    };

    const handleDepartureChangeFilter = (inputVal: string) => {
        const inputValue = inputVal.toLowerCase();
        console.log(inputValue);
        if (inputValue && inputValue.length > 2) {
            const filteredCities = cityArray.filter((city: any) => 
                city.Name && city.Name.toLowerCase().startsWith(inputValue)
            );
            setCityDepartSearch(filteredCities);
            // Далее используем отфильтрованный массив городов для отображения в выпадающем списке
        }
    };
    const handleArrivalChangeFilter = (inputVal: string) => {
        const inputValue = inputVal.toLowerCase();
        console.log(inputValue);
        if (inputValue && inputValue.length > 2) {
            const filteredCities = cityArray.filter((city: any) => 
                city.Name && city.Name.toLowerCase().startsWith(inputValue)
            );
            setCitySearchArrival(filteredCities);
            // Далее можешь использовать отфильтрованный массив городов для отображения в выпадающем списке
        }
    };
    useEffect(() => {
        const fetchCityArray = async () => {
            const result = await getServerSideProps();
            const resultCity = result.Result.Cities
            console.log(resultCity)
           setCityArray(resultCity)
        }
        if(cityArray.length === 0) {
           fetchCityArray();
           console.log(cityArray)
        }else{
            return
        }
        
    }, [])

    useEffect(() => {
        const fetchCityDeparture = async (cityDeparture: string) => {
            try {
                const data = {
                    name: cityDeparture,
                    lang: 'ENG'
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
        if (debbounceDeparture && debbounceDeparture.length > 2) {
            if(isSelectedChange === true){
                handleDepartureChangeFilter(debbounceDeparture);
                setIDepartureSelect({
                    isCurrent: true,
                    name: ''
                }); 
            }else{
                
            }
            
            if(debbounceDeparture === defaultCityForm.Minsk || debbounceDeparture === defaultCityForm.Mosсow){
                setIDepartureSelect({
                    isCurrent: false,
                    name: ''
                });
            }
        }
        if(debbounceDeparture && debbounceDeparture.length === 0){
            setIDepartureSelect({
                isCurrent: false,
                name: ''
            });
        }
        if(debbounceDeparture === IDepartureSelect.name){
            setIDepartureSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceDeparture && debbounceDeparture.length > 3) {
            fetchCityDeparture(debbounceDeparture);
        }
    },[debbounceDeparture])
    useEffect(() => {
        const fetchCityArrival = async (cityArrival: string) => {
            try {
                const data = {
                    name: cityArrival,
                    lang: 'ENG'
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
        if (debbounceArrival && debbounceArrival.length > 2) {
            if(isSelectedChange === true){
                handleArrivalChangeFilter(debbounceArrival);
                setIArrivalSelect({
                    isCurrent: true,
                    name: ''
                });
            }else{
                
            }
            
            if(debbounceArrival === defaultCityForm.Minsk || debbounceArrival === defaultCityForm.Mosсow){
                setIArrivalSelect({
                    isCurrent: false,
                    name: ''
                });
            } 
        }
        if(debbounceArrival && debbounceArrival.length === 0){
            setIArrivalSelect({
                isCurrent: false,
                name: ''
            });
        }
        if(debbounceArrival === IArrivalSelect.name){
            setIArrivalSelect({
                isCurrent: false,
                name: ''
            });
        }
        if ( debbounceArrival && debbounceArrival.length > 3) {
            fetchCityArrival(debbounceArrival);
        }
    }, [debbounceArrival])

    const updateDataDepartCity = (city:IDataCity) => {
        setCityDepartureValue(city.Name);
        setCityDepartSearch([]);
        setIDepartureSelect({
            isCurrent: false,
            name: city.Name
        });
    }
    const updateDataArrivalCity = (city:IDataCity) => {
        setCityArrivalValue(city.Name);
        setCitySearchArrival([]);
        setIArrivalSelect({
            isCurrent: false,
            name: city.Name
        });
    }
    useEffect(() => {
        const fetchData = async () => {

                const newDateFormated = formatedDateFetch(date);
                try {
                    const datas: IFetchDataRoutes = {
                        CityDeparture: cityDepartureData.Result[0].Id,
                        CityArrival: cityArrivalData.Result[0].Id,
                        DateDeparture: newDateFormated,
                        IsDynamic: true,
                    };
                    console.log(datas);
                    const response = await axios.post('/api/v1/routes/search', datas);
                    const dat = response.data;
                    console.log(dat);
                    dispatch(setDataRoute(dat));
                    
                    handleSuccess(cityDepartureData.Result[0].Name.toLowerCase(), cityArrivalData.Result[0].Name.toLowerCase(), date);
                } catch (error) {
                    console.error('Ошибка при отправке данных на сервер:', error);
                } finally {
                    setCityArrivalValue('');
                    setCityDepartureValue('');
                }
            
        };
    
        if (isButtonClicked) {
            
           
            if(cityDepartureData.Result.length > 0 && cityArrivalData.Result.length > 0){
               setIsLoadingForm(true);
                if (cityDepartureData.Result[0].Id !== 0 && cityArrivalData.Result[0].Id !== 0) {
                    fetchData();
                    setButtonClicked(false);
                    setIsLoadingForm(false);
                    dispatch(setCityDepartureName(debbounceDeparture));
                    dispatch(setCityArrivalName(debbounceArrival));
                    setDate(date); 
                } else {
                    setIsLoadingForm(true);
                    console.log('loading...');
                }
            }else{
                if(cityDepartureData.Result.length < 1){
                    console.log('Выберите другой город отправления');
                   
                }else if(cityArrivalData.Result.length < 1){
                    console.log('Выберите другой город прибытия');
                    
                }else{
                   
                    console.log('данных нет');   
                }  
            }
        }
    }, [cityArrivalData.Result,debbounceArrival,debbounceDeparture, cityDepartureData.Result, isButtonClicked]);

    
    const handleSubmit = () => {
        setButtonClicked(true);
        
    };
    const handleArrowClick = () => {
        setCityDepartureValue(cityArrivalValue);
        setCityArrivalValue(cityDepartureValue);
        setIsAnimatedArrow(true);
        setIsSelectedChange(false)
        console.log(IDepartureSelect.isCurrent, IArrivalSelect.isCurrent,isSelectedChange);
      };
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
                            onChange={(e) => {setCityDepartureValue(e.target.value), setIsSelectedChange(true)}}
                            placeholder='Пункт отправления'
                            required={true}
                        />
                        <div className={`${styles['form-search__select']} ${IDepartureSelect.isCurrent === true ? styles.active : ''}`}>
                            {cityDepartSearch.map((city: any) => (
                                <button type='button' key={city.Id} onClick={() => updateDataDepartCity(city)}>{city.Name}</button>
                            ))}
                        </div>
                        <ArrowForm className={`${styles['form-search__image']} ${isAnimatedArrow ? styles.clicked : ''}`} onClick={handleArrowClick}/>
                    </div>
                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>
                        <button className={styles['form-search__btn']} type='button' 
                        onClick={() => {
                        setCityDepartureValue(defaultCityForm.Minsk);
                        setCityDepartSearch([]);
                        }}
                        >
                        {defaultCityForm.Minsk}
                        </button>
                        <button className={styles['form-search__btn']} type='button' 
                        onClick={() => {setCityDepartureValue(defaultCityForm.Mosсow);
                            setCityDepartSearch([]);
                            }}>{defaultCityForm.Mosсow}
                        </button>
                    </div>
                </div>

                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']}>Куда</label>
                    <div className={styles['form-search__container']}>
                    <input
                        className={styles['form-search__input']}
                        id="arrival"
                        name='arrival'
                        type="text"
                        value={cityArrivalValue}
                        onChange={(e) => {setCityArrivalValue(e.target.value), setIsSelectedChange(true)}}
                        placeholder='Пункт назначения'
                        required={true}
                    />
                    <div className={`${styles['form-search__select']} ${IArrivalSelect.isCurrent === true ? styles.active : ''}`}>
                            {citySearchArrival.map((city: any) => (
                                <button type='button' key={city.Id} onClick={() => updateDataArrivalCity(city)}>{city.Name}</button>
                            ))}
                        </div>
                    </div>
                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>

                        <button className={styles['form-search__btn']} type='button' onClick={() => {setCityArrivalValue(defaultCityForm.Minsk);setCitySearchArrival([]);}}>{defaultCityForm.Minsk}</button>
                        <button className={styles['form-search__btn']} type='button' onClick={() => {setCityArrivalValue(defaultCityForm.Mosсow);setCitySearchArrival([]);}}>{defaultCityForm.Mosсow}</button>
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
                                className={`${styles['form-search__icon']} ${isCalendarShow ? styles.active : '' }`}
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
                                onChange={handleDateChange}
                                value={updateDate}
                                tileDisabled={tileDisabled}  
                            />
                        </div>
                        : null}
                </div>
                <div className={styles['form-search__wrapper']}>
                    <button className={styles['form-search__btn-submit']} type='button' onClick={handleSubmit}>{isLoadingForm ? 'Идет поиск...' : 'Найти билеты'}</button>
                </div>
            </form>
        </>
    );
};

export default SearchForm;