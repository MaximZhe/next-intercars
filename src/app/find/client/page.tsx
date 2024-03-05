'use client'
import Menu from '@/app/components/Header/Menu/Menu';
import style from './ChoiceTicketsPage.module.scss';
import { FC, useEffect, useState } from 'react';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import Timer from '@/app/components/Timer/Timer';
import Counter from '@/app/components/Counter/Counter';
import OrderForm from '@/app/components/OrderForm/OrderForm';
import { useAppSelector } from '@/app/hooks/redux';
import { usePathname, useRouter } from 'next/navigation';
import { IItemFullBusPlaces } from '@/app/types/types';
import { formatedDateRoute } from '@/app/utils/formatedDateRoute';



interface IClientProps {
  params:{
      slug: string,
  } 
}
interface IArrayDateRoute {
  dateDepart: string | undefined,
  dateArrival: string | undefined
}


// type Place = {
//   Seat: number;
//   IsFree: boolean;
//   Row: number;
//   Col: number;
//   Floor: number;
// };

const ChoiceTicketsPage:FC<IClientProps> = ({params}) => {
  const {Route} = useAppSelector((state:any) => state.singleRouteReduser)
  const {priceFormTarifs} = useAppSelector((state) => state.priceFormTarifsReduser);
 console.log(Route)
  // const { isMobile,isTablet } = useMatchMedia();
  const valueId = params.slug
  const pathname = usePathname();
 console.log(valueId)
  
  const [isTicketPage, setIsTicketPage] = useState(false);
  const [fullPrice, setFullPrice] = useState(0);
  const [countUser, setCountUser] = useState(1)
  const [arrayPlaces, setArrayPlaces] = useState<IItemFullBusPlaces[]>([])
  const [dateRoute, setDateRoute] = useState<IArrayDateRoute>({dateDepart: '', dateArrival: ''})
  const [dataResultRoute, setDataResultRoute] = useState<any>([])
  
  useEffect(() => {
    const isTicketPage = pathname === `/find/client`; // Замените '/booking' на путь к Вашей странице бронирования билета
    setIsTicketPage(isTicketPage);
  }, [pathname]);
  useEffect(() => {
      const dateDepartRoute = formatedDateRoute(Route.Result.Route.DateDepart);
      const dateArrivalRoute = formatedDateRoute(Route.Result.Route.DateArrive);
      setDateRoute({dateDepart: dateDepartRoute, dateArrival: dateArrivalRoute})
    // Проверяем, есть ли данные в localStorage
    const storedData = localStorage.getItem('routePlaces');
    const storeRoute = localStorage.getItem('routeData');
    console.log(storedData)
    if(storeRoute){
      const parseDataRoute = JSON.parse(storeRoute);
      setDataResultRoute(parseDataRoute);
    }else{
      setDataResultRoute(Route.Result.Route);
      localStorage.setItem('routeData', JSON.stringify(Route.Result.Route));
    }
    if (storedData) {
      // Если данные есть, загружаем их
      const parsedData = JSON.parse(storedData);
      setArrayPlaces(parsedData);
    } else {
      // Если данных нет, сохраняем данные из Redux в localStorage
      const res = Route.Result.Route.FullBusPlaces;
     
      if (res && res.length > 0) {
        const sortedRes = [...res]; // Создаем копию массива
        sortedRes.sort(compare); // Сортируем копию массива
        setArrayPlaces(sortedRes); // Устанавливаем отсортированный массив в состояние
        localStorage.setItem('routePlaces', JSON.stringify(sortedRes));
      }
    }
  }, [Route]);
  
  useEffect(() => {
    // При обновлении данных из Redux, обновляем данные в state и localStorage
    const res = Route.Result.Route.FullBusPlaces;
    if (res && res.length > 0) {
      const sortedRes = [...res];
      sortedRes.sort(compare);
      setArrayPlaces(sortedRes);
      localStorage.setItem('routePlaces', JSON.stringify(sortedRes));
    }
    const resultGetRoute = Route.Result.Route;
    if(resultGetRoute ){
      localStorage.setItem('routeData', JSON.stringify(resultGetRoute));
      setDataResultRoute(resultGetRoute);
    }
  }, [Route]);
  function compare(a: { Row: number; Col: number; }, b: { Row: number; Col: number; }) {
    if (a.Row < b.Row) {
      return -1;
    }
    if (a.Row > b.Row) {
      return 1;
    }
    if (a.Col < b.Col) {
      return -1;
    }
    if (a.Col > b.Col) {
      return 1;
    }
    return 0;
  }
  
  const handleGetCountValue = (value: number) => {
    setCountUser(value);
  };

  const FullBusPlaces = arrayPlaces
  console.log(dataResultRoute)
  const sortedArrays = [];
  let currentRow = 0;

  let currentArray: { Seat: number; IsFree: boolean; Row: number; Col: number; Floor: number; }[] = [];

  FullBusPlaces.forEach(place => {
    if (place.Row !== currentRow) {
      sortedArrays.push(currentArray);
      currentArray = [];
      currentRow = place.Row;
    }
    currentArray.push(place);
  });

  sortedArrays.push(currentArray);

  sortedArrays.forEach(array => {
    array.sort((a, b) => a.Floor - b.Floor);
  });
  const maxCol = Math.max(...FullBusPlaces.map(place => place.Col));
  const links = [
    { label: 'Главная', href: '/' },
    { label: 'Поиск билетов', href: '/find', back: true },
    { label: 'Оформление билетов', href: `/find/client/${valueId}`, active: true },
  ];
useEffect(() => {
  if(priceFormTarifs){
    setFullPrice(priceFormTarifs[1]);
  }
  console.log(priceFormTarifs[0])
},[priceFormTarifs])
  return (
    <>
     <Menu className='menu__theme--blue'/>
    <section className={style.tickets}>
      <div className='container'>
        <div className={style['tickets__wrapper']}>
          <Breadcrumbs links={links} />
          <div className={style['tickets-item']}>
            <div className={style['tickets-item__header']}>
              <h1 className={style['tickets-item-info__main-title']}>
                {dataResultRoute.City1} - {dataResultRoute.City2}
              </h1>
              <div className={style['tickets-item-info-timer']}>
                <p className={style['tickets-item-info-timer__text']}>
                   {/* isMobile ? 'Осталось:' : 'До конца оформления осталось*/}
                </p>
                <div className={style['tickets-item-info-timer__value']}>
                  <Timer isTicketPage={isTicketPage} />
                </div>
              </div>
            </div>
            <div className={style['tickets-item-info']}>
              <div className={style['tickets-item-info__left']}>

                <p className={style['tickets-item-info__subtitle']}>
                  Отправление
                </p>
                <p className={style['tickets-item-info__date']}>
                {dateRoute.dateDepart} в {dataResultRoute.TimeDepart}
                </p>
                <p className={style['tickets-item-info__place']}>
                {dataResultRoute.DepartName}
                </p>
                <div className={style['tickets-item-info__container']}>
                  <h2 className={style['tickets-item-info__title']}>
                    Количество пассажиров
                  </h2>
                  <Counter
                    className={`${style['tickets-item-info-counter']}`}
                    initialStateValue={1}
                    getCountValue={handleGetCountValue} />

                </div>
              </div>
              <div className={style['tickets-item-info__right']}>

                <p className={style['tickets-item-info__subtitle']}>
                  Прибытие
                </p>
                <p className={style['tickets-item-info__date']}>
                {dateRoute.dateArrival} в {dataResultRoute.TimeArrive}
                </p>
                <p className={style['tickets-item-info__place']}>
                {dataResultRoute.ArriveName}
                </p>
                <div className={style['tickets-item-info__container']}>
                  <div className={style['tickets-item-info-price']}>
                    <p className={style['tickets-item-info-price__text']}>
                      Стоимость
                    </p>
                    <p className={style['tickets-item-info-price__full']}>
                      {fullPrice} RUB
                    </p>
                    <p className={style['tickets-item-info-price__tickets']}>
                      за {countUser} билета
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <OrderForm countUser={countUser} places={sortedArrays} maxCol={maxCol} pricePay={dataResultRoute.Price} />
          </div>
        </div>
      </div>

    </section>
    </>
    
  );
};

export default ChoiceTicketsPage;