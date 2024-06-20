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
import { useAppSelector } from "@/app/hooks/redux";
import { formatedDateFetch } from "@/app/utils/formatedDateFetch";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import CommentOrder from "../CommentOrder/CommentOrder";

import { Passenger, ServerData } from "@/app/types/types";
import { updatePassengerArray } from "@/app/utils/updatePassengerArray";
import ModalErrors from "../UI/ModalErrors/ModalErrors";
import { useModalErrorContext, useModalErrorFormContext } from "@/contex/modal";
import ModalErrorsForm from "../UI/Modal/ModalErrorsForm/ModalErrorsForm";


interface IErrorAxios {
  Result: {} | null,
  Error: {
    Message: string
  }
}
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
  pricePay: number,
  getTarrifs: (index: number, selectedTarifId: any) => void,
  arrayTariffs: any[]
}

export interface IIDRoutes {
  searchId: string,
  routeId: string
}

const FormComponent: FC<ICountUser> = ({ countUser, places, maxCol, pricePay, getTarrifs, arrayTariffs }) => {

  const { Route } = useAppSelector((state: any) => state.singleRouteReduser);
  const { dataRoute } = useAppSelector((state: any) => state.dataRouteReduser);
  const [idRoutes, setIdRoutes] = useState<IIDRoutes>({ searchId: '', routeId: '' });
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<number>(0);
  const [selectedPromoCode, setSelectedPromoCode] = useState<string>('');
  const [isLoadingPay, setIsLoadingPay] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isModalError, setIsModalError } = useModalErrorContext();
  const { isModalErrorForm, setIsModalErrorForm } = useModalErrorFormContext();
  const [arrayErrorMessage, setArrayErrorMessage] = useState<string[]>([]);
  
  const numberArray = createNumberArray(countUser);
  const router = useRouter();

  useEffect(() => {
    if (Route && dataRoute) {
      setIdRoutes({ searchId: dataRoute.Result.Id, routeId: Route.Result.Route.Id })
    }
  }, [Route, dataRoute])

  function transformArray(passengersArray: Passenger[]) {
    return Object.values(passengersArray);
  }
  const getPay = async (formDatas: any) => {
    setIsLoadingPay(true);
    const transformedPassengers = transformArray(formDatas.Passengers);
    const datas: any =
    {
      Passengers: transformedPassengers,
      Phone: formDatas.Phone,
      Email: formDatas.Email,
      CurrencyId: formDatas.CurrencyId,
      PaySystem: formDatas.PaySystem,
      ExtraBaggage: formDatas.ExtraBaggage,
      PromoCode: formDatas.PromoCode,
      Note: formDatas.Note,
      RouteId: formDatas.RouteId,
      HasSubscription: formDatas.HasSubscription,
      SearchId: formDatas.SearchId,
      Lang: formDatas.Lang,
      SiteVersionId: formDatas.SiteVersionId
    };
    try {
      const response = await axios.post('/api/v1/tickets/booking', datas);
      const dat = response.data;
      setIsLoadingPay(false);
      router.replace(dat.Result.ExternalUrl)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<IErrorAxios>;
        console.log(onmessage, axiosError.message);
        const e = axiosError.response?.data;
        if (e) {
          console.log(e.Error)
          setErrorMessage(e.Error.Message)
          setIsModalError(true);
        }
      }
      setIsLoadingPay(false);
    } finally {
      console.log(datas)
    }
  };

  const handlePlaceSelection = (selectedPlace: any) => {
    console.log(selectedPlaces)
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
        }
      },
      Phone: '',
      Email: '',
      CurrencyId: 4,
      PaySystem: 'alphaBank',
      PromoCode: '',
      ExtraBaggage: 0,
      Note: '',
      SiteVersionId: 2,
      HasSubscription: false,
      termsAcceptedPolity: false,
      termsAcceptedProcessing: false,
      RouteId: '',
      SearchId: '',
      Lang: "RUS"
    },
    mode: 'onBlur'
  });
  
  function validateForm () {
   
    const newErrorMessages: string[] = [];
    const passengerErrors = methods.getFieldState('Passengers').error
    const phoneErrors = methods.getFieldState('Phone').error
    const emailErrors = methods.getFieldState('Email').error
    const termsAcceptedPolityErrors = methods.getFieldState('termsAcceptedPolity').error
    const termsAcceptedProcessingErrors = methods.getFieldState('termsAcceptedProcessing').error

    setTimeout(() => {

      if(passengerErrors){
        newErrorMessages.push('Данные о пассажире не заполнены');
      }
      if(phoneErrors) {
        newErrorMessages.push('Номер телефона не заполнен');
      }
      if(emailErrors) {
        newErrorMessages.push('Email не заполнен');
      }
      if(termsAcceptedPolityErrors) {
        newErrorMessages.push('Политика конфиденциальности не принята');
      }
      if(termsAcceptedProcessingErrors) {
        newErrorMessages.push('Согласие на обработку персональных данных не принято');
      }
      if(selectedPlaces.length < countUser) {
        newErrorMessages.push('Выберите место');
      }
      if(newErrorMessages.length > 0) {
        setArrayErrorMessage(newErrorMessages);
      }
    },0)
    
  }
  
  useEffect(() => {
    if (arrayErrorMessage.length > 0) {
      setIsModalErrorForm(true)
    } 
  }, [arrayErrorMessage])
  const handleFormSubmit = (data: any) => {
    // Обновляем пассажира в Passengers с выбранным местом
    // console.log(data.Passengers)
    const checkLengthPassengers = updatePassengerArray(data.Passengers, countUser);
    // console.log(checkLengthPassengers)
    const updatedPassengers = Object.keys(checkLengthPassengers).map((passengerKey, index) => {
      const newDatePassager = formatedDateFetch(data.Passengers[passengerKey].Birthdate);
      const updatedPassenger = {
        ...data.Passengers[passengerKey],
        PlaceNumber: selectedPlaces[index] && selectedPlaces[index].Seat ? selectedPlaces[index].Seat : data.Passengers[passengerKey].PlaceNumber,
        Birthdate: newDatePassager,
        TarifId: data.Passengers[passengerKey].TarifId.value,
        Citizenship: data.Passengers[passengerKey].Citizenship.value,
        DocumentId: data.Passengers[passengerKey].DocumentId.value,
      };
      return Object.keys(updatedPassenger).length > 0 ? { [passengerKey]: updatedPassenger } : null;
    }).filter(passenger => passenger !== null);


    console.log(updatedPassengers);
    const updatedData = {
      ...data,
      Passengers: Object.assign({}, ...updatedPassengers),
      RouteId: idRoutes.routeId,
      SearchId: idRoutes.searchId,
      ExtraBaggage: selectedBaggage,
      PromoCode: selectedPromoCode
    };
    console.log(updatedData);
    if(selectedPlaces.length < countUser) {
      validateForm()
    }else{
      getPay(updatedData);
    }
    
  };
  
  
  return (
    <>
      <ModalErrors isOpen={isModalError} >
        <p>{errorMessage}</p>
      </ModalErrors>
      <ModalErrorsForm isOpen={isModalErrorForm} >
      <p className={style['order-form__error-title']}>Пожалуйста, заполните следующие поля:</p> 
      <ul className={style['order-form__error-list']}>
        {arrayErrorMessage.map((message: string, index: number) => 
        <li key={index} className={style['order-form__error-item']}>{message}</li>)}
      </ul>
      </ModalErrorsForm>
      <FormProvider {...methods}>
        <form className={style['order-form']} onSubmit={methods.handleSubmit(handleFormSubmit, validateForm)}>
          <div className={style['order-form__users']}>
            {numberArray.map((number: any) => (
              <PassengerCard key={number} countUser={number}
                className={`${style['order-form__item']}`}
                controller={Controller}
                handleifChangeTariffs={getTarrifs} />
            ))}
          </div>
          <BusTicket places={places} maxCol={maxCol}
            handlePlaceSelection={handlePlaceSelection}
            countUser={countUser}
            selectedPlaces={selectedPlaces}
            handleBaggage={handleBaggage}

          />
          <CommentOrder />
          <ContactsUser />
          {countUser === 1 && arrayTariffs.length > 0 && arrayTariffs[0].selectedTarifId.label !== 'DT (до 12 лет)' ?
            <PromoOrder handlePromoCode={handlePromoCode} routeIds={idRoutes} control={methods.control} places={selectedPlaces} />
            : null}
          <div className={style['order-form__container']}>
            <ConsentBox />
            <div className={style['order-form__result']}>
              <div className={style['order-form-price']}>
                <p className={style['order-form-price__text']}>
                  К оплате
                </p>
                <p className={style['order-form-price__value']}>
                  {pricePay} RUB
                </p>
              </div>
              <input className={style['order-form__submit']}
                type="submit" value={isLoadingPay ? 'Идет бронирование...' : 'Перейти к оплате'} />
            </div>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default FormComponent;

