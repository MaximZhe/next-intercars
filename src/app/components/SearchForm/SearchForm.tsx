"use client"

import React, { FC, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './SearchForm.module.scss';

import { setDataRoute } from '@/redux/slice/getRoutesSlice';
import { setCityDepartureName } from '@/redux/slice/cityDepartureSlice';
import { useAppDispatch } from '@/app/hooks/redux';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import ArrowForm from '@/app/icons/svg/ArrowForm';
import CalendarIcon from '@/app/icons/svg/CalendarIcon';
import { defaultCityForm, defaultDateForm } from '@/app/constant/constant';
import { IFetchDataRoutes } from '@/app/types/types';
import { formatedDateFetch } from '@/app/utils/formatedDateFetch';
import { getServerSideProps } from '@/app/api/actionCity';
import { useDebounce } from '@/app/hooks/useDebounce';
import { setCityArrivalName } from '@/redux/slice/cityArrivalSlice';
import { getCalendarPrice } from '@/app/api/actionGetCalendarPrice';
import { splitCityName } from '@/app/utils/splitCityNameSearch';
import { formatedCalendarData } from '@/app/utils/formatedCalendarData';




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
    searchProps?: any,
    citySeoRoute?: any,
    prop?: any,

}

interface IDataCity {
    Name: string,
    Id: number,
    Coordinates: {
        Latitude: null | string,
        Longitude: null | string
    }
}
interface TicketPrice {
    DateDeparture: string;
    Price: number | null;
    IsActive: boolean;
  }
const SearchForm: FC<ISearchForm> = ({ className, searchProps, citySeoRoute, prop }) => {
    const router = useRouter();
    
    const handleSuccess = (cityNameDeparture: string, cityNameArrival: string, valueDate: string) => {
        const actualCityDeparture = splitCityName(cityNameDeparture);
        const actualCityArrival = splitCityName(cityNameArrival);
        router.push(`/find/route/${actualCityDeparture[0]}-${actualCityArrival[0]}?date=${valueDate}`, undefined);
    };

    const dispatch = useAppDispatch();
    const [cityArray, setCityArray] = useState([]);
    const [cityDepartSearch, setCityDepartSearch] = useState([]);
    //Выпадающий список городов
    const [IDepartureSelect, setIDepartureSelect] = useState({ name: '', isCurrent: false });
    const [IArrivalSelect, setIArrivalSelect] = useState({ name: '', isCurrent: false });
    
    const [citySearchArrival, setCitySearchArrival] = useState([]);
    const [cityDepartureValue, setCityDepartureValue] = useState<string>('');
    const [cityArrivalValue, setCityArrivalValue] = useState<string>('');
    //Информация о городах
    const [cityDepartureData, setCityDepartureData] = useState<ICityDataProps>({
        Result: [initialStateResultCity],
        Error: null
    });
    const [cityArrivalData, setCityArrivalData] = useState<ICityDataProps>({
        Result: [initialStateResultCity],
        Error: null
    });
    //Анимация стрелки
    const [isAnimatedArrow, setIsAnimatedArrow] = useState(false);

    const [isSelectedChange, setIsSelectedChange] = useState(false);
    //Состояние кнопки поиска
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const [isSearchForm, setIsSearchForm] = useState(true);
    //Цены календаря
    const [ticketPrices, setTicketPrices] = useState<TicketPrice[]>([]);

    const refArrivalSelect = useRef<HTMLDivElement | null>(null);
    const refDepartureSelect = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
      if (refArrivalSelect.current && !refArrivalSelect.current.contains(event.target as Node)) {
        setIArrivalSelect({ isCurrent: false, name: '' });
      }
      if (refDepartureSelect.current && !refDepartureSelect.current.contains(event.target as Node)) {
        setIDepartureSelect({ isCurrent: false, name: '' });
      }
    };
    
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
          const formattedDate = formatedDateFetch(date);
          const ticketData = ticketPrices.find((item) => item.DateDeparture === formattedDate);
          if (ticketData && ticketData.Price) {
            return <span key={ticketData.DateDeparture} className={ticketData.IsActive === true ? 'price-ticket' : 'price-old'}>{`${ticketData.Price} ₽`} </span>;
          } else if (ticketData && !ticketData.Price) {
            return <span> </span>;
          }
        }
        return null;
      };
    const TodayDate = new Date();

    const defaultDate = moment(TodayDate).format('DD.MM.YYYY');
    const defaultNextDate = moment(TodayDate).add(1, 'd').format('DD.MM.YYYY');

    const [date, setDate] = useState<any>(defaultDate);
    const [updateDate, setUpdateDate] = useState<any>((new Date()));
    const [isCalendarShow, setCalendarShow] = useState(false)
    const [isButtonClicked, setButtonClicked] = useState(false);

    
    const closeSelect = () => {
        setCalendarShow(prevState => !prevState)
        setIArrivalSelect({
            isCurrent: false,
            name: ''
        });
        setIDepartureSelect({
            isCurrent: false,
            name: ''
        });
    }
    useEffect(() => {
        async function  getCalendarPriceSearch() {
            const startDateFetch = formatedDateFetch(defaultDate);
            const datas = {
                CityDeparture: cityDepartureData.Result[0].Id,
                CityArrival: cityArrivalData.Result[0].Id,
                Days: 155,
                DateStart: startDateFetch,
                CurrencyId: 4,
              }
            const resultCalendar = await getCalendarPrice(datas);

            if(resultCalendar){
                console.log(resultCalendar);
                const formattedData = formatedCalendarData(resultCalendar.Result.data)
                setTicketPrices(formattedData)
            }
        }
        if(isCalendarShow && cityDepartureData.Result[0].Id && 
            cityDepartureData.Result[0].Id !== 0 && 
            cityArrivalData.Result[0].Id && 
            cityArrivalData.Result[0].Id !== 0){
            getCalendarPriceSearch();
            
        }else{
            setTicketPrices([])
            
        }
        
    },[isCalendarShow, cityDepartureData.Result[0]?.Id, cityArrivalData.Result[0]?.Id])
    useEffect(() => {
        if (citySeoRoute) {
            console.log(citySeoRoute)
            const newCityNameArrivalSeo = splitCityName(citySeoRoute.cityArravalName);
            const newCityDepartNameSeo = splitCityName(citySeoRoute.cityDepartName);
            setIsSearchForm(false)
            setCityDepartureValue(newCityDepartNameSeo[0]);
            setCityArrivalValue(newCityNameArrivalSeo[0]);
            setDate('Дата выезда')
        }
    }, [citySeoRoute]);
    useEffect(() => {
        if (searchProps && searchProps.citySearchArrival && searchProps.citySearchDeparture) {
            setCityDepartureValue(searchProps.citySearchDeparture);
            setCityArrivalValue(searchProps.citySearchArrival);
        } else {
            if (searchProps && searchProps.citySearchArrival !== undefined && searchProps.citySearchDeparture !== undefined) {
                setCityDepartureValue(searchProps.citySearchDeparture);
                setCityArrivalValue(searchProps.citySearchArrival);
            } else {
                return;
            }
        }
    }, [searchProps]);
    useEffect(() => {
        if (searchProps && searchProps.dateSearch) {
            const formattedDate = moment(searchProps.dateSearch, 'DD.MM.YYYY').toDate();
            const dateObject = new Date(formattedDate);
            setUpdateDate(dateObject);
            setDate(searchProps.dateSearch);
        }
    }, [searchProps]);
    // является ли дата прошедшей
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
    }, [isAnimatedArrow])
    const tileDisabled = ({ date, view }: any) => {
        // Получаем сегодняшнюю дату
        const today = new Date();
      
        // Отключить выбор прошедших дат, кроме сегодняшней
        return date.getDate() < today.getDate(); 
      };

    const debbounceDeparture = useDebounce(cityDepartureValue, 0);
    const debbounceArrival = useDebounce(cityArrivalValue, 0);
    const handleDateChange = (selectedDate: any) => {
        const newDate = moment(selectedDate).format('DD.MM.YYYY');
        setUpdateDate(selectedDate);
        setDate(newDate);
        setCalendarShow(prevState => !prevState);
        dispatch(setCityDepartureName(debbounceDeparture));
        dispatch(setCityArrivalName(debbounceArrival));
    };

    const handleDepartureChangeFilter = (inputVal: string) => {
        const inputValue = inputVal.toLowerCase();

        if (inputValue && inputValue.length > 0) {

            const filteredCities: any = cityArray.filter((city: any) =>
                city.Name && city.Name.toLowerCase().startsWith(inputValue)
            );
            if (filteredCities && filteredCities.length > 0) {
                setCityDepartSearch(filteredCities);
                console.log(filteredCities);
            } else {
                console.log('Город не найден')
            }

        }
    };
    const handleArrivalChangeFilter = (inputVal: string) => {
        const inputValue = inputVal.toLowerCase();
        if (inputValue && inputValue.length > 0) {
            const filteredCities = cityArray.filter((city: any) =>
                city.Name && city.Name.toLowerCase().startsWith(inputValue)
            );
            if (filteredCities.length > 0) {
                setCitySearchArrival(filteredCities);
            } else {
                console.log('Город не найден')
            }
        }
    };
    useEffect(() => {
        const fetchCityArray = async () => {
            const result = await getServerSideProps();
            const resultCity = result.Result.Cities;
            console.log(resultCity);
            setCityArray(resultCity);
            localStorage.setItem('cityArray', JSON.stringify(resultCity)); // Сохраняем данные в localStorage
        };

        if (cityArray.length === 0) {
            const savedDataCity = localStorage.getItem('cityArray');
            if (savedDataCity) {
                const parseSavedDataCity = JSON.parse(savedDataCity);
                setCityArray(parseSavedDataCity); // Если данные есть в localStorage, загружаем их
            } else {
                fetchCityArray();
            }
        }
    }, [])

    useEffect(() => {
        const fetchCityDeparture = async (cityDeparture: string) => {
            try {
                const data = {
                    name: cityDeparture,
                    lang: 'ENG'
                }
                const response = await fetch('/api/v1/cities/find', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const dat = await response.json();
                setCityDepartureData(dat);
                console.log(dat.Result[0]?.Id)
            }
            catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
        if (debbounceDeparture && debbounceDeparture.length > 0) {
            if (isSelectedChange === true) {
                handleDepartureChangeFilter(debbounceDeparture);
                setIDepartureSelect({
                    isCurrent: true,
                    name: ''
                });
                setIArrivalSelect({
                    isCurrent: false,
                    name: ''
                });
               
            } else {

            }

            if (debbounceDeparture === defaultCityForm.Minsk || debbounceDeparture === defaultCityForm.Mosсow) {
                setIDepartureSelect({
                    isCurrent: false,
                    name: ''
                });
            }
        }
        if (debbounceDeparture && debbounceDeparture.length === 0) {
            setIDepartureSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceDeparture === IDepartureSelect.name) {
            setIDepartureSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceDeparture && debbounceDeparture.length > 0) {
            fetchCityDeparture(debbounceDeparture);
        }

    }, [debbounceDeparture])
    useEffect(() => {
        const fetchCityArrival = async (cityArrival: string) => {
            try {
                const data = {
                    Name: cityArrival,
                    Lang: 'ENG'
                }
                const response = await fetch('/api/v1/cities/find', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const dat = await response.json();
                setCityArrivalData(dat);
                console.log(dat)
            }
            catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
        if (debbounceArrival && debbounceArrival.length > 0) {
            if (isSelectedChange === true) {
                handleArrivalChangeFilter(debbounceArrival);
                setIArrivalSelect({
                    isCurrent: true,
                    name: ''
                });
                setIDepartureSelect({
                    isCurrent: false,
                    name: ''
                });
            } else {

            }

            if (debbounceArrival === defaultCityForm.Minsk || debbounceArrival === defaultCityForm.Mosсow) {
                setIArrivalSelect({
                    isCurrent: false,
                    name: ''
                });
            }
        }
        if (debbounceArrival && debbounceArrival.length === 0) {
            setIArrivalSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceArrival === IArrivalSelect.name) {
            setIArrivalSelect({
                isCurrent: false,
                name: ''
            });
        }
        if (debbounceArrival && debbounceArrival.length > 0) {
            fetchCityArrival(debbounceArrival);
        }
    }, [debbounceArrival])

    const updateDataDepartCity = (city: IDataCity) => {
        const newCityNameDepart = splitCityName(city.Name);
        setCityDepartureValue(newCityNameDepart[0]);
        setCityDepartSearch([]);
        setIDepartureSelect({
            isCurrent: false,
            name: newCityNameDepart[0]
        });
    }
    const updateDataArrivalCity = (city: IDataCity) => {
        const newCityNameArrival = splitCityName(city.Name);
        setCityArrivalValue(newCityNameArrival[0]);
        setCitySearchArrival([]);
        setIArrivalSelect({
            isCurrent: false,
            name: newCityNameArrival[0]
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
                const response = await fetch('/api/v1/routes/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(datas)
                });
                const dat = await response.json();
                console.log(dat);
                dispatch(setDataRoute(dat));
                setIsLoadingForm(false)
                handleSuccess(cityDepartureData.Result[0].Name.toLowerCase(), cityArrivalData.Result[0].Name.toLowerCase(), date);
                localStorage.setItem('updateDateRoute', 'true');
            } catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            } finally {
                setCityArrivalValue('');
                setCityDepartureValue('');
                setDate('');
            }
        };
        if (isButtonClicked) {
            if (cityDepartureData.Result.length > 0 && cityArrivalData.Result.length > 0) {
                setIsLoadingForm(true);
                if (cityDepartureData.Result[0].Id !== 0 && cityArrivalData.Result[0].Id !== 0) {
                    fetchData();
                    setButtonClicked(false);

                    dispatch(setCityDepartureName(debbounceDeparture));
                    dispatch(setCityArrivalName(debbounceArrival));
                    setDate(date);
                } else {

                    console.log('loading...');
                }
            } else {
                if (cityDepartureData.Result.length < 1) {
                    console.log('Выберите другой город отправления');
                } else if (cityArrivalData.Result.length < 1) {
                    console.log('Выберите другой город прибытия');
                } else {
                    console.log('данных нет');
                }
                setIsLoadingForm(false)
            }
        }
        const backLocaltorage = localStorage.getItem('backPage');
        if (backLocaltorage === 'true') {
            setButtonClicked(true);
            localStorage.removeItem('backPage');
            console.log('backPage очищен')
            console.log('получаем новый Search Id')
        }
    }, [cityArrivalData.Result, debbounceArrival, debbounceDeparture, cityDepartureData.Result, isButtonClicked]);

    const handleSubmit = () => {
        setButtonClicked(true);

    };
    const handleArrowClick = () => {
        setCityDepartureValue(cityArrivalValue);
        setCityArrivalValue(cityDepartureValue);
        setIsAnimatedArrow(true);
        setIsSelectedChange(false)
        console.log(IDepartureSelect.isCurrent, IArrivalSelect.isCurrent, isSelectedChange);
    };

    return (
        <>
            <form id='search-form' autoComplete='off' className={`${styles['form-search']} ${className}`}>
                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']}>Откуда</label>
                    <div className={styles['form-search__container']}>
                        <input spellCheck={true} className={styles['form-search__input']}
                            id="departure"
                            name='departure'
                            type="text"
                            value={cityDepartureValue}
                            onChange={(e) => { setCityDepartureValue(e.target.value), setIsSelectedChange(true), setIsSearchForm(true) }}
                            placeholder='Пункт отправления'
                            required={true}
                        />
                        <div ref={refDepartureSelect} className={`${styles['form-search__select']} ${IDepartureSelect.isCurrent === true ? styles.active : ''}`}>
                            {cityDepartSearch.map((city: any) => {
                                const [cityName, cityDetails] = splitCityName(city.Name);              
                                return (
                                    <button type='button' key={city.Id} onClick={() => updateDataDepartCity(city)}>
                                        {cityName}
                                        <span className={styles['form-search__details']}>{cityDetails ? `(${cityDetails})` : null}</span>
                                    </button>
                                );
                            })}

                        </div>
                        <ArrowForm className={`${styles['form-search__image']} ${isAnimatedArrow ? styles.clicked : ''}`} onClick={handleArrowClick} />
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
                            onClick={() => {
                                setCityDepartureValue(defaultCityForm.Mosсow);
                                setCityDepartSearch([]);
                            }}>{defaultCityForm.Mosсow}
                        </button>
                    </div>
                </div>
                <div className={styles['form-search__wrapper']}>
                    <label className={styles['form-search__label']}>Куда</label>
                    <div className={styles['form-search__container']}>
                        <input spellCheck={true}
                            className={styles['form-search__input']}
                            id="arrival"
                            name='arrival'
                            type="text"
                            value={cityArrivalValue}
                            onChange={(e) => { setCityArrivalValue(e.target.value), setIsSelectedChange(true), setIsSearchForm(true) }}
                            placeholder='Пункт назначения'
                            required={true}
                        />
                        <div ref={refArrivalSelect} className={`${styles['form-search__select']} ${IArrivalSelect.isCurrent === true ? styles.active : ''}`}>
                            {citySearchArrival.map((city: any) => {
                                const [cityNameArrival, cityDetailsArrival] = splitCityName(city.Name);
                                return (
                                <button type='button' key={city.Id} onClick={() => updateDataArrivalCity(city)}>
                                    {cityNameArrival}
                                    <span className={styles['form-search__details']}>
                                    {cityDetailsArrival ? `(${cityDetailsArrival})` : null}
                                    </span>
                                </button>
                            )})}
                        </div>
                    </div>
                    <div className={styles['form-search__sample']}>
                        <p className={styles['form-search__text']}>Например:</p>
                        <button className={styles['form-search__btn']} type='button' onClick={() => { setCityArrivalValue(defaultCityForm.Minsk); setCitySearchArrival([]); }}>{defaultCityForm.Minsk}</button>
                        <button className={styles['form-search__btn']} type='button' onClick={() => { setCityArrivalValue(defaultCityForm.Mosсow); setCitySearchArrival([]); }}>{defaultCityForm.Mosсow}</button>
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
                            onClick={closeSelect}>
                            <CalendarIcon
                                className={`${styles['form-search__icon']} ${isCalendarShow ? styles.active : ''}`}
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
                                tileContent={tileContent}
                            />
                        </div>
                        : null}
                </div>
                <div className={styles['form-search__wrapper']}>
                    <button className={styles['form-search__btn-submit']} type='button' onClick={() => { handleSubmit(), setIsLoadingForm(true) }}>{isLoadingForm ? 'Идет поиск...' : 'Найти билеты'}</button>
                </div>
            </form>
        </>
    );
};

export default SearchForm;