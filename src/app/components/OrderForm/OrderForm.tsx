'use client'

import { FC, useEffect, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";

import ConsentBox from '../СonsentBox/СonsentBox';
import style from './OrderForm.module.scss'
import PassengerCard from '../PassengerCard/PassengerCard';
import BusTicket from '../BusTicket/BusTicket';
import ContactsUser from '../ContactsUser/ContactsUser';
import PromoOrder from '../PromoOrder/PromoOrder';
import { createNumberArray } from '@/app/utils/createCountUsers';
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { formatedDateFetch } from "@/app/utils/formatedDateFetch";
import axios from "axios";
import { setPriceFormTarifs } from "@/redux/slice/priceFormTarifsSlice";


export interface IBusPlace {
  Col: number,
  Floor: number,
  IsFree: boolean,
  Row: number,
  Seat: number
}
interface ICountUser {
  countUser: number,
  places: IBusPlace[][],
  maxCol: number,
  pricePay: any[]
}
interface IPricePayTarifs {
  PriceArray: any[];
}
interface IIDRoutes {
  searchId: string,
  routeId: string
}

const FormComponent: FC<ICountUser> = ({ countUser, places, maxCol, pricePay }) => {
  const dispatch = useAppDispatch();
  const {Route} = useAppSelector((state:any) => state.singleRouteReduser);
  const { dataRoute } = useAppSelector((state) => state.dataRouteReduser);
  const numberArray = createNumberArray(countUser);
  const [idRoutes, setIdRoutes] = useState<IIDRoutes>({searchId: '', routeId: ''});
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<number>(0);
  const [selectedPromoCode, setSelectedPromoCode] = useState<string>('');
  const [pricePayTarifs, setPricePayTarifs] = useState<IPricePayTarifs>({
    PriceArray: [],
  })

  useEffect(() => {
    if (Route && dataRoute) {
      setIdRoutes({searchId: dataRoute.Result.Id, routeId: Route.Result.Route.Id })
    }
  },[Route,dataRoute])
  
  function transformArray(passengersArray: any) {
    return Object.values(passengersArray);
}
  const getSingleRoute = async (fomDatas:any) => {
    const transformedPassengers = transformArray(fomDatas.Passengers);
    const datas: any =
        {
          Passengers: transformedPassengers,
          Phone: fomDatas.Phone,
          Email: fomDatas.Email,
          CurrencyId: fomDatas.CurrencyId,
          PaySystem: fomDatas.PaySystem,
          ExtraBaggage: fomDatas.ExtraBaggage,
          PromoCode: fomDatas.PromoCode,
          Note: fomDatas.Note,
          RouteId: fomDatas.RouteId,
          SearchId: fomDatas.SearchId,
          Lang: fomDatas.Lang,
          SiteVersionId:fomDatas.SiteVersionId
        } ;
    try {
        const response = await axios.post('/api/v1/tickets/booking', datas);
        const dat = response.data;
        console.log(dat)
    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Ошибка при отправке данных на сервер:', errorMessage);
    } finally {
      console.log(datas)
    }
};

  const handlePlaceSelection = (selectedPlace: any) => {
    const index = selectedPlaces.findIndex((place) => place === selectedPlace);
    if (index !== -1) {
      setSelectedPlaces((prevSelectedPlaces) => {
        const updatedSelectedPlaces = [...prevSelectedPlaces];
        updatedSelectedPlaces.splice(index, 1);
        return updatedSelectedPlaces;
      });
    } else {
      if (selectedPlaces.length < countUser) {
        setSelectedPlaces((prevSelectedPlaces) => [...prevSelectedPlaces, selectedPlace]);
      }
    }
  };
  const handleBaggage = (baggageCount: number) => {
    setSelectedBaggage(baggageCount)
  }
  const handlePromoCode = (valuePromoCode: string) => {
    setSelectedPromoCode(valuePromoCode)
  }
  
  const methods = useForm({
    defaultValues: {
      Passengers: {
        1: {
          FirstName: '',
          LastName: '',
          MiddleName: '',
          PlaceNumber: 0,
          TarifId: {value: 0, label: ''},
        }
      },
      Phone: '',
      Email: '',
      CurrencyId: 4,
      PaySystem:'alfaBank',
      PromoCode:'',
      ExtraBaggage:0,
      Note:'',
      SiteVersionId: 2,
      RouteId: '',
      SearchId: '',
      Lang: "RUS"
    },
    mode: 'onBlur'
  });
  const { isValid } = methods.formState;
  
  
  const handleFormSubmit = (data: any) => {
    // Обновляем первого пассажира в Passengers с выбранным местом
    const updatedPassengers = Object.keys(data.Passengers).map((passengerKey, index) => {
      const newDatePassager = formatedDateFetch(data.Passengers[passengerKey].Birthdate)
      const updatedPassenger = {
          ...data.Passengers[passengerKey],
          PlaceNumber: selectedPlaces[index].Seat || data.Passengers[passengerKey].PlaceNumber,
          Birthdate: newDatePassager,
          TarifId:data.Passengers[passengerKey].TarifId.value,
          Citizenship: data.Passengers[passengerKey].Citizenship.value,
          DocumentId: data.Passengers[passengerKey].DocumentId.value,
      };
      return { [passengerKey]: updatedPassenger };
  });
    const updatedData = {
      ...data,
      Passengers: Object.assign({}, ...updatedPassengers),
      RouteId: idRoutes.routeId,
      SearchId: idRoutes.searchId,
      ExtraBaggage: selectedBaggage,
      PromoCode: selectedPromoCode
    };
    console.log(updatedData);
    methods.reset();
    getSingleRoute(updatedData);
    // navigate('/list-result-routes/choice-tickets/ending-order', { state: 'Поиск билетов/Оформление билетов/Завершение покупки' });
    // Выводит объект с данными всех пассажиров
  };

 
  const formData = methods.watch();
  useEffect(() => {
    if(formData){
      console.log(formData.Passengers)
    }
    const changePayTarifsArray = (priceses: any) => {
      console.log(priceses)
      
    };
 
    if(pricePayTarifs){
      console.log(pricePayTarifs.PriceArray)
    }
    if (formData && formData.Passengers) {
      const transformedPassengers = transformArray(formData.Passengers);
      transformedPassengers.forEach((passenger:any) => {
        if(passenger.TarifId){
          changePayTarifsArray(passenger.TarifId.label);
        }else{
          console.log('нет тарифа')
        }
          
      });
  }
  },[formData, pricePayTarifs])

  
  return (
    <>
      <FormProvider {...methods}>
        <form className={style['order-form']} onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className={style['order-form__users']}>
            {numberArray.map((number:any) => (
              <PassengerCard key={number} countUser={number}
                className={`${style['order-form__item']}`}
                controller={Controller} />
            ))}
          </div>
          <BusTicket places={places} maxCol={maxCol}
            handlePlaceSelection={handlePlaceSelection}
            countUser={countUser}
            selectedPlaces={selectedPlaces}
            handleBaggage={handleBaggage}

          />
          <ContactsUser />
          <PromoOrder handlePromoCode={handlePromoCode} />

          <div className={style['order-form__container']}>
            <ConsentBox />
            <div className={style['order-form__result']}>
              <div className={style['order-form-price']}>
                <p className={style['order-form-price__text']}>
                  К оплате
                </p>
                <p className={style['order-form-price__value']}>
                 {pricePayTarifs.PriceArray[0]} RUB
                </p>
              </div>
              <input className={style['order-form__submit']} disabled={!isValid}
                type="submit" value='Перейти к оплате' />
            </div>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default FormComponent;

