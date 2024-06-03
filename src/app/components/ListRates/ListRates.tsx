'use client'
import { FC, Suspense, useEffect, useState } from 'react';
import style from './ListRates.module.scss';
import SearchForm from '../SearchForm/SearchForm';
// import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';

import ListRatesFilterButtons from '../ListRatesFilterButtons/ListRatesFilterButtons';


// import { setStoregeRoute } from '../../redux/slice/storegeDataRoute';
import { GridLoader } from 'react-spinners';
import { IItemCarrierRoutes, IItemRoutes, ITariffData } from '@/app/types/types';
import { useAppSelector } from '@/app/hooks/redux';
import ListRatesItem from '../ListRatesItem/ListRatesItem';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { useSearchParams } from 'next/navigation';
import Menu from '../Header/Menu/Menu';
import Button from '../UI/Button/Button';

export interface IRoute {
  CarrierRoutes: IItemCarrierRoutes[];
}
const ListRates: FC = () => {

  const links = [
    { label: 'Главная', href: '/' },
    { label: 'Поиск билетов', href: '/find', active: true },
  ];
  const [visibleItems, setVisibleItems] = useState(4);
    const itemsPerPage = 4; 

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };
  const searchParams = useSearchParams();
  const newDates = searchParams.get('date');



  const [routeData, setRouteData] = useState<ITariffData>({
    Result: {
      CarrierRoutes: [],
      CityArrival: 0,
      CityDeparture: 0,
      DateDeparture: '',
      Id: '',
      IsActive: false,
      IsDynamic: false,
      DateCreate: ''
    },
    Error: null
  })

  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<IItemRoutes[]>([]);
  const [activeButton, setActiveButton] = useState('');
  const { dataRoute } = useAppSelector((state) => state.dataRouteReduser);
  const { NameDeparture } = useAppSelector((state) => state.cityDepartureReduser);
  const { Name } = useAppSelector((state) => state.cityArrivalReduser);

  const searchProps = {
    citySearchDeparture: NameDeparture,
    citySearchArrival: Name,
    dateSearch: newDates
  }

  const updateStorageRoute = localStorage.getItem('updateDateRoute');
  useEffect(() => {
    const fetchDynamicRoutes = async (id: string) => {
      console.log(id);
      try {
        const data = {
          "SearchId": id,
        };

        const response = await fetch('/api/v1/routes/getSearch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Ошибка HTTP: ' + response.status);
        }

        const dat = await response.json();
        console.log(dat)
        setRouteData(dat);
        setRoutes(dat.Result.CarrierRoutes.map((item: { Routes: any; }) => item.Routes).flat());
        if (updateStorageRoute === 'true') {

          localStorage.removeItem('routeDate');
          setRoutes(dat.Result.CarrierRoutes.map((item: { Routes: any; }) => item.Routes).flat());

          console.log('storage clear');
        }


        // dispatch(setStoregeRoute(dat.Result.CarrierRoutes.map((item: { Routes: any; }) => item.Routes).flat()));
        setLoading(routeData.Result.IsActive)
      } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
      }
    };
    fetchDynamicRoutes(dataRoute.Result.Id);
    if (routeData.Result.IsActive) {

      const timer = setInterval(async () => {
        await fetchDynamicRoutes(routeData.Result.Id);

      }, 2000);

      return () => {
        clearInterval(timer);
        setLoading(false)
      };
    } else {
      console.log('')
    }



    let backLocaltorage = localStorage.getItem('backPage');
    if (backLocaltorage === 'true') {
      fetchDynamicRoutes(dataRoute.Result.Id);
      localStorage.removeItem('backPage');
      console.log('backPage очищен')
    }
  }, [dataRoute, routeData.Result.Id, routeData.Result.IsActive])
  useEffect(() => {
    console.log(routeData)
  }, [routeData])
  // const routesArray = routes.map((item: { Routes: any; }) => item.Routes).flat();
  const sortedRoutesPriceBest = (routes: any[]) => {
    return routes.map(item => item.Price[2].Ptar).sort((a, b) => a - b);
  }
  const sortedRoutesPrice = () => {
    setActiveButton('Стоимость');
    if (activeButton === 'Стоимость') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (a.Price[2].Ptar && b.Price[2].Ptar) {
          return a.Price[2].Ptar - b.Price[2].Ptar;
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Стоимость по убыванию');
    } else if (activeButton === 'Стоимость по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (a.Price[2].Ptar && b.Price[2].Ptar) {
          return b.Price[2].Ptar - a.Price[2].Ptar;
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Стоимость по убыванию');
    } else {
      const newArrayRoutes = [...routes].reverse();
      setRoutes(newArrayRoutes);
      setActiveButton('Стоимость по возрастанию');
    }

  }
  const sortedRoutesTimeDepart = () => {
    setActiveButton('Время отправления')
    if (activeButton === 'Время отправления') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (a.TimeDepart && b.TimeDepart) {
          return a.TimeDepart.localeCompare(b.TimeDepart);
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время отправления по убыванию');
    } else if (activeButton === 'Время отправления по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (b.TimeDepart && a.TimeDepart) {
          return b.TimeDepart.localeCompare(a.TimeDepart);
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время отправления по убыванию');
    }
    else {
      const newArrayRoutes = [...routes].reverse();
      setRoutes(newArrayRoutes);
      setActiveButton('Время отправления по возрастанию');
    }
  }
  // function formatedTime(time: string) {
  //   const newTime = moment(time, 'HH:mm').format('HH');
  //   return parseInt(newTime)
  // }
  const sortedRoutesTimeArrive = () => {
    setActiveButton('Время прибытия')
    if (activeButton === 'Время прибытия') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (a.TimeArrive && b.TimeArrive) {
          return a.TimeArrive.localeCompare(b.TimeArrive);
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время прибытия по убыванию');
    } else if (activeButton === 'Время прибытия по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (b.TimeArrive && a.TimeArrive) {
          return b.TimeArrive.localeCompare(a.TimeArrive);
        }
        return 0;
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время прибытия по убыванию');
    } else {
      const newArrayRoutes = [...routes].reverse();
      setRoutes(newArrayRoutes);
      setActiveButton('Время прибытия по возрастанию');
    }
  }
  const sortedRoutesTimeFull = () => {
    setActiveButton('Время в пути')
    if (activeButton === 'Время в пути') {
      const newArrayRoutes = [...routes].sort((a, b) => {
        if (a.Hour && b.Hour) {
          const hoursComparison = a.Hour.localeCompare(b.Hour);
          if (hoursComparison !== 0) {
            return hoursComparison;
          }
        }
        return a.Minuts.localeCompare(b.Minuts);
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время в пути по убыванию');
    } else if (activeButton === 'Время в пути по возрастанию') {
      const newArrayRoutes = [...routes].sort((a, b) => {

        if (b.Hour && a.Hour) {
          const hoursComparison = b.Hour.localeCompare(a.Hour);
          if (hoursComparison !== 0) {
            return hoursComparison;
          }
        }
        return b.Minuts.localeCompare(a.Minuts);
      });
      setRoutes(newArrayRoutes);
      setActiveButton('Время в пути по убыванию');
    } else {
      const newArrayRoutes = [...routes].reverse();
      setRoutes(newArrayRoutes);
      setActiveButton('Время в пути по возрастанию');
    }
  }
  const sortedPrices = sortedRoutesPriceBest(routes)

  return (
    <>
      <Menu responsive={true} />
      <section className={style.rates}>
        <Suspense>
          <SearchForm className={style['rates__form']} searchProps={searchProps} />
        </Suspense>
        <Suspense>
          <div className='container'>
            <div className={style['rates__wrapper']} >
              <div className={style['rates__header']} >
                <Breadcrumbs links={links} />
                <div className={style['rates__filter']} >
                  <ListRatesFilterButtons onClick={sortedRoutesTimeDepart} isSort={activeButton === 'Время отправления по возрастанию'} title={'Время отправления '} />
                  <ListRatesFilterButtons onClick={sortedRoutesTimeArrive} isSort={activeButton === 'Время прибытия по возрастанию'} title={'Время прибытия'} />
                  <ListRatesFilterButtons onClick={sortedRoutesTimeFull} isSort={activeButton === 'Время в пути по возрастанию'} title={'Время в пути'} />
                  <ListRatesFilterButtons onClick={sortedRoutesPrice} title={'Стоимость'} isSort={activeButton === 'Стоимость по возрастанию'} />
                </div>
              </div>

              <div className={style.list}>
                {routeData.Result.IsActive === true ?
                  <GridLoader color={'#0243A6'} loading={loading} size={10} />
                  : null}
                {routes.length !== 0 ? (
                  routes.slice(0, visibleItems).map((data) => (
                    <ListRatesItem key={data.Id} data={data} sortedPrices={sortedPrices} />
                  ))
                ) : (
                  loading === false ? <p>Извините, маршруты не найдены</p> : null
                )}
                <Button disabled={routes.length > visibleItems ? false : true} 
                            type='button'
                            onClick={handleShowMore}
                            className={`${style['rates__btn']} ${routes.length > visibleItems ? '' : `${style['disabled']}`}`}>
                                <p className='sales__btn-text'>Показать еще</p>
                                
                </Button>
              </div>
            </div>
          </div>
        </Suspense>

      </section>
    </>

  );
};

export default ListRates;